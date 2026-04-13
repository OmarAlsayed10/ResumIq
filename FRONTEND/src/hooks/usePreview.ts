import { useContext } from "react";
import { PreviewContext } from "../context/previewContext";

export const usePreview = () => {
    const context = useContext(PreviewContext);
    if (context === undefined) {
        throw new Error("usePreview must be used within a PreviewProvider");
    }
    return context;
};
