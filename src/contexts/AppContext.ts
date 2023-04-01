import { createContext, useContext } from "react"

export interface IAppContext {
  email: string;
  isSending: boolean;
  percentage: number | null;
  setEmail: (newEmail: string) => void;
  setIsSending: (isSending: boolean) => void;
  setPercentage: (newPercentage: number | null) => void;
}

export const AppContext = createContext<IAppContext | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error("useAppContext was used outside its provider")
  }

  return context;
}