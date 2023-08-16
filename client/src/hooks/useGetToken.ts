import React from "react";
import { parseJwt } from "../utils/stringParsing";

export const useGetToken = () => {
  const token = localStorage.getItem("token");

  let parsedData: User = React.useMemo(() => {
    if (token) {
      return parseJwt(token);
    }
  }, [token]);

  return parsedData;
};
