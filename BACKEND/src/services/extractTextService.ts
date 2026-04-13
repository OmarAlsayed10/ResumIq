import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import fs from "fs";
import axios from "axios";

export const extractText = async (filePath: string, mimeType: string): Promise<string> => {
    let buffer: Buffer;

    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
        const response = await axios.get(filePath, { responseType: "arraybuffer" });
        buffer = Buffer.from(response.data);
    } else {
        buffer = fs.readFileSync(filePath);
    }

    if (mimeType === "application/pdf") {
        const data = await pdfParse(buffer);
        return data.text;
    }

    if (
        mimeType === "application/msword" ||
        mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    }

    throw new Error("This file is unsupported, please upload PDF/Word");
};