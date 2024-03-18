import React from "react";
import "./App.css";
import { useTheme } from "./cad/components/test2";
import { CadComponent } from "./cad/components/cadComponent";

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      WORK IN PROGRESS
      <CadComponent />
    </div>
  );
};

export default App;
