import { useContext } from "react";
import { ThemeContext } from "@/theme/themeRegistry";
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode должен использоваться внутри ThemeRegistry");
  }
  return context;
};
