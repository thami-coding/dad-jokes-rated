import { createContext, type Dispatch, type SetStateAction } from "react";

interface AppContextValue {
  user?: { name: string; userId: string };
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
}

export const AppContext = createContext<AppContextValue | null>(null)