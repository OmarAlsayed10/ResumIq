import { useContext } from "react";
import { FileContext } from "../context/fileContext";

export const useFile = () => {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error("useFile must be used within a FileProvider");
    }
    return context;
};
