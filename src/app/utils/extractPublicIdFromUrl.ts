const extractPublicIdFromUrl = (url: string): string => {
	const parts = url.split("/upload/")[1];

	if (!parts) return "";

	// remove version part
	const withoutVersion = parts.replace(/^v\d+\//, "");

	// remove file extension
	const publicId = withoutVersion.replace(/\.[^/.]+$/, "");

	return publicId;
};

export default extractPublicIdFromUrl;
