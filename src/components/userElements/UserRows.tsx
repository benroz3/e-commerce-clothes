"use client";
import { useState } from "react";
import PageTransition from "../style/PageTransition";
import { format } from "timeago.js";
import { UserRowType } from "@/utils/types";
import { AiOutlineSearch } from "react-icons/ai";

const UserRows: React.FC<{ users: UserRowType[] }> = ({ users }) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <PageTransition>
      <div className="flex items-center ml-8 mt-3 border-b border-b-black w-[20%]">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border-none outline-none"
          onChange={(event) => setSearch(event.target.value)}
        />
        <AiOutlineSearch />
      </div>
      <div className="w-[80vw] px-4 sm:px-6 lg:px-8">
        <div className="mt-5 flex flex-col">
          <div className="flex items-center justify-between gap-3 mt-5 w-[80vw] bg-black rounded-t p-2">
            <span className="w-[20%] text-white ml-4">Username</span>
            <span className="w-[20%] text-white">Email</span>
            <span className="w-[20%] text-white">Created At</span>
            <span className="w-[20%] text-white mr-4">Updated At</span>
          </div>
          {filteredUsers && filteredUsers.length
            ? filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between gap-3 w-[80vw] bg-gray-300 p-2"
                >
                  <span className="w-[20%] ml-4">{user.username}</span>
                  <span className="w-[20%]">{user.email}</span>
                  <span className="w-[20%]">{format(user.createdAt)}</span>
                  <span className="w-[20%] mr-4">{format(user.updatedAt)}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    </PageTransition>
  );
};

export default UserRows;