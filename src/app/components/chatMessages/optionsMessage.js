import React from "react";
import cx from "classnames";

const OptionsMessage = ({ options, sendTextMessage }) => {
  return (
    <ul>
      {options.map((opt, idx) =>
        <li key={idx} onClick={() => sendTextMessage(opt.text)}>
          {opt.text}
        </li>
      )}
    </ul>
  )
}

export default OptionsMessage;