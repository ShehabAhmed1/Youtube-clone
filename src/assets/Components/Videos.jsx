import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { timeAgo, formatnums } from "../Pages/VideoPage";
/** images **/
import thumnails1 from "../images/thumbnail1.png";
import thumnails2 from "../images/thumbnail2.png";
import thumnails3 from "../images/thumbnail3.png";
import thumnails4 from "../images/thumbnail4.png";
import thumnails5 from "../images/thumbnail5.png";
/** API key **/
import { API_KEY } from "../../Data";

const Videos = ({ category }) => {
  //array contains all videos come from Youtube API
  const [data, setData] = useState([]);

  //fetch Videos from youtube API
  const fetchData = async () => {
    const regionCodes = ["EG", "SA"];
    const maxVideos = 300;
    let allVideos = [];

    try {
      const requests = regionCodes.map(async (region) => {
        let pageToken = "";
        let regionVideos = [];

        while (regionVideos.length < maxVideos) {
          const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=${region}&videoCategoryId=${category}&pageToken=${pageToken}&key=${API_KEY}`;
          const response = await fetch(URL);

          if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            break;
          }

          const data = await response.json();

          if (!data.items || data.items.length === 0) {
            console.warn(`No videos found for region: ${region}`);
            break;
          }

          regionVideos = [...regionVideos, ...data.items];

          if (regionVideos.length >= maxVideos) break;

          if (!data.nextPageToken) break;

          pageToken = data.nextPageToken;

          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        return regionVideos;
      });

      const results = await Promise.all(requests);
      allVideos = results.flat();
      setData(allVideos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="videos">
      <div className="main-container">
        <div className="videos-content">
          {data.map((item, index) => {
            console.log(item);
            return (
              <VideoBox
                key={index}
                item={item}
                handleVideoClick={handleVideoClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

function VideoBox({ item, handleVideoClick }) {
  if (!item || !item.snippet) {
    return null;
  }
  return (
    <Link
      to="/VideoPage"
      className="video-box"
      onClick={() => handleVideoClick(item)}
    >
      <figure>
        <img src={item.snippet.thumbnails.medium.url} alt="thumbnail" />
        <span className="v-duration">
          {parseDuration(item.contentDetails.duration)}
        </span>
      </figure>
      <div className="video-info">
        <h1 className="title">{item.snippet.title}</h1>
        <p className="channel-name">{item.snippet.channelTitle}</p>
        <p className="views-time">
          {formatnums(item.statistics.viewCount)} .{" "}
          {timeAgo(item.snippet.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
//to translate item duration to readable shap because youtube write it in ISO 8601 formate
function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  return `${hours > 0 ? hours + ":" : ""}${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

//send vedio information to Videopade;
function handleVideoClick(video) {
  localStorage.setItem("selectedVideo", JSON.stringify(video)); // حفظ الفيديو في localStorage
  window.onload();
}
export { Videos, VideoBox, handleVideoClick };
