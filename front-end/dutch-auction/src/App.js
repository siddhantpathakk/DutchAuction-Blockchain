import "./App.css";
import { useEffect, useState } from "react";
import { getPrice, stake, claim, attack, getTokens } from "./functions.js";

function App() {
  const [ethAmount, setEthAmount] = useState(0);
  const [currentPrice, setPrice] = useState(0);
  const [MM_connected, setState] = useState(false);
  const [staked, setStake] = useState("Eth Staked : 0");
  const [claimed, setClaim] = useState("Auction in Progress");
  useEffect(() => {
    (async function () {
      setState(await checkMM());
    })();
  });

  async function updatePrice() {
    setPrice(await getPrice());
  }

  async function updateStake() {
    console.log(ethAmount);
    setStake(await stake(ethAmount));
  }

  async function updateClaim() {
    setClaim(await claim());
  }
  return (
    <div className="App">
      <div className="title">WFCoin</div>
      <div className="ButtonRow">
        <button className="Button" onClick={checkMM}>
          connect
        </button>
        <button onClick={updatePrice}>Get Current Price</button>
        <button onClick={updateStake}>Stake Eth</button>
        <button onClick={updateClaim}>Claim Tokens</button>
      </div>
      <div className="StatusRow">
        <span>{MM_connected ? "Connected" : "Connect to MetaMask"}</span>
        <span>{currentPrice}</span>
        <span>{staked}</span>
        <span>{claimed}</span>
      </div>
      <div className="Input">
        <input
          value={ethAmount}
          onInput={(e) => setEthAmount(e.target.value)}
        />
      </div>
      <div>
        <button onClick={attack}>attack</button>
      </div>
      <div>
        <button onClick={getTokens}>getTokenBalance</button>
      </div>
    </div>
  );
}

async function checkMM() {
  if (typeof window.ethereum !== "undefined") {
    try {
      window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (e) {
      console.log(e);
    }
    return true;
  } else {
    return false;
  }
}

export default App;
