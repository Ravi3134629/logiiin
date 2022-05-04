import Cookies from "js-cookies";
import React from "react";
import { Link } from "react-router-dom";
import "../Auth.css";
import loginUser from "../utils/loginUser";
import createUser from "../utils/makeUser";

function FormControl({ type, id, label, placeholder, value, setValue }) {
  return (
    <div className="form_control">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function Auth({ type }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [plan, setPlan] = React.useState(1);

  const handleSignup = (e) => {
    e.preventDefault();
    createUser({ email, password, name, priority: plan })
      .then((r) => {
        console.log(r);
        const { success, message } = r;
        if (!success) {
          alert(message);
        } else {
          window.location.href = "/auth/login";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password }).then((r) => {
      const { token } = r;
      console.log(token);
      if (!token) {
        alert("Invalid email or password");
      } else {
        localStorage.setItem("token", token);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    });
  };
  return (
    <div className="auth">
      <div className="auth_form">
        <div className="auth_form_content">
          <h1>Welcome back!</h1>
          <p>Welcome back! please enter your details</p>
          <form onSubmit={type === "signup" ? handleSignup : handleLogin}>
            {type === "signup" && (
              <FormControl
                placeholder={"Name"}
                id="name"
                label={"Full Name"}
                value={name}
                setValue={setName}
                type="text"
              />
            )}
            <FormControl
              placeholder={"Email"}
              id="email"
              label={"Email"}
              value={email}
              setValue={setEmail}
              type="email"
            />
            <FormControl
              placeholder={"Password"}
              id="password"
              label={"Password"}
              value={password}
              setValue={setPassword}
              type="password"
            />
            {type === "signup" && (
              <>
                <p>Plans</p>
                <div className="plans">
                  <div className="plan">
                    <input
                      type="radio"
                      id="silver"
                      name="plan"
                      checked={plan === 1}
                      onChange={() => setPlan(1)}
                    />
                    <label htmlFor="silver">Silver</label>
                  </div>
                  <div className="plan">
                    <input
                      type="radio"
                      id="gold"
                      name="plan"
                      onChange={() => setPlan(2)}
                    />
                    <label htmlFor="gold">Gold</label>
                  </div>
                  <div className="plan">
                    <input
                      type="radio"
                      id="diamond"
                      name="plan"
                      onChange={() => setPlan(3)}
                    />
                    <label htmlFor="diamond">Diamond</label>
                  </div>
                  <div className="plan">
                    <input
                      type="radio"
                      id="platinum"
                      name="plan"
                      onChange={() => setPlan(4)}
                    />
                    <label htmlFor="platinum">Platinum</label>
                  </div>
                </div>
              </>
            )}
            <input
              type="submit"
              value={type === "signup" ? "Create Account" : "Login"}
            />
          </form>
          <div className="auth_switcher">
            <p>
              {type === "login" ? "Don't" : "Already"} have an account?{" "}
              <a href={type === "login" ? "/auth/signup" : "/auth/login"}>
                {type === "login" ? "Sign up for free" : "Login"}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="auth_image"></div>
    </div>
  );
}

export default Auth;
