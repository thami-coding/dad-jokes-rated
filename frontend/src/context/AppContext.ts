import { createContext, type Dispatch, type SetStateAction } from "react";
import type { TFormType } from "../types/types";

interface AppContextValue {
  isDarkTheme: boolean;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
  setMode: Dispatch<SetStateAction<TFormType>>;
}

export const AppContext = createContext<AppContextValue | null>(null)