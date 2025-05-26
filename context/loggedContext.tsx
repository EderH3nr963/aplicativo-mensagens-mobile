import { createContext, useState } from "react";

interface IIsloggedContext {
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
}

export const IsLoggedContext = createContext<IIsloggedContext | undefined>(
  undefined
);

export default function IsLoggedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <IsLoggedContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </IsLoggedContext.Provider>
  );
}
