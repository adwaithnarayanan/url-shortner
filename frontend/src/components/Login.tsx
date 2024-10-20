import { FormEvent, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { loginUser } from "../../API";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const response = await loginUser({ email, password });

    if (response.status === 200) {
      navigate("/");
      toast.success("Successfully logged in", {});
      setEmail("");
      setPassword("");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-full max-w-[520px] shadow-lg px-9 py-8 bg-four items-center"
      >
        <h2 className="uppercase text-xl font-semibold text-primary my-2 w-full text-center">
          Login
        </h2>

        <InputField
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <div
          className="w-full text-end cursor-pointer mt-3 hover:underline hover:text-primary"
          onClick={() => navigate("/signup")}
        >
          Create an account
        </div>
      </form>
    </div>
  );
};

export default Login;
