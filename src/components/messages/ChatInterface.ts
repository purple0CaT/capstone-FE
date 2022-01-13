import { singleChatType } from "../../types/reduxStore";

export interface ChatDrawerType {
  closeChatsDrawer: () => void;
}
export interface ActiveChatImprt {
  activeChat: singleChatType;
}

export interface SendMessageType {
  chatHistory: singleChatType;
  allChats: singleChatType[];
}

export interface CloseSettingModalsType {
  handleCloseSettings: () => void;
  CloseSettingsModal: boolean;
}
