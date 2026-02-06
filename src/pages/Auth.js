import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  // 🔐 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "admin") navigate("/admin");
      else navigate("/user");
    }
  }, [navigate]);

  const submit = async () => {
    try {
      if (isLogin) {
        // LOGIN
        const res = await api.post("/auth/login", form);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        alert("Login Successful");

        // ✅ ROLE BASED REDIRECT (FIX)
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }

      } else {
        // REGISTER
        await api.post("/auth/register", form);
        alert("Registered Successfully");
        setIsLogin(true);
      }
    } catch (err) {
      alert(isLogin ? "Login Failed" : "Registration Failed");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <input
          placeholder="Name"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      )}

      <input
        placeholder="Email"
        style={{ width: "100%", marginBottom: "10px" }}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        style={{ width: "100%", marginBottom: "10px" }}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button style={{ width: "100%" }} onClick={submit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p style={{ marginTop: "10px", textAlign: "center" }}>
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsLogin(false)}
            >
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
          </>
        )}
      </p>
    </div>
  );
}

export default Auth;
