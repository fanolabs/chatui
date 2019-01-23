import React from "react";

const ImageMessage = ({ title, url, description }) => {
  return (
    <div className="image">
      <strong>{title}</strong>
      <img src={url} />
      <p>{description}</p>
    </div>
  )
}

export default ImageMessage;
