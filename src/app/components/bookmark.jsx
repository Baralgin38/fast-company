import React from "react";

const Bookmark = ({ status, ...rest }) => {
  return (
    <button {...rest} className="btn btn-primary btn-sm">
      <span
        className={"bi bi-bookmark" + (status ? "-check" : "")}
        style={{ fontSize: "1.5em" }}
      ></span>
    </button>
  );
};

export default Bookmark;
