import React from "react";
import { cn, Moment } from "@/util";
import { Link } from "react-router-dom";
import { SendReceiveChat, ChatResponse, OnClick } from "@/interface";

export default function SendReceiveMessages({
  mutate,
  deleteCoffeeChat,
  pathname,
  posts,
}: {
  mutate: OnClick<ChatResponse>;
  deleteCoffeeChat: OnClick<number>;
  pathname: string;
  posts?: SendReceiveChat;
}) {
  const header = {
    // positions: "fixed top-35 left-0",
    sizes: "w-full",
    styles: "bg-white",
  };

  return (
    <div>
      <div className={cn(header)}>
        <div className="pr-9 flex justify-end  gap-5 w-full h-13 border-b ">
          <Link to="/chat">매세지</Link>
          <Link
            to="/chat/receive"
            className={pathname === "/chat/receive" ? "font-bold" : ""}
          >
            받은 요청
          </Link>
          <Link
            to="/chat/send"
            className={pathname === "/chat/send" ? "font-bold" : ""}
          >
            보낸 요청
          </Link>
        </div>
      </div>
      <div>
        {posts?.coffeeChatRequests?.map(
          ({
            id,
            createdAt,
            member: { nickname, profileImageUrl, introduction },
            status,
          }) => {
            return (
              <div key={id} className="mx-7">
                <div className="flex justify-between py-3.75  border-t border-gray-200">
                  <div className="flex">
                    <img
                      src={profileImageUrl as string}
                      className="h-12.5 w-12.5 rounded-full bg-gray-200 "
                      alt="profileImage"
                    />
                    <div className="ml-3.5">
                      <div className="text-1xl font-bold">{nickname}</div>
                      <div className="text-1xl">{introduction}</div>
                    </div>
                  </div>
                  <div>{Moment.getDateFromNow(createdAt)}</div>
                </div>
                <div className="mt-6.25 mb-3.75 flex justify-end">
                  {pathname === "/chat/receive" ? (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="w-17.5 h-7.5 rounded bg-bright-purple text-white"
                        onClick={() => mutate({ id, answer: "Y" })}
                      >
                        수락
                      </button>
                      <button
                        type="button"
                        className="w-17.5 h-7.5 rounded border-[1px] border-solid border-white-gray"
                        onClick={() => mutate({ id, answer: "N" })}
                      >
                        거절
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="px-8 h-7.5 rounded border-[1px] border-solid border-white-gray"
                      >
                        {status}
                      </button>
                      <button
                        type="button"
                        className="w-17.5 h-7.5 rounded bg-bright-purple text-white"
                        onClick={() => deleteCoffeeChat(id)}
                      >
                        취소
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
