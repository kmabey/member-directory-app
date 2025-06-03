export interface Member {
  name: {
    first: string;
    last: string;
  };
  dob: {
    age: number;
    date: string;
  };
  picture: {
    thumbnail: string;
    large: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    postcode: string | number;
  };
  email: string;
  phone: string;
  login: {
    uuid: string;
  };
}

  
  export async function getMembers(): Promise<Member[]> {
    const res = await fetch("https://randomuser.me/api/?results=500");
    const data = await res.json();
    return data.results;
  }