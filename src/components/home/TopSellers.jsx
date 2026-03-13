import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getTopSellers() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );
        setTopSellers(data);
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getTopSellers();
  }, []);

  const skeletonArray = new Array(12).fill(0);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-in">
            <ol className="author_list">
              {isLoading
                ? skeletonArray.map((_, i) => (
                    <li key={`skeleton${i}`}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i
                          className="fa fa-check"
                          style={{ bottom: "4px" }}
                        ></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton
                          width="70%"
                          height="18px"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="35%"
                          height="14px"
                          borderRadius="4px"
                          style={{
                            display: "block",
                          }}
                        />
                      </div>
                    </li>
                  ))
                : topSellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
