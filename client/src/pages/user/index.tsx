import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetToken } from "../../hooks/useGetToken";
import TransactionForm from "./TransactionForm";
import { SERVER_HOST, SERVER_PORT } from "../../utils/config";

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [data, setData] = useState({ userId: NaN, username: "", balance: NaN });
  const storedData = useGetToken();

  const id = location.pathname.split("/users/")[1];

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `http://${SERVER_HOST}:${SERVER_PORT}/users/${id}`
        );
        const jsonResponse = await response.json();
        setData({
          userId: jsonResponse.id,
          username: jsonResponse.username,
          balance: jsonResponse.balance,
        });
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center w-full mt-14">
        <h3>Loading</h3>
      </div>
    );
  }

  if (error || !storedData?.userId) {
    return (
      <div className="text-center w-full mt-14">
        <h3>404</h3>
      </div>
    );
  }

  return (
    <div className="flex justify-center  md:items-start mt-14 gap-5 md:flex-row flex-col items-center ">
      <div className="h-[300px] flex flex-col  bg-gray-50 p-8 rounded max-w-sm shadow-[#0003] shadow-sm gap-2 w-full ">
        <h3 className="text-center mb-3 truncate">Username: {data.username}</h3>
        <h5>ID: {data.userId}</h5>
        <h5>Balance: {data.balance}</h5>
      </div>
      {String(storedData?.userId) === id && (
        <div className="h-[300px] flex flex-col bg-gray-50 p-8 rounded max-w-sm shadow-[#0003] shadow-sm gap-2">
          <h3 className="text-center">Send Funds</h3>
          <TransactionForm setUserData={setData} userData={data} />
        </div>
      )}
    </div>
  );
}
