import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";

const AuthForm = ({ title, url }: TAuthForm) => {
  const history = useHistory();
  const [error, setError] = useState<string | undefined>("");

  function parseJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = e.target as typeof e.target & AuthFormData;

    try {
      const response = await fetch(
        `http://${SERVER_HOST}:${SERVER_PORT}${url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200 || response.status === 201) {
        const parsedData = parseJwt(data.token);
        localStorage.setItem("token", data.token);
        history.replace(`/users/${parsedData.userId}`);
      } else {
        console.error(data.message);
        return setError(data.message);
      }
    } catch (error) {
      console.error("There was an error logging in:", error);
    }
  };

  return (
    <div className="flex justify-center mt-14">
      <div className="bg-gray-50 p-8 rounded w-96 shadow-[#0003] shadow-sm">
        <h2 className="text-2xl mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-primary  text-sm font-bold hover:bg-secondary hover:text-primary"
          >
            {title}
          </button>
        </form>
        {title === "Register" ? (
          <p className="mt-4 mb-1 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        ) : (
          <p className="mt-4 mb-1 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        )}

        <p className="text-center text-red-500">{error}</p>
      </div>
    </div>
  );
};

export default AuthForm;
