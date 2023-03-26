import React, { useState, useEffect } from "react";
import dictionary from "../dictionary.txt";
import Images from "./Images";
import HelpButton from "./Help";
import Button from "./Button";
import "../App.css";

function Hangman() {
  //images to use for each answer guessed incorrectly
  //images to use for each answer guessed incorrectly
  const images = [
    require("../img/state1.GIF"),
    require("../img/state2.GIF"),
    require("../img/state3.GIF"),
    require("../img/state4.GIF"),
    require("../img/state5.GIF"),
    require("../img/state6.GIF"),
    require("../img/state7.GIF"),
    require("../img/state8.GIF"),
    require("../img/state9.GIF"),
    require("../img/state10.gif"),
    require("../img/state11.GIF"),
  ];
  // set amount of wrong answers
  const wrongAnswers = 10;
  //words guessed incorrectly set to 0
  const [wrong, setWrong] = useState(0);
  //keep track of guessed numbers
  const [guessed, setGuessed] = useState(new Set());
  //answer which is set as the result from the fetch
  const [answer, setAnswer] = useState("");
  // word being displayed
  const [displayedWord, setDisplayedWord] = useState([]);
  //checka when a letter has been clicked
  const [clickedButtons, setClickedButtons] = useState(new Set());
   //help button state
   const [showHelp, setShowHelp] = useState(false);

  //fetch function taking random word from dictionary txt file
  const fetchWords = async () => {
    const response = await fetch(dictionary);
    const text = await response.text();
    const words = text.split("\n");
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord;
  };

  //useeffect initialise state using data from api and sets displayed word as empty array with same amount of letters as word
  useEffect(() => {
    fetchWords().then((word) => {
      setAnswer(word);
      setDisplayedWord(word.split("").map(() => ""));
    });
  }, []);

  //resetting game function clears states and sets answer and displayed word to new word from api
  const resetGame = () => {
    setWrong(0);
    guessed.clear();
    clickedButtons.clear();
    fetchWords().then((word) => {
      setAnswer(word);
      setDisplayedWord(word.split("").map(() => ""));
    });
  };

  const handleGuess = (e) => {
    // extract the guessed letter from the clicked button
    let letter = e.target.value;

    // add the guessed letter to the set of guessed letters
    setGuessed(guessed.add(letter));

    // add the clicked letter to the set of clicked buttons
    setClickedButtons(clickedButtons.add(letter));

    // update the number of wrong guesses
    if (!answer.includes(letter)) {
      setWrong(wrong + 1);
    }

    // update the displayed word
    let updatedDisplayedWord = answer
      .split("")
      .map((ltr, i) => (ltr === letter ? letter : displayedWord[i]));
    setDisplayedWord(updatedDisplayedWord);
  };

// generating the buttons to click - splitting and mapping alphabet to buttons that use handleguess onlick
  const generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz-".split("").map((ltr, i) => (
      <button
        key={i}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
        className={`hangman-btn ${clickedButtons.has(ltr) ? "clicked" : ""}`}
      >
        {ltr}
      </button>
    ));
  };

  return (
    <div className="Hangman">
      <h1>Hangman</h1>
      <div>
      <HelpButton onClick={() => setShowHelp(!showHelp)} />
      {showHelp && (
        <div className="help-text-container">
          <p className="help-text">Click a letter to guess.</p>
          <p className="help-text">You have 10 wrong guesses before you lose.</p>
        </div>
      )}
    </div>
      <Images wrong={wrong} images={images} />
      <p>{wrong} wrong</p>
      {answer === displayedWord.join("") ? (
        <div>
          <p>You WIN! the correct answer is </p>
          <h2>{answer}</h2>
          <button className="winlosebutton" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      ) : wrong === wrongAnswers ? (
        <div>
          <p>You LOSE! the correct answer is </p>
          <h2>{answer}</h2>
          <button className="winlosebutton" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      ) : (
        <div>
          <div className="Hangman-word">
            {displayedWord.map((letter, i) => (
              <span key={i} className="Hangman-letter">
                {letter === "" ? "_" : letter}
              </span>
            ))}
          </div>
          <div className="Hangman-btns">{generateButtons()}</div>
          <Button label="Reset Game" handleClick={resetGame} />
        </div>
      )}
    </div>
  )};  

export default Hangman;

/* sources that helped with this task -

https://www.youtube.com/watch?v=jj0W8tYX_q8
https://www.youtube.com/watch?v=82-Gnw-rBiQ
https://stackoverflow.com/questions/50401390/promises-fetch-in-javascript-how-to-extract-text-from-text-file
https://dev.to/itsjjpowell/retrieving-files-with-the-fetch-api-i5l
https://codesandbox.io/s/hboin?file=/src/Hangman.js

*/
