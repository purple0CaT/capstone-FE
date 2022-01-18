// import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// import { ReduxStore } from "../types/reduxStore";
// //
// const useGetTokens = () => {
//   const { tokens } = useSelector((state: ReduxStore) => state);
//   return tokens.accessToken;
// };
const socket = io(process.env.REACT_APP_FETCHURL!, {
  auth: {
    accessToken: " useGetTokens()",
  },
  transports: ["websocket"],
});

export default socket;
