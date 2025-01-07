/* eslint-disable react/prop-types */
import "./list.scss";
import Card from "../card/Card";
const List = ({ posts }) => {
  return (
    <div className="list-card">
      {posts.map((item) => (
        <Card key={item.id} card={item} />
      ))}
    </div>
  );
};

export default List;
