import { useState } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import RestaurantMenu from "./menuCard";
import useRestaurantMenu from "./util/useRestaurantMenu";

const ResMenu = () => {
  const { resId } = useParams();
  const [searchBtn, setSearchBtn] = useState("");
  const resinfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  console.log(resinfo);
  if (resinfo.length < 1) {
    <Shimmer />;
  }
  console.log(typeof resinfo);
  // .find((x) => x.groupedCard)
  //     ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
  //     ?.filter(
  //       (x) =>
  //         x["@type"] ==
  //         "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //     )
  //     ?.map((x) => x.itemCards)
  //     .flat(Infinity)
  //     .map((x) => x.card?.info)

  const { name, cuisines, costForTwoMessage } =
    resinfo?.cards[0]?.card?.card?.info;

  // const { itemCards } = resinfo?.cards.find((x) => x.groupedCard)?.groupedCard
  //   ?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  // const categories = resinfo?.cards
  //   .find((x) => x.groupedCard)
  //   ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
  //   ?.filter(
  //     (x) =>
  //       x["@type"] ==
  //       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //   );
  console.log(resinfo);
  console.log(name, cuisines);
  return (
    <div className="menu">
      {/* <div className="restaurantName">
        <h2>{name}</h2>
        <span>{cuisines}</span>
        <span>{costForTwoMessage}</span>
      </div> */}
      <div className="search-container">
        <input
          className="text"
          placeholder="Search Dish"
          value={searchBtn}
          onChange={(e) => {
            setSearchBtn(e.target.value);
            console.log(searchBtn);
            if (searchBtn.length === 1) {
              resinfo = useRestaurantMenu(resId);
            } else {
              const filteredMenu = resinfo.filter((res) =>
                res.card.info.name
                  .toLowerCase()
                  .includes(searchBtn.toLowerCase())
              );
              resinfo = filteredMenu;
            }
          }}
        />
      </div>

      {/* {resinfo.map((menu) => (
        <RestaurantMenu
          key={category?.card?.card.title}
          restaurantMenu={category?.card?.card}
        />
      ))} */}
      {/* {console.log(resinfo)} */}
    </div>
  );
};

export default ResMenu;
