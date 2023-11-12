import OutlinedCard from "./Card";
import "../styles/HomePage.css";
import { data } from "../Constants/card-details";

function HomePage() {
  return (
    <div>
      <div className="Title">WFcoin</div>
      <div className="Intro">Welcome to the Auction Site for WFCoin!</div>
      <div className="Card-Wrapper">
        {data.map((element) => (
          <OutlinedCard props={element} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
