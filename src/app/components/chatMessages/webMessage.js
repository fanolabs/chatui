import React from "react";
import cx from "classnames";

const WebMessage = ({ title, url, description, target }) => {
  return (
    <div className="web">
      <strong>{title}</strong>
      <p>{description}</p>
      <a href={url} target={target}>{url}</a>
    </div>
  )
}

export default WebMessage;