import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import Card from "./NewItemsCard"

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
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
    async function getNewItems() {
      setIsLoading(true);

      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setNewItems(data);
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getNewItems();
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
    <section id="section-items" className="no-bottom new-items">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {isLoading
              ? skeletonArray.map((_, i) => (
                  <div className="px-1 px-md-2" key={`skeleton-${i}`}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                          style={{
                            marginTop: "2px",
                            display:"flex",
                            position: "relative",
                          }}
                        />
                         <i className="fa fa-check"></i>
                        
                      </div>
                      <Skeleton
                        width="113px"
                        height="32px"
                        borderRadius="30px"
                        style={{
                          position: "absolute",
                          right: "20px",
                          padding: "1px 10px",
                          zIndex: 100,
                        }}
                      />

                      <div className="nft__item_wrap">
                        <Skeleton
                          width="100%"
                          height="221px"
                          borderRadius="8px"
                        />
                      </div>

                      <div className="nft__item_info">
                        <Skeleton
                          width="50%"
                          height="18px"
                          borderRadius="4px"
                          style={{
                            display: "block",
                            marginBottom: "5px"
                          }}
                        />
                        <Skeleton
                          width="30%"
                          height="16px"
                          borderRadius="4px"

                        />

                        <div
                          className="nft__item_like"
                          style={{
                            
                            bottom: "0", 
                          }}
                        >
                          <i className="fa fa-heart"></i>
                          <Skeleton
                            width="18px"
                            height="12px"
                            borderRadius="4px"
                            style={{ marginLeft: "6px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : newItems.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
