import { useState, useEffect } from "react";
const useOnlineStatus = () => {
  const [statusOnline, setStatusOnline] = useState(true);
  useEffect(() => {
    window.addEventListener("offline", () => {
      setStatusOnline(false);
    });
    window.addEventListener("online", () => {
      setStatusOnline(true);
    });
  }, []);
  return statusOnline;
};
export default useOnlineStatus;
