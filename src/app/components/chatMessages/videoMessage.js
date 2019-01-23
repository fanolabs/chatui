import React from "react";

const VideoMessage = ({ title, url, description }) => {
  return (
    <div className="video">
      <strong>{title}</strong>
      <p>{description}</p>
      <video controls={true}>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag
      </video>
    </div>
  )
}

export default VideoMessage;
