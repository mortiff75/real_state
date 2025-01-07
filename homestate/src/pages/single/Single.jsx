import Slider from "../../components/slider/Slider";
import "./single.scss";
import MyMap from "../../components/map/Map";
import useSwr from "swr";
import { apiRequest } from "../../lib/apiRequest";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Dompurify from "dompurify";
import { DNA } from "react-loader-spinner";
import { useContext, useState } from "react";
import { authContext } from "../../../context/auth";
const SinglePage = () => {
  const { id } = useParams();
  const { currentUser } = useContext(authContext);

  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  const {
    data: post,
    error,
    isLoading,
  } = useSwr("post", {
    fetcher: () => fetchPost(),
  });

  const fetchPost = async () => {
    const res = await apiRequest.get(`posts/${id}`);
    setSaved(res.data.isSaved);
    console.log(res.data);

    return res.data;
  };

  const handleSavePost = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      return navigate("/login");
    }
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  };
  if (isLoading) return <DNA width={60} height={60} wrapperClass="loader" />;

  if (error) return <h1>{error.response.data.message || "Invalid Error"}</h1>;
  console.log(post);

  return post ? (
    <section className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">${post.price}</div>
              </div>
              <div className="user">
                <img
                  src={post.user?.avatar || "/favicon.png"}
                  alt="userProfile"
                />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: Dompurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="utility" />
              <div>
                <span>Utilities</span>
                <p>Renter is Responsible</p>
              </div>
            </div>

            <div className="feature">
              <img src="/pet.png" alt="utility" />
              <div>
                <span>Pet Policy</span>
                <p>
                  {post.postDetail.pet === "allowed"
                    ? "Allowed"
                    : "Not Allowed"}
                </p>
              </div>
            </div>

            <div className="feature">
              <img src="/fee.png" alt="utility" />
              <div>
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="size" />
              <span>{post.postDetail.size} sqft</span>
            </div>

            <div className="size">
              <img src="/bed.png" alt="size" />
              <span>{post.bedroom} beds</span>
            </div>

            <div className="size">
              <img src="/bath.png" alt="size" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>

          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="utility" />
              <div>
                <span>School</span>
                <p>
                  {post.postDetail.school < 1000
                    ? `${post.postDetail.school}m `
                    : `${post.postDetail.school / 1000}km `}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="utility" />
              <div>
                <span>Bus Stop</span>
                <p>
                  {post.postDetail.bus < 1000
                    ? `${post.postDetail.bus}m `
                    : `${post.postDetail.bus / 1000}km `}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="utility" />
              <div>
                <span>Restuarant</span>
                <p>
                  {post.postDetail.restaurant < 1000
                    ? `${post.postDetail.restaurant}m `
                    : `${post.postDetail.restaurant / 1000}km `}
                  away
                </p>
              </div>
            </div>
          </div>

          <p className="title">Locations</p>
          <div className="mapContainer">
            <MyMap markers={[post]} />
          </div>

          <div className="buttons">
            <button>
              <img src="/chat.png" alt="Chat" />
              Send a Message
            </button>
            <button
              onClick={handleSavePost}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="Save Photo" />
              {saved ? "Place Saved" : "Save the Placed"}
            </button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Navigate to={"/"} />
  );
};

export default SinglePage;
