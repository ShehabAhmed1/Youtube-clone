import React, { useEffect } from "react";
import { useState } from "react";
import { NavBar, ControleSideBar } from "../Components/NavBar";
import { SideBar, categoryback } from "../Components/SideBar";
import { VideoBox, handleVideoClick } from "../Components/videos";
/***** icons ****/
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { BsSaveFill } from "react-icons/bs";
/** images **/
import channalphoto from "../images/simon.png";

import { API_KEY } from "../../Data";
const VideoPage = () => {
  //states
  const [category, Setcategory] = useState(categoryback | 0);
  const [channalData, setChannalData] = useState(null);
  const [videoComments, setVideoComments] = useState([]);
  const [recommendation, setRecommendation] = useState([]);

  //recive clickedvideo from videos
  const [ClickedVideo, setClickedVideo] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedVideo"));
  });
  console.log(ClickedVideo.snippet.categoryId);
  //fetch other data related to video like comments,channal data,recommendation..ect;
  const fetchOtherData = async () => {
    const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${ClickedVideo.snippet.channelId}&key=${API_KEY}`;
    const videoCommentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${ClickedVideo.id}&key=${API_KEY}`;
    const recommendationUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=EG&videoCategoryId=${ClickedVideo.snippet.categoryId}&key=${API_KEY}`;

    try {
      //Use promise.all to fetch all data at the same time and then destructe it to its variables
      const [channelDataRes, videoCommentsRes, recommendationRes] =
        await Promise.all([
          fetch(channelDataUrl),
          fetch(videoCommentsUrl),
          fetch(recommendationUrl),
        ]);

      // validaion
      if (!channelDataRes.ok || !videoCommentsRes.ok || !recommendationRes.ok) {
        throw new Error(
          `HTTP error! Channel: ${channelDataRes.status}, Comments: ${videoCommentsRes.status}, Recommendation: ${recommendationRes.status}`
        );
      }

      //Use promise.all to convert all data at the same time and then destructe it to its variables
      const [channelData, commentsData, recommendationData] = await Promise.all(
        [
          channelDataRes.json(),
          videoCommentsRes.json(),
          recommendationRes.json(),
        ]
      );

      if (!channelData.items?.length) {
        console.warn("No channel data found.");
        return;
      }

      //update statue
      setChannalData(channelData.items[0]);
      setVideoComments(commentsData.items || []);
      setRecommendation(recommendationData.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOtherData();
  }, []);
  //console.log(ClickedVideo);
  return (
    <section
      className="video-page"
      onLoad={() => {
        window.scrollTo(0, 0);
      }}
    >
      <NavBar />
      <SideBar category={category} Setcategory={Setcategory} />
      <div className="main-container">
        <div className="video-page-content">
          <VideoContent
            ClickedVideo={ClickedVideo}
            channalData={channalData}
            videoComments={videoComments}
          />
          <Recommendations
            recommendation={recommendation}
            handleVideoClick={handleVideoClick}
          />
        </div>
      </div>
      <div className="overlayout" onClick={ControleSideBar}></div>
    </section>
  );
};

/**c1 component that contain all things related to the vedio**/
function VideoContent({ ClickedVideo, channalData, videoComments }) {
  return (
    <div className="video-content">
      <VideoDetails ClickedVideo={ClickedVideo} channalData={channalData} />
      <VideoComments
        numofComment={ClickedVideo.statistics.commentCount}
        videoComments={videoComments}
      />
    </div>
  );
}

/**c2 video details => video , actions ,Subscripe**/
function VideoDetails({ ClickedVideo, channalData }) {
  // console.log(ClickedVideo);
  if (!channalData) {
    return;
  }
  //console.log(channalData);
  return (
    <div className="video">
      <iframe
        src={`https://www.youtube.com/embed/${ClickedVideo.id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h1 className="v-title">{ClickedVideo.snippet.title}</h1>
      <p className="v-views">
        {formatnums(ClickedVideo.statistics.viewCount)} views .
        {timeAgo(ClickedVideo.snippet.publishedAt)}
      </p>
      <div className="actions">
        <div className="action1">
          <AiFillLike />
          <span>{formatnums(ClickedVideo.statistics.likeCount)}</span>
        </div>
        <div className="action2">
          <BiSolidDislike />
          <span></span>
        </div>
        <div className="action3">
          <FaShare />
          <span>share</span>
        </div>
        <div className="action4">
          <BsSaveFill />
          <span>save</span>
        </div>
      </div>
      <div className="subscripe">
        <div className="channal">
          <figure>
            <img
              src={channalData.snippet.thumbnails.default.url}
              alt="channal photo"
            />
          </figure>
          <div className="c-details">
            <h1>{ClickedVideo.snippet.channelTitle}</h1>
            <p>
              {formatnums(channalData.statistics.subscriberCount)} Subscribers
            </p>
          </div>
        </div>
        <button className="subscripeBtn">subscripe</button>
      </div>
    </div>
  );
}

/**c3 video Comments **/
function VideoComments({ numofComment, videoComments }) {
  return (
    <div className="comments">
      <h2 className="comments-num">{formatnums(numofComment)} Comments</h2>
      <div className="all-comments">
        {videoComments.map((c, index) => {
          return <Comment key={index} commentData={c} />;
        })}
      </div>
    </div>
  );
}

/**c4 the comment unit **/
function Comment({ commentData }) {
  //console.log(commentData);
  return (
    <div className="comment-cell">
      <figure>
        <img
          src={
            commentData.snippet.topLevelComment.snippet.authorProfileImageUrl
          }
          alt=""
        />
      </figure>
      <div className="comment-content">
        <h1>
          {commentData.snippet.topLevelComment.snippet.authorDisplayName.slice(
            1
          )}
        </h1>
        <p className="c-content">
          {commentData.snippet.topLevelComment.snippet.textDisplay}
        </p>
        <div className="c-actions">
          <div className="action1">
            <AiFillLike />
            <span>
              {" "}
              {formatnums(
                commentData.snippet.topLevelComment.snippet.likeCount
              )}
            </span>
          </div>
          <div className="action2">
            <BiSolidDislike />
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
/**c5 Recommendation section **/

function Recommendations({ recommendation, handleVideoClick }) {
  return (
    <div className="recommendations">
      {recommendation.map((v, index) => {
        return (
          <VideoBox key={index} item={v} handleVideoClick={handleVideoClick} />
        );
      })}
    </div>
  );
}

/*** likes style  ****/
const formatnums = (num) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M"; // ملايين
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K"; // آلاف
  } else {
    return num.toString(); // أقل من ألف يبقى كما هو
  }
};

/***** time Ago*******/
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000); //the result in ms so / 1000 to convert to s

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const { label, seconds } of intervals) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

//format Arabic name in comments

export { VideoPage, formatnums, timeAgo };
