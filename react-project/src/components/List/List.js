import { React } from "react";
import { useSelector } from "react-redux";
import "./List.scss";

const List = () => {
  const searchResults = useSelector((state) => state.location.searchResults);

  return (
    <div className="list">
      {searchResults.map((result, i) => {
        return (
          <div key={i} className="list__item">
            <span className="list__item--heading">{result.address}</span>
            <p>{result.attributes.Place_addr}</p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
