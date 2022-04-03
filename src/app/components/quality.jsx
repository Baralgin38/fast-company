import React from "react";

const Quality = (props) => {
  // const qualities = props.qualities.map(({ _id, name, color }) => {
  //   const badgeClass = `badge bg-${color} m-1`;

  //   return (
  //     <span key={_id} className={badgeClass}>
  //       {name}
  //     </span>
  //   );
  // });

  // return qualities;

  const { _id, name, color } = props;

  return (
    <span key={_id} className={`badge bg-${color} m-1`}>
      {name}
    </span>
  );
};

export default Quality;
