import { PostCard } from "@/design";
import { ChatMessage } from "@/interface";
import { cn, Moment } from "@/util";
import { Link } from "react-router-dom";

export default function Messages({ posts }: { posts?: ChatMessage[] }) {
  const header = {
    // positions: "fixed top-35 left-0",
    sizes: "w-full",
    styles: "bg-white",
  };
  return (
    <div>
      <div className={cn(header)}>
        <div className="pr-9 flex justify-end gap-5 w-full h-13 border-b ">
          <Link to="/chat" className="font-bold">
            매세지
          </Link>
          <Link to="/chat/receive">받은 요청</Link>
          <Link to="/chat/send">보낸 요청</Link>
        </div>
      </div>
      <div>
        {posts?.map(({ id, member, lastMessage }) => {
          return (
            <Link key={id} to={`${id}`} state={{ nickname: member?.nickname }}>
              <div className="flex justify-between mx-7 py-6.25 border-y border-gray-200">
                <div className="flex">
                  <img
                    src={member?.profileImageUrl as string}
                    className="h-17.5 w-17.5 rounded-full bg-gray-200 "
                    alt="profileImage"
                  />
                  <div className="ml-3.5">
                    <div className="text-1xl font-bold">{member?.nickname}</div>
                    <div className="text-1xl">{member?.introduction}</div>
                    <div className="text-1xl">{lastMessage?.message}</div>
                  </div>
                </div>
                <div>{Moment.getDateFromNow(lastMessage?.createdAt)}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
