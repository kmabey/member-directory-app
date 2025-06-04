"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { getMembers, Member } from "@/lib/getMembers";

interface MembersContextType {
  members: Member[];
  loading: boolean;
  error: string | null;
}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export const MembersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (err) {
        setError("Failed to load members.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <MembersContext.Provider value={{ members, loading, error }}>
      {children}
    </MembersContext.Provider>
  );
};

export const useMembers = (): MembersContextType => {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("Make sure useMembers is used in a MembersProvider");
  }
  return context;
};

