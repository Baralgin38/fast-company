import React from "react";

const Bookmark = (props) => {
  const getBookmarkInfo = (isBookmark) => {
    if (isBookmark) {
      return (
        <span
          className="bi bi-bookmark-check"
          style={{ fontSize: "1.5em" }}
        ></span>
      );
    }

    return (
      <span className="bi bi-bookmark" style={{ fontSize: "1.5em" }}></span>
    );
  };

  return (
    <button
      className="btn btn-primary btn-sm"
      onClick={() => props.onClickBookmark(props.user._id)}
    >
      {getBookmarkInfo(props.user.bookmark)}
    </button>
  );
};

export default Bookmark;
