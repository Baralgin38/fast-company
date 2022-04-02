import React from "react";

const Bookmark = (props) => {
  const getBookmarkInfo = (isBookmark) => {
    if (isBookmark) {
      return <span className="bi bi-bookmark-check"></span>;
    }

    return <span className="bi bi-bookmark"></span>;
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
