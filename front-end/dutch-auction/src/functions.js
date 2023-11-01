import { ethers } from "ethers";
import { abi, contractAddress } from "./constants";
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
    console.log(transactiponResponse.toNumber());
    return transactiponResponse.toNumber();
  }
};

export const stake = async (ethAmount) => {
  ethAmount = "0.1";
  if (typeof window.etheruem !== undefined) {
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
      console.log(transactiponResponse.value);
    } catch (err) {
      console.log(err.reason);
      if (
        (err.reason =
          "Error: VM Exception while processing transaction: reverted with reason string 'Auction time has elapsed'")
      ) {
        return "Auction has finished!";
      }
    }
    return `Eth staked: ${ethAmount}`;
  }
};

export const claim = async () => {
  const ethAmount = "0.1";
  if (typeof window.etheruem !== undefined) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let transactiponResponse;
    try {
      transactiponResponse = await contract.claim();
      console.log(transactiponResponse);
      console.log(transactiponResponse.value);
    } catch (err) {
      err = JSON.stringify(err, Object.getOwnPropertyNames(err));
      console.log(err);
    }
  }
};
