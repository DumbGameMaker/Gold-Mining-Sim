import React, { useState } from "react";
import StartGame from "./StartGame";
import Game from "./Game";
import "./styles.css";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const ad = Math.random() >= 0.5;

  return (
    <div>
      <div className="App" id="launchCode">
        <h1>Gold Mining Simulator</h1>
        {gameStarted ? (
          <Game />
        ) : (
          <StartGame onClick={() => setGameStarted(true)} />
        )}
      </div>
      <h4 hidden={ad} className="whiteText">
        There should be an ad here, but you seem to have an ad-blocker. <br />
        Please consider disabling your adblocker to support us. Thank you!{" "}
      </h4>
      <h4 hidden={!ad} className="whiteText">
        AD: <br />
        Check out Minecraft: Java Edition! <br />
        The nether update is coming soon! Make sure to check it out!
      </h4>
      <footer className="whiteText">
        &copy; MrTimCook, AKA DumbGameMaker <br /> made with react and a whole
        lot of coding <br />

        <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        <img alt="Creative Commons License" id="CCLicence" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
        </a>
        <br />
        This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        CC BY-NC-SA 4.0 International License</a>.
      </footer>
    </div>
  );
}
