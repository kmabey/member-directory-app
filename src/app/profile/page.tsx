"use client";

import { useSearchParams } from "next/navigation";
import { Member } from "@/lib/getMembers";
import MemberProfile from "./memberProfile";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const memberParam = searchParams.get("member");

  if (!memberParam) return <p>Invalid member data</p>;

  let member: Member;
  try {
    member = JSON.parse(decodeURIComponent(memberParam));
  } catch (e) {
    return <p>Failed to parse member</p>;
  }

  return <MemberProfile member={member} />;
}

/*
I tried the following when using /page/[id] and passing in the login.uuid and kept getting errors.

interface Props {
  params: { id: string };
}

export default async function ProfilePage({ params }: Props) {
  const members = await getMembers();

  const member = members.find((m) => m.login.uuid === params.id);

  if (!member) return notFound();

  return <MemberProfile member={member} />;
}

I settled with the alternate solution although it was not my first choice.

I do understand that query strings have a length limit so this would not be a final solution.
This is a situation where I would ask a team member for their input on how the error can be fixed.

*/
