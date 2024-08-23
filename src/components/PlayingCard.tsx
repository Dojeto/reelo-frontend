import React from "react";

const PlayingCard: React.FC = () => {
  return (
    <div className=" flex items-center h-full p-3 gap-x-5">
      <img
        className="w-12 block rounded"
        src="https://upload.wikimedia.org/wikipedia/en/f/f1/Tycho_-_Epoch.jpg"
        alt=""
      />{" "}
      <p>Song Title</p>
    </div>
  );
};

export default PlayingCard;
