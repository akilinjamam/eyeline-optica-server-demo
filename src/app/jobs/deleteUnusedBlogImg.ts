import cron from "node-cron";
import BlogImg from "../../modules/blogImage/blogImg.model";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImg";
import extractPublicIdFromUrl from "../utils/extractPublicIdFromUrl";

const deleteUnusedBlogImages = () => {
	cron.schedule("0 1 * * *", async () => {
		try {
			// console.log("Running blog image cleanup cron at 1 AM...");

			const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

			const unusedImages = await BlogImg.find({
				isStored: false,
				createdAt: {
					$lte: twoHoursAgo,
				},
			});

			for (const image of unusedImages) {
				try {
					const publicId = extractPublicIdFromUrl(image.url);

					await deleteCloudinaryImage(publicId);

					await BlogImg.findByIdAndDelete(image._id);

					// console.log(`Deleted ${publicId}`);
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.log("Cron error:", error);
		}
	});
};

export default deleteUnusedBlogImages;
