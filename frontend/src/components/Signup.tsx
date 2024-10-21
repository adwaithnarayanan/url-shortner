import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";
import { signupUser } from "../../API";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const response = await signupUser({ email, username, password });

    if (response.success) {
      toast.success("Succesfully created user");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="flex flex-col w-full max-w-[520px] shadow-lg px-9 py-8 bg-four items-center"
      >
        <h2 className="uppercase text-xl font-semibold text-primary my-2 w-full text-center">
          create an account
        </h2>
        <InputField
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Signup</Button>
        <div
          className="w-full text-end cursor-pointer mt-3 hover:underline hover:text-primary"
          onClick={() => navigate("/login")}
        >
          Already have an account?
        </div>
      </form>
    </div>
  );
};

export default Signup;
