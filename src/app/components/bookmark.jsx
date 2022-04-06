import React from "react";

const Bookmark = (props) => {
  const getBookmarkInfo = (isBookmark) => {
    let bookmarkClass = "bi bi-";

    if (isBookmark) {
      bookmarkClass += "bookmark-check";
    } else {
      bookmarkClass += "bookmark";
    }

    return (
      <span className={bookmarkClass} style={{ fontSize: "1.5em" }}></span>
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
