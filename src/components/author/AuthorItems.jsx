import Card from "../UI/Card";
import CardSkeleton from "../UI/CardSkeleton";

const AuthorItems = ({ author, collection, isLoading }) => {

const skeletonArray = new Array(8).fill(0)

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          { isLoading 
          ? skeletonArray.map((_, i) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
            <CardSkeleton showTimer={false} />
            </div>
          ))
          : collection.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <Card item={item} author={author}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
