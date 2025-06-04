import MemberList from "./memberList";

export default async function MembersPage() {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Member Directory</h1>
        <MemberList />
    </div>
  );
}