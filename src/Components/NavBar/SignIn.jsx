import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle } from "../../Firebase/googleProvider";
import { logoutHandler } from "../../Redux/Slices/authSlice";
import { resetBookmarks } from "../../Redux/Slices/bookmarksSlice";
import { useTranslation } from "react-i18next";
import { BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";

function SignIn() {
  const language = Cookies.get("i18next");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(logoutHandler());
    dispatch(resetBookmarks());
  }
  return !isLoggedIn ? (
    <Button
      colorScheme="black"
      onClick={() => signInWithGoogle(dispatch)}
      leftIcon={<FaGoogle />}
    >
      {t("sign_in")}
    </Button>
  ) : (
    <Box>
      <Button
        onClick={handleSignOut}
        colorScheme="white"
        rightIcon={language === "ar" ? <BiLogOut size="20" /> : <FiLogOut />}
        fontWeight="semibold"
        fontSize="sm"
      >
        {t("sign_out")}
      </Button>
    </Box>
  );
}

export default SignIn;
