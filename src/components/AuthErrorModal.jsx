/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function AuthErrorModal() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/logout");
  };

  return (
    <dialog className="text-center items-center justify-center mt-10">
      <h2 className="font-bold text-2xl">Session expired</h2>
      <p className="w-60 pt-2">
        It seems your credentials for this session expired. Please return to the
        home page and just login once again 😓
      </p>
      <Button onClick={returnHome} colorScheme="messenger" className="mt-5">
        Home
      </Button>
    </dialog>
  );
}

export default AuthErrorModal;
