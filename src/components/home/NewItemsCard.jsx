import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const [timer, setTimer] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimer();
    }, 1000);

    function updateTimer() {
      const currentTime = Date.now();
      const expiryTime = item.expiryDate;
      const millisLeft = expiryTime - currentTime;

      if (millisLeft <= 0) {
        setTimer(null);
        clearInterval(interval);
        return;
      }

      const secondsLeft = millisLeft / 1000;
      const minutesLeft = secondsLeft / 60;
      const hoursLeft = minutesLeft / 60;

      const secondsText = Math.floor(secondsLeft) % 60;
      const minutesText = Math.floor(minutesLeft) % 60;

      const hours = Math.floor(hoursLeft);
      const minutes = String(minutesText).padStart(2, "0");
      const seconds = String(secondsText).padStart(2, "0");

      const formatted = hours + "h " + minutes + "m " + seconds + "s";
      setTimer(formatted);
    }
    updateTimer();

    return () => {
      clearInterval(interval);
    };
  }, [item.expiryDate]);

  return (
    <div className="px-1 px-md-2">
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            <img className="lazy" src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {timer && <div className="de_countdown">{timer}</div>}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to={`/item-details/${item.id}`}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${item.id}`}>
            <h4>{item.title}</h4>
          </Link>
          <div className="nft__item_price">{item.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
