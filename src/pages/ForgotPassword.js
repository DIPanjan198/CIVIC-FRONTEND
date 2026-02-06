import { useState } from "react";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      alert("Reset link sent to your email");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Forgot Password</h2>
      <input
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}

export default ForgotPassword;
