import { useHistory, useLocation } from "react-router-dom";
import { useGetToken } from "../hooks/useGetToken";

export default function Navbar() {
  const history = useHistory();
  useLocation();
  const data = useGetToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };
  return (
    <nav className="shadow-[#0003] shadow-lg  lg:pl-28 lg:pr-28 pl-5 pr-5 pt-3 pb-3 ">
      <ul className="flex justify-between max-w-6xl m-auto">
        <li>
          <img
            src="https://uploads-ssl.webflow.com/633da8300c20e90eae97f601/63590f667484b06e114c8c96_Group%201431%20(1).png"
            className="w-14 h-14"
            alt="logo"
          />
        </li>
        <div className="flex">
          {data ? (
            <div className="flex items-center">
              <li className="text-md mr-3 truncate w-64 md:block hidden ">
                Welcome {data.username}
              </li>

              <li>
                <button
                  className="text-white bg-primary p-4 text-sm font-bold hover:bg-secondary hover:text-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </div>
          ) : (
            <li>
              <button
                className="text-white bg-primary p-4 text-sm font-bold hover:bg-secondary hover:text-primary"
                onClick={handleLogout}
              >
                Login
              </button>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}
