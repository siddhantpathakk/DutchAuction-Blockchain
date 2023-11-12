import "./App.css";
import DrawerAppBar from "./Components/AppBar.js";
import "./Components/AuctionPage.js";
import AuctionPage from "./Components/AuctionPage.js";
import HomePage from "./Components/HomePage.js";
import InfoPage from "./Components/InfoPage.js";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);

  function RenderPage(props) {
    if (page === 1) {
      return <HomePage />;
    }
    if (page === 2) {
      return <AuctionPage />;
    }
    if (page === 3) {
      return <InfoPage />;
    }
  }

  function updatePage(page) {
    console.log(page);
    setPage(page);
  }

  return (
    <div className="App">
      <DrawerAppBar updatePage={updatePage} />
      <RenderPage />
    </div>
  );
}

export default App;
