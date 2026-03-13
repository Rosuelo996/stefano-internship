import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getItemDetails() {
      setIsLoading(true);

      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`,
        );
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getItemDetails();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {isLoading ? (
                  <Skeleton width="100%" height="100%" />
                ) : (
                  <img
                    src={items.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {isLoading ? (
                      <Skeleton width="60%" height="44px" />
                    ) : (
                      `${items.title} #${items.tag}`
                    )}
                  </h2>

                  {isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "20px",
                      }}
                    >
                      <Skeleton width="70px" height="26px" />
                      <Skeleton width="70px" height="26px" />
                    </div>
                  ) : (
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {items.views}
                      </div>

                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {items.likes}
                      </div>
                    </div>
                  )}

                  {isLoading ? (
                    <div style={{ marginBottom: "20px" }}>
                      <Skeleton width="85%" height="14px" />
                      <Skeleton width="95%" height="14px" />
                      <Skeleton width="90%" height="14px" />
                      <Skeleton width="80%" height="14px" />
                    </div>
                  ) : (
                    <p>{items.description}</p>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      {isLoading ? (
                        <>
                          <Skeleton
                            width="60px"
                            height="14px"
                            style={{ marginBottom: "10px" }}
                          />

                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </div>

                            <div className="author_list_info">
                              <Skeleton width="120px" height="16px" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h6>Owner</h6>

                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${items.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={items.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>

                            <div className="author_list_info">
                              <Link to={`/author/${items.ownerId}`}>
                                {items.ownerName}
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      {isLoading ? (
                        <>
                          <Skeleton
                            width="60px"
                            height="14px"
                            style={{ marginBottom: "8px" }}
                          />

                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </div>

                            <div className="author_list_info">
                              <Skeleton width="120px" height="16px" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h6>Creator</h6>

                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${items.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={items.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>

                            <div className="author_list_info">
                              <Link to={`/author/${items.creatorId}`}>
                                {items.creatorName}
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="spacer-40"></div>

                    {isLoading ? (
                      <>
                        <Skeleton
                          width="60px"
                          height="14px"
                          style={{ marginBottom: "8px" }}
                        />

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            marginBottom: "30px",
                          }}
                        >
                          <Skeleton
                            width="30px"
                            height="30px"
                            borderRadius="50%"
                          />
                          <Skeleton width="70px" height="30px" />
                        </div>
                      </>
                    ) : (
                      <>
                        <h6>Price</h6>

                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{items.price}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
