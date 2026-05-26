import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

export type User = {
  id: number;
  nome: string;
  email: string;
  plano: "Free" | "Premium" | "Pro";
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  // 🔥 carrega do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUserState(JSON.parse(saved));
    }
  }, []);

  // 🔥 sincroniza localStorage sempre que user mudar
  function setUser(user: User | null) {
    setUserState(user);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}