import React, { useState } from "react";
import { useGetToken } from "../../hooks/useGetToken";
import { SERVER_HOST, SERVER_PORT } from "../../utils/config";

export default function TransactionForm({
  setUserData,
  userData,
}: TTransactionForm) {
  const parsedToken = useGetToken();
  const [error, setError] = useState<string | undefined>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError("");
      const { receiverId, amount } = e.target as typeof e.target &
        TransactionFormData;
      const token = localStorage.getItem("token");

      const response: Response = await fetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            senderId: parsedToken.userId,
            receiverId: +receiverId.value,
            amount: +amount.value,
          }),
        }
      );
      const jsonResponse = await response.json();
      if (response.status !== 201) {
        return setError(jsonResponse.message);
      }

      setUserData({
        ...userData,
        balance: userData.balance - +amount.value,
      });
    } catch (error) {
      console.error("There was an error logging in:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="receiverId"
        placeholder="Recipient ID"
        className="mt-1 p-2 w-full border rounded-md"
      />
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        className="mt-1 p-2 w-full border rounded-md"
      />
      <button
        type="submit"
        className="w-full rounded text-black bg-secondary p-4 text-md font-bold"
      >
        Send
      </button>
      <p className="text-center text-red-500">{error}</p>
    </form>
  );
}
