import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import Card from "../UI/Card"
import CardSkeleton from "../UI/CardSkeleton";

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
                    <CardSkeleton />
                  </div>
                ))
              : newItems.map((item) => (
                <div key={item.id} className="px-1 px-md-2">
                  <Card item={item} />
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
