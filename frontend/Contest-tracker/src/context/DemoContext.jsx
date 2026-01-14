import { createContext, useContext, useState } from "react";

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [isDemo, setIsDemo] = useState(false);

  return (
    <DemoContext.Provider value={{ isDemo, setIsDemo }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
