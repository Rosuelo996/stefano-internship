import Skeleton from "./Skeleton"

const CardSkeleton = () => {
  return (
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
  )
}

export default CardSkeleton