"use client";

import { useState } from "react";
import { useMembers } from "@/contexts/membersContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MemberList() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loadingProfile, setLoadingProfile] = useState(false);


  const { members, loading, error } = useMembers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  

  const filteredMembers = members.filter((member) => {
    const fullName = `${member.name.first} ${member.name.last}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-2">
      {loadingProfile ? (
        <p>Loading Profile...</p>
        ) : (
          <>
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
                  <div
                    onClick={() => {
                      setLoadingProfile(true);
                      router.push(`/profile/${member.login.uuid}`);
                    }}
                    key={member.login.uuid}
                    className="w-full md:w-[30%] cursor-pointer"
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
                  </div>
                ))
              ) : (
                <p>No matching members found.</p>
              )}
            </div>
          </>
        )}


      
    </div>
  );
}
