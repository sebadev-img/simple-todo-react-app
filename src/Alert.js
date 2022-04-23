import React from "react";
import { useEffect } from "react";
import "./Alert.css";

function Alert({ msg, type, removeAlert }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return <div className={`alert-container ${type}`}>{msg}</div>;
}

export default Alert;
