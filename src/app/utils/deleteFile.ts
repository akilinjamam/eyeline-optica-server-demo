import fs from "fs";

export const deleteFile = (filePath: string) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			console.log("Failed to delete temporary file:", err);
		}
	});
};
