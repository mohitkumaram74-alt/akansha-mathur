import { Url_image } from "./Links";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
const Cards = (props) => {
  const { darkMode } = useContext(ThemeContext);
  const { reStart } = props;

  if (!reStart || !reStart.info) {
    return;
  }
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, sla } =
    reStart.info;

  return (
    <div className="card">
      <img src={Url_image + cloudinaryImageId} className="pic" />
      <h1>{name}</h1>
      {/* <h4>{cuisines.join(", ")}</h4> */}
      <h4>{avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla?.deliveryTime} minutes</h4>
    </div>
  );
};

export default Cards;
