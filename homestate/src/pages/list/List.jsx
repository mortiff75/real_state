import Filter from "../../components/filter/Filter";
import "./list.scss";
import Card from "../../components/card/Card";
import MyMap from "../../components/map/Map";
import { useLocation } from "react-router-dom";
import { apiRequest } from "../../lib/apiRequest.js";
import { DNA } from "react-loader-spinner";
import { useEffect, useState } from "react";

const ListPage = () => {
  const location = useLocation();
  const [posts, setPosts] = useState({
    error: null,
    posts: null,
    isLoading: false,
  });

  const fetchPosts = async () => {
    try {
      setPosts({ error: null, posts: null, isLoading: true });

      const res = await apiRequest.get(`posts${location.search}`);

      setPosts((pre) => ({ ...pre, posts: res.data }));
    } catch (error) {
      setPosts((pre) => ({
        ...pre,
        error,
      }));
    } finally {
      setPosts((pre) => ({ ...pre, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [location.search]);

  return (
    <section className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter
            onClick={() => {
              fetchPosts();
            }}
          />

          {posts.error && (
            <h1>
              {posts.error.response?.data?.message || "Failed to Fetch Posts"}
            </h1>
          )}

          {posts.isLoading && (
            <DNA width={60} height={60} wrapperClass="loader" />
          )}

          {posts.posts &&
            posts.posts.length > 0 &&
            posts.posts.map((post) => <Card key={post.id} card={post} />)}

          {posts.posts && posts.posts.length < 1 && <h1>No Posts Found</h1>}
        </div>
      </div>

      <div className="mapContainer">
        <MyMap markers={posts.posts || []} />
      </div>
    </section>
  );
};

export default ListPage;
