import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const w = window.innerWidth;
    if (w < 576) setSlidesToShow(1);
    else if (w < 768) setSlidesToShow(2);
    else if (w < 992) setSlidesToShow(3);
    else setSlidesToShow(4);
  }, []);

  useEffect(() => {
    async function getCollections() {
      setIsLoading(true);

      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(data);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getCollections();
  }, []);

  function PrevArrow({ className, onClick }) {
    return (
      <button className={className} onClick={onClick}>
        ‹
      </button>
    );
  }

  function NextArrow({ className, onClick }) {
    return (
      <button className={className} onClick={onClick}>
        ›
      </button>
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const skeletonArray = Array(slidesToShow).fill(0);

  return (
    <section id="section-collections" className="no-bottom hot-collections">
      <div className="container">
        <div className="row" style={{ overflow: "visible" }}>
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider
            {...settings}
            className="mt-4"
            style={{ overflow: "visible" }}
          >
            {isLoading
              ? skeletonArray.map((_, i) => (
                  <div className="px-1 px-md-2" key={`skeleton-${i}`}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton
                          width="100%"
                          height="200px"
                          borderRadius="10px 10px 0 0"
                        />
                      </div>

                      <div className="nft_coll_pp" style={{ lineHeight: 0 }}>
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius="50%"
                        />
                      </div>

                      <div className="nft_coll_info">
                        <Skeleton
                          width="50%"
                          height="20px"
                          borderRadius="4px"
                          style={{
                            display: "block",
                            margin: "0 auto 8px",
                          }}
                        />
                        <Skeleton
                          width="30%"
                          height="18px"
                          borderRadius="4px"
                          style={{ 
                            display: "block",
                            margin: "0 auto"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : collections.map((collection) => (
                  <div className="px-1 px-md-2" key={collection.nftId}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>{`ERC-${collection.code}`}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
