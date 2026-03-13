import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";
import CardSkeleton from "../components/UI/CardSkeleton";

const Explore = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const [filter, setFilter] = useState("")
  

  useEffect(() => {
    async function getExploreItems() {
      setIsLoading(true);

      let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"

      if (filter) {
        url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      }

      try {
        const { data } = await axios.get(url);
        setExploreItems(data);
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getExploreItems();
  }, [filter]);

  function handleFilterChange(value) {
    setFilter(value)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skeletonArray = new Array(12).fill(0);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top`}}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 data-aos="fade-in">Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row" data-aos="fade-in">
              {isLoading ? (
                skeletonArray.map((_, i) => (
                  <div
                    key={i}
                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{ display: "block", backgroundSize: "cover" }}
                  >
                    <CardSkeleton showTimer={true} />
                  </div>
                ))
              ) : (
                <ExploreItems 
                exploreItems={exploreItems} 
                handleFilterChange = {handleFilterChange} 
                filter = {filter}/>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
