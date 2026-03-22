import { useState } from "react";
import { useAuth } from "../queries/authUser";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../zustand/authUser";

export default function Login() {
  const [state, setState] = useState<"login" | "signup">("login");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const { register, login } = useAuth();
  const { user } = useAuthUser();

  if (user) navigate("/");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state === "signup") {
      register.mutate(
        { firstName, lastName, email, password },
        {
          onSuccess: (data) => {
            if (data.success) {
              navigate("/");
            }
          },
        },
      );
    } else {
      login.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            if (data.success) {
              navigate("/");
            }
          },
        },
      );
    }
  };

  return (
    <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10 mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        {state === "login" ? "Welcome back" : "Create an account"}
      </h2>
      <form onSubmit={handleSubmit}>
        {state !== "login" && (
          <input
            id="firstName"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            placeholder="Enter your first name"
            required
            onChange={(e) => setFirstName(e.target.value.trim())}
          />
        )}
        {state !== "login" && (
          <input
            id="lastName"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            placeholder="Enter your last name"
            required
            onChange={(e) => setLastName(e.target.value.trim())}
          />
        )}
        <input
          id="email"
          className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <input
          id="password"
          className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="password"
          placeholder="Enter your password"
          required
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white mt-6 cursor-pointer"
        >
          {state === "login" ? "Log in" : "Sign up"}
        </button>
      </form>
      <p className="text-center mt-4">
        {state === "login"
          ? "Don’t have an account? "
          : "Do you have an account"}
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={() =>
            setState((prev) => (prev === "login" ? "signup" : "login"))
          }
        >
          {state === "signup" ? "Login" : "Signup"}
        </span>
      </p>
      <button
        type="button"
        className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
      >
        <img
          className="h-4 w-4"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
          alt="googleFavicon"
        />
        Log in with Google
      </button>
    </div>
  );
}
