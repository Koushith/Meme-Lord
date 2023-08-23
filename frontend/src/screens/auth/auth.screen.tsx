import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AuthScreen = () => {
  const { isAuthendicated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthendicated) {
      navigate("/");
    }
  }, [isAuthendicated]);
  return <p>Auth Screen</p>;
};
