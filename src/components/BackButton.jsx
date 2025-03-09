// import React from "react";

import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = () => {
  const navigation = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigation(-1);
      }}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
