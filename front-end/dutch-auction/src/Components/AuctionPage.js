import { useState } from "react";
import {
  getPrice,
  stake,
  claim,
  auctionStatus,
  getTokens,
} from "../functions.js";
import "../styles/AuctionPage.css";
import TextField from "@mui/material/TextField";

function AuctionPage() {
  const [ethAmount, setEthAmount] = useState(0);
  const [currentPrice, setPrice] = useState(0);
  const [staked, setStake] = useState("Eth Staked : 0");
  const [claimed, setClaim] = useState("Auction in Progress");
  const [tokenBalance, setTokenBalance] = useState("1000");
  const [status, setStatus] = useState("In Progress");

  async function updatePrice() {
    setPrice(await getPrice());
  }

  async function updateStake() {
    console.log(ethAmount);
    const str = await stake(ethAmount);
    setStake(str);
    if ((str === "Auction Time has Elapsed") | (str == "Tokens Sold Out")) {
      setClaim("Please Claim Now");
      setStatus("Auction Finished");
    }
  }

  async function updateClaim() {
    const claimstr = await claim();
    if (claimstr === "Please Claim Now") {
      setStatus("Auction Finished");
    }
    setClaim(claimstr);
  }

  async function updateTokenBalance() {
    setTokenBalance(await getTokens());
  }

  async function updateStatus() {
    const statusStr = await auctionStatus();
    if (statusStr === "Auction Finished") {
      setClaim("Please Claim Now");
    }
    setStatus(statusStr);
  }
  return (
    <div className="Wrapper">
      <div className="title">WFCoin</div>
      <div className="ButtonRow">
        <button className="Button" onClick={updateStatus}>
          Auction Status
        </button>
        <button onClick={updatePrice}>Get Current Price</button>
        <button onClick={updateStake}>Stake Eth</button>
        <button onClick={updateClaim}>Claim Tokens</button>
        <button onClick={updateTokenBalance}>Token Balance</button>
      </div>
      <div className="StatusRow">
        <span>{status}</span>
        <span>{currentPrice} eth/coin</span>
        <span>{staked}</span>
        <span>{claimed}</span>
        <span>{tokenBalance}</span>
      </div>
      <div className="Input">
        <TextField
          style={{ backgroundColor: "whitesmoke" }}
          variant="filled"
          label="Eth to stake"
          value={ethAmount}
          onInput={(e) => setEthAmount(e.target.value)}
          placeholder="Enter Amount of Eth to stake"
        />
      </div>
    </div>
  );
}

export default AuctionPage;
