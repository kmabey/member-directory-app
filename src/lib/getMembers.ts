export interface Member {
    name: {
      first: string;
      last: string;
    };
    dob: {
      age: number;
    };
    picture: {
      thumbnail: string;
    };
  }
  
  export async function getMembers(): Promise<Member[]> {
    const res = await fetch("https://randomuser.me/api/?results=500");
    const data = await res.json();
    return data.results;
  }