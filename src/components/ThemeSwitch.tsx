import { useTheme } from "../hooks/useTheme";
import '../styles/theme-switch.scss';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
    
  return (
    <button className="theme-button" onClick={toggleTheme}>{theme === "light" ? "dark" : "light"}</button>
  );
}