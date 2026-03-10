import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async function getCollections() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`,
      );
      console.log(data);
      setCollections(data);
      setIsLoading(false);
    }

    getCollections();
  }, []);

  const getSlides = () => {
    const w = window.innerWidth;
    if (w < 576) return 1;
    if (w < 768) return 2;
    if (w < 992) return 3;
    return 4;
  };

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
    slidesToShow: getSlides(),
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

  const slidesToShow = getSlides()
  const skeletonArray = Array(slidesToShow).fill(0);

  return (
    <section id="section-collections" className="no-bottom">
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
                        <div className="skeleton skeleton--img"></div>
                      </div>

                      <div className="nft_coll_pp">
                        <div className="skeleton skeleton--avatar"></div>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <div className="skeleton skeleton--title"></div>
                        <div className="skeleton skeleton--text"></div>
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
