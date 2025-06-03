"use client";

import { Member } from "@/lib/getMembers";
import Image from "next/image";
import { format } from "date-fns";

export default function MemberProfile({ member }: { member: Member }) {
  return (
    <div className="p-4 space-y-4">
      <Image
        src={member.picture.large}
        alt="Profile photo"
        width={150}
        height={150}
        className="rounded-lg"
      />
      <h1 className="text-2xl font-bold">
        {member.name.first} {member.name.last}
      </h1>
      <p>
        <strong>Address:</strong>{" "}
        {member.location.street.number} {member.location.street.name},{" "}
        {member.location.city}, {member.location.state}{" "}
        {member.location.postcode}
      </p>
      <p>
        <strong>Email:</strong> {member.email}
      </p>
      <p>
        <strong>Date of Birth:</strong>{" "}
        {format(new Date(member.dob.date), "MMMM d, yyyy")}
      </p>
      <p>
        <strong>Phone:</strong> {member.phone}
      </p>
    </div>
  );
}
