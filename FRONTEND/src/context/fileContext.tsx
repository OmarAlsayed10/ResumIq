import { createContext, useState } from 'react';

export const FileContext = createContext<any>(null);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <FileContext.Provider value={{ uploadedFile, setUploadedFile }}>
      {children}
    </FileContext.Provider>
  );
};
