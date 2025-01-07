import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../../lib/apiRequest";
function SignupPage() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);
      const response = await apiRequest.post("auth/register", {
        email,
        password,
        username,
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />

          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}

          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default SignupPage;
