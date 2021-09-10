import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { signInWithGoogle } from "../../Firebase/googleProvider";

function AlertModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return (
    <>
      {
        <Link as="h3" cursor="pointer" onClick={() => setIsOpen(true)}>
          {t("bookmarks")}
        </Link>
      }

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("bookmarks_alert_header")}
            </AlertDialogHeader>

            <AlertDialogBody>{t("bookmarks_alert_body")}</AlertDialogBody>

            <AlertDialogFooter>
              <Button mx="3" ref={cancelRef} onClick={onClose}>
                {t("bookmarks_alert_close")}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  signInWithGoogle(dispatch);
                  onClose;
                }}
                ml={3}
              >
                {t("sign_in")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertModal;
