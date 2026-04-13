import { useContext } from "react";
import { TemplateContext } from "../context/choosenTempContext";

export const useTemplate = () => {
    const context = useContext(TemplateContext);
    if (context === undefined) {
        throw new Error("useTemplate must be used within a TemplateProvider");
    }
    return context;
};
