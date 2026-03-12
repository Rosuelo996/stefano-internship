import { Link } from "react-router-dom";
import Card from "../UI/Card";
import { useState } from "react";



const ExploreItems = ({exploreItems, handleFilterChange, filter}) => {

  const [itemsToShow, setItemsToShow] = useState(8)

  function handleLoadMore() {
    setItemsToShow(itemsToShow + 4)
  }
  
  return (
    <>
      <div>
        <select 
        id="filter-items" 
        value={filter}
        onChange={(event) => handleFilterChange(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.slice(0, itemsToShow).map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
         <Card item = {item}/>
        </div>
      ))}
      <div className="col-md-12 text-center">
        {itemsToShow < exploreItems.length && (
        <Link to="" 
        id="loadmore" 
        className="btn-main lead"
        onClick={handleLoadMore}
        >
          Load more
        </Link>
        )}
        
      </div>
    </>
  );
};

export default ExploreItems;
