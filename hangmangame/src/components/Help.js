import React from "react";

function HelpButton({ onClick }) {
  return (
    <button className="hangman-btn1" onClick={onClick}>
      Need Help?
    </button>
  );
}

export default HelpButton
