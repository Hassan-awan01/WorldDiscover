// import React from "react"

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeLoginContext";
import { useEffect } from "react";
/* eslint-disable react/prop-types */
const ProtectAuth = ({ children }) => {
  const { authentication } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authentication) navigate("/");
  }, [authentication, navigate]);
  return authentication ? children : null;
};

export default ProtectAuth;
