import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import "flag-icon-css/css/flag-icon.min.css";
import { Box, HStack } from "@chakra-ui/layout";
import i18next from "i18next";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const language = Cookies.get("i18next");
  useEffect(() => {
    if (language === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
    history.push("/");
  }, [language]);
  return (
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
            onClick={() => i18next.changeLanguage(code)}
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
  );
}

export default Languages;
