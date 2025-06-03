"use client";

import { useState } from "react";
import { Member } from "@/lib/getMembers";
import Image from "next/image";
import Link from "next/link";

interface Props {
  members: Member[];
}

export default function MemberList({ members }: Props) {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter((member) => {
    const fullName = `${member.name.first} ${member.name.last}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Search by first and/or last name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-[30%] px-2 py-2 border rounded-lg"
      />
      <div className="flex flex-wrap gap-2">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <Link
              key={member.login.uuid}
              href={{
                pathname: "/profile",
                query: {
                  member: encodeURIComponent(JSON.stringify(member)),
                },
              }}
              className="w-full md:w-[30%]"
            >
              <div className="flex items-center p-2 space-x-2 border rounded-lg">
                <Image
                  src={member.picture?.thumbnail}
                  alt="profile photo"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-semibold">
                    {member.name?.first ?? ""} {member.name?.last ?? ""} - Age: {member.dob?.age ?? "Unknown"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No matching members found.</p>
        )}
      </div>
    </div>
  );
}
