import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

function SuccessAlert({ text }) {
  return (
    <Alert
      w="25rem"
      position="fixed"
      left="50%"
      transform="translateX(-50%)"
      status="success"
      top="0"
      variant="solid"
    >
      <AlertIcon />
      {text}
    </Alert>
  );
}

export default SuccessAlert;
