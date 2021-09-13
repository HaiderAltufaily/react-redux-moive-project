import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import "flag-icon-css/css/flag-icon.min.css";
import {
  Box,
  HStack,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import i18next from "i18next";
import Cookies from "js-cookie";

import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setChangeMoviesLanguage } from "../../Redux/Slices/translationSlice";
// import { useTranslation } from "react-i18next";
const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ar",
    name: "العربية",
    country_code: "eg",
  },
];
function Languages() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const language = Cookies.get("i18next");
  const { onClose } = useDisclosure();

  // const { t } = useTranslation();
  useEffect(() => {
    if (language === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [language]);
  return (
    <>
      {showModal && (
        <AlertDialog
          isOpen={true}
          onClose={onClose}
          motionPreset="slideInBottom"
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader px="10">
              {language === "ar" ? "تغيير الأفلام؟" : "Change Movies?"}
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {language === "ar"
                ? "هل تريد عرض الأفلام العربية حصرا؟"
                : "Do u want to exclusivly include english movies?"}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                onClick={() => {
                  setShowModal(false);
                  dispatch(setChangeMoviesLanguage(false));
                }}
              >
                {language === "ar" ? "كلا" : "No"}
              </Button>
              <Button
                mx="3"
                onClick={() => {
                  setShowModal(false);
                  dispatch(setChangeMoviesLanguage(true));
                }}
                colorScheme="red"
                ml={3}
              >
                {language === "ar" ? "نعم" : "Yes"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Menu size="sm">
        <MenuButton
          bg="transparent"
          _hover={{ background: "gray" }}
          _active={{ background: "gray" }}
          icon={<FaGlobe size="25" />}
          as={IconButton}
        >
          Actions
        </MenuButton>
        <MenuList>
          {languages.map(({ name, country_code, code }) => (
            <MenuItem
              onClick={() => {
                i18next.changeLanguage(code);
                history.push("/");
                setShowModal(true);
              }}
              cursor={code === language && "auto"}
              _hover={language === code && { background: "gray.200" }}
              background={code === language && "gray.200"}
              fontSize="md"
              mb="1"
              textAlign="center"
              color="black"
              key={country_code}
            >
              <HStack textAlign="center">
                <Box
                  mx="2"
                  className={`flag-icon flag-icon-${country_code}`}
                ></Box>{" "}
                <Text> {name} </Text>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default Languages;
