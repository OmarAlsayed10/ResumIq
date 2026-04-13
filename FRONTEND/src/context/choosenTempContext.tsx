import { createContext, useState } from 'react';
import { useEffect } from "react";

export const TemplateContext = createContext<any>(null);

export const TemplateProvider = ({ children }) => {
  const [choosenTemp, setChoosenTemp] = useState(() => {
    return localStorage.getItem("choosenTemp") || "classic-cv";
  });

  useEffect(() => {
    localStorage.setItem("choosenTemp", choosenTemp);
  }, [choosenTemp]);

  return (
    <TemplateContext.Provider value={{ choosenTemp, setChoosenTemp }}>
      {children}
    </TemplateContext.Provider>
  );
};
