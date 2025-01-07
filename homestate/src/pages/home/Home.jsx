import Searchbar from "../../components/searchBar/Searchbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            deleniti labore vel officiis quidem neque sapiente doloremque
            consequatur possimus libero. Saepe inventore laboriosam, quibusdam
            laudantium delectus autem voluptatem vitae nemo!
          </p>
          <Searchbar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Exprience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="imageContainer">
        <img src="/bg.png" alt="Container Image" />
      </div>
    </div>
  );
};

export default Home;
