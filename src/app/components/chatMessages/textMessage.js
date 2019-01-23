import React from "react";
import cx from "classnames";

const TextMessage = ({ text }) => (
  <div className="text" >
    {text.split("\\n").map((item, key) => (
      <p key={key}>{item}</p>
    ))}
  </div>
)

export default TextMessage;
