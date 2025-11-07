import fs from "fs/promises";

export const deleteFileAsync = async (filePath: string): Promise<void> => {
	if (!filePath) return;

	try {
		await fs.unlink(filePath);
		console.log(`temporary file deleted: ${filePath}`);
	} catch (error: any) {
		if (error.code === "ENOENT") {
			console.log(`file already deleted ${filePath}`);
		} else {
			console.log(`failed to delete file: ${filePath}`, error);
		}
	}
};
