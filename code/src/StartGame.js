import React from "react";

function StartGame({ onClick }) {
  return (
    <div>
      <button id="start" onClick={onClick}>
        Start Game!
      </button>
    </div>
  );
}

export default StartGame;
