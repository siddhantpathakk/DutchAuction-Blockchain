import { ethers } from "ethers";
import { abi, contractAddress, abi2 } from "./constants";
import { errors } from "./err";

export const getPrice = async () => {
  if (typeof window.etheruem !== undefined) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let transactiponResponse;
    try {
      transactiponResponse = await contract.getPrice();
    } catch (e) {
      console.log(e);
    }
    console.log(transactiponResponse.toNumber() / 10 ** 18);
    return transactiponResponse.toNumber() / 10 ** 18;
  }
};

export const stake = async (ethAmount) => {
  console.log(typeof ethAmount);
  if (typeof window.etheruem !== undefined) {
    console.log("---test----");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let transactiponResponse;
    try {
      transactiponResponse = await contract.buy({
        value: ethers.utils.parseEther(ethAmount),
      });
      console.log(transactiponResponse);
      console.log(transactiponResponse.value.toString());
    } catch (err) {
      console.log(err.reason);
      console.log(errors);
      return errors[err.reason];
    }
    return `Eth staked: ${ethAmount}`;
  }
};

export const claim = async () => {
  if (typeof window.etheruem !== undefined) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let transactiponResponse;
    try {
      transactiponResponse = await contract.claim();
      console.log(transactiponResponse);
      console.log(transactiponResponse.value.toString());
      return "Please Claim Now";
    } catch (err) {
      console.log(err.reason);
      if (errors[err.reason]) {
        return errors[err.reason];
      } else {
        return "";
      }
    }
  }
};

export const attack = async () => {
  if (typeof window.etheruem !== undefined) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi2,
      signer
    );
    let transactiponResponse;
    try {
      transactiponResponse = await contract.attack({
        value: ethers.utils.parseEther("1.0"),
      });
      console.log(transactiponResponse);
      console.log(transactiponResponse.value);
    } catch (err) {
      console.log(err.reason);
    }
  }
};

export const getTokens = async () => {
  if (typeof window.etheruem !== undefined) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let transactiponResponse = "";
    try {
      transactiponResponse = await contract.getTokenBalance();
      //console.log(ethers.utils.formatEther(transactiponResponse));
      console.log(transactiponResponse.toNumber());
    } catch (e) {
      console.log("err");
      console.log(e);
    }
    return transactiponResponse.toString();
  }
};

export const auctionStatus = async () => {
  if (typeof window.etheruem !== undefined) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let transactiponResponse = "";
    let tx = "";
    try {
      transactiponResponse = await contract.auctionFinished();
      tx = await contract.getStatus();
      //console.log(ethers.utils.formatEther(transactiponResponse));
      console.log(tx);
    } catch (e) {
      console.log("err");
      console.log(e);
    }
    if (tx) {
      return "Auction Finished";
    } else {
      return "Auction in Progress";
    }
  }
};
