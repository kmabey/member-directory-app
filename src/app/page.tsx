import { getMembers } from "@/lib/getMembers";
import MemberList from "./memberList";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Member Directory</h1>
      <MemberList members={members} />
    </div>
  );
}