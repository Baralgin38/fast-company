import React from "react";

const Quality = (props) => {
  const { name, color } = props;

  return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

export default Quality;
