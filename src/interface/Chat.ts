import { Member } from "./Member";

interface LastMessage {
  message: string;
  createdAt: string;
  updateAt: string;
}

export interface ChatMessage {
  id: number;
  member: Member;
  lastMessage: LastMessage;
}

export interface PrivateMessage {
  id: number;
  member: Member;
  message: string;
  createdAt: string;
  updateAt: string;
}

export interface ChatPost {
  toMemberId: number;
  message: string;
}

export interface ChatRequest extends PrivateMessage {
  status: string;
}

export interface ChatResponse {
  id: number;
  answer: string;
}

export interface SendReceiveChat {
  coffeeChatRequests: ChatRequest[] | undefined;
  noReadCount: number;
}
