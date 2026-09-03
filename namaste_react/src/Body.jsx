import Cards from "./Cards";
import Simmer from "./Simmer";
import { useState, useEffect } from "react";
import useOnlineStatus from "./UseOnlineStatus";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";
import resList from "./Relist";
export default function Body() {
  const [resturant, setResturant] = useState([]);
  const [updatedResturant, setUpdatedResturant] = useState([]);
  const [searchText, setsearchText] = useState("");
  const { darkMode } = useContext(ThemeContext);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      // "https://www.swiggy.com/mapi/homepage/getCards?lat=28.65420&lng=77.23730",
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.45970&lng=77.02820&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );
    const response = await data.json();
    console.log(response.data.cards[2]);

    setResturant(
      response.data.cards[1].card.card.gridElements.infoWithStyle.restaurants,
    );
    setUpdatedResturant(
      response.data.cards[1].card.card.gridElements.infoWithStyle.restaurants,
    );
  };
  const onlinestatus = useOnlineStatus();
  if (onlinestatus === false) {
    return <h2>Your are offline</h2>;
  }
  if (updatedResturant.length === 0) {
    return <Simmer></Simmer>;
  }
  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(event) => setsearchText(event.target.value)}
            placeholder="Search for your food"
          />
          <button
            className="search-btn"
            onClick={() => {
              const textsearch = resturant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setUpdatedResturant(textsearch);
            }}
          >
            Search
          </button>
        </div>
        <div className="filter-btn">
          <button
            className="search-btn"
            onClick={() => {
              const top = resturant.filter((res) => res.info.avgRating > 4);
              setUpdatedResturant(top);
            }}
          >
            Top Resturent
          </button>
        </div>
      </div>
      <div className="card-container">
        {updatedResturant.length === 0 ? (
          <h1>Your data not Found</h1>
        ) : (
          updatedResturant.map((reStart) => (
            <Link
              className="link"
              key={reStart.info.id}
              to={"/resturants/" + reStart.info.id}
            >
              <Cards reStart={reStart} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
// https://chromewebstore.google.com/detail/lhobafahddgcelffkeicbaginigeejlf?utm_source=item-share-cb
