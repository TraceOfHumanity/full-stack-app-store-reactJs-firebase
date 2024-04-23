import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import useLanguage from "hooks/useLanguage";
import {
  setActiveChat,
  setActiveChatId,
  setChatTitle,
  setIsEditChatTitleMode,
} from "redux/chat/slice";
import { setActiveDocsService } from "redux/navigation/slice";
import {
  setIsShowPinPopup,
  setIsShowSettingsPopup,
  setPinPopupCoordinate,
  setSettingsPopupCoordinate,
} from "redux/popup/slice";
import { Icon, Notification } from "ui-elements";
import {
  check2Icon,
  check2IconDark,
  chevronBackIcon,
  chevronBackIconDark,
  pinFilledIcon,
  pinFilledIconDark,
  pinIcon,
  pinIconDark,
  renameIcon,
  renameIconDark,
  xIcon,
  xIconDark,
} from "utils/variables";

import styles from "./header.module.scss";
import {
  DocumentArrowDownIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import {
  DocumentArrowDownIcon as ActiveDocumentArrowDownIcon,
  Cog6ToothIcon as ActiveCog6ToothIcon
} from "@heroicons/react/24/solid";
import { cn } from "utils/cn";

export const Header = ({ heading }) => {
  const strings = useLanguage();
  const { service, id } = useParams();
  const location = window.location.pathname.split("/")[1];

  const settingsOptions = [
    {
      id: "attachments",
      icon: DocumentArrowDownIcon,
      activeIcon: ActiveDocumentArrowDownIcon,
      isActive: false,
    },
    {
      id: "pin",
      // icon: PowerIcon,
      defaultIcon: pinIcon,
      darkIcon: pinIconDark,
      activeIcon: pinFilledIcon,
      activeDarkIcon: pinFilledIconDark,
      tooltip: strings.pin,
      isActive: false,
    },
    {
      id: "settings",
      icon: Cog6ToothIcon,
      activeIcon: ActiveCog6ToothIcon,
      tooltip: strings.chatSettings,
      isActive: false,
    },
  ];

  const dispatch = useDispatch();
  const messageIsWriting = useSelector((state) => state.chat.messageIsWriting);
  const chat = useSelector((state) => state.chat.activeChat) || {};
  const chatId = useSelector((state) => state.chat.activeChatId);
  const { isEditChatTitleMode } = useSelector((state) => state.chat);
  const { isShowSettingsPopup, isShowPinPopup } = useSelector(
    (state) => state.popup,
  );

  const activePopup = (name) => {
    if (name === "pin" && isShowPinPopup) return true;
    if (name === "settings" && isShowSettingsPopup) return true;
    return false;
  };

  const [newChatTitle, setNewChatTitle] = useState(chat.title);
  const [buttonRefs, setButtonRefs] = useState(Array(settingsOptions.length).fill(null));
  const editChatNameRef = useRef(null);
  console.log(buttonRefs)

  const togglePopup = ({ index, option }) => {
    const ref = buttonRefs[index];
    if (option === "pin") {
      dispatch(setIsShowPinPopup(true));
      dispatch(
        setPinPopupCoordinate({
          x: ref.getBoundingClientRect().x + 12,
          y: ref.getBoundingClientRect().bottom + 40,
        }),
      );
    }
    if (option === "settings") {
      dispatch(setIsShowSettingsPopup(true));
      dispatch(
        setSettingsPopupCoordinate({
          x: ref.getBoundingClientRect().x + 12,
          y: ref.getBoundingClientRect().bottom + 40,
        }),
      );
    }
  };

  let basePath = window.location.pathname.split(`/${id}`)[0];
  if (service && !id) {
    basePath = window.location.pathname.split(`/${service}`)[0];
  }
  if (service && id) {
    basePath = window.location.pathname.split(`/${service}/${id}`)[0];
  }

  const onBackCLick = () => {
    dispatch(setActiveChat(null));
    dispatch(setActiveChatId(null));
    dispatch(setActiveDocsService(null));
  };

  const setEditMode = () => {
    dispatch(setIsEditChatTitleMode(true));
    setNewChatTitle(heading);
  };

  const saveNewTitle = () => {
    dispatch(setIsEditChatTitleMode(false));
    dispatch(setChatTitle(newChatTitle));
  };

  const discardTitleChange = () => {
    dispatch(setIsEditChatTitleMode(false));
  };

  useEffect(() => {
    if (isEditChatTitleMode) {
      editChatNameRef.current.focus();
    }
  }, [isEditChatTitleMode]);

  return (
    <div className={`${styles.header} header`}>
      <Link
        to={!messageIsWriting && basePath}
        className={styles.header__back}
        onClick={() => onBackCLick()}
      >
        <Icon default={chevronBackIcon} dark={chevronBackIconDark} />
      </Link>
      {!isEditChatTitleMode && (
        <h1>
          <span>
            {heading.length > 60
              ? `${heading.substring(0, 30)}...`
              : heading || strings.newChat}
          </span>
          {heading && id && (
            <button
              className={styles.changeChatName}
              onClick={() => setEditMode()}
            >
              <Icon default={renameIcon} dark={renameIconDark} />
            </button>
          )}
        </h1>
      )}
      {isEditChatTitleMode && (
        <div className={styles.editChatName}>
          <input
            ref={editChatNameRef}
            onChange={(e) => setNewChatTitle(e.target.value)}
            value={newChatTitle}
          />
          <button
            className={styles.changeChatName}
            onClick={() => saveNewTitle()}
          >
            <Icon default={check2Icon} dark={check2IconDark} />
          </button>
          <button
            className={styles.changeChatName}
            onClick={() => discardTitleChange()}
          >
            <Icon default={xIcon} dark={xIconDark} />
          </button>
        </div>
      )}

      <div className={styles.header__options}>
        {settingsOptions.map((option, index) => {
          if (option.id === "pin") {
            if (chat) {
              if (chat.messages) if (!chat.messages.length && !chatId) return;
            }
          }
          if (location == "translate") return;
          return (
            <button
              key={option.id}
              // className={`${styles.icon}`}
              className="relative block"
              onClick={() => togglePopup({ index, option: option.id })}
              ref={(ref) => (buttonRefs[index] = ref)}
            >
              {
                option.id === "attachments" && chat?.attachedDocs?.length && <Notification className="absolute -top-1 -right-1">{chat.attachedDocs.length}</Notification>
              }
              {
                option.id === "pin" ?
                  <Icon
                    default={option.defaultIcon}
                    dark={option.darkIcon}
                    active={option.activeIcon}
                    darkActive={option.activeDarkIcon}
                    isActive={activePopup(option.id)}
                  />
                  :
                  activePopup(option.id) || option.isActive === true ?
                    <option.activeIcon className="size-6"
                    />
                    :
                    <option.icon className="size-6"
                    />
              }
            </button>
          );
        })}
      </div>
    </div>
  );
};
