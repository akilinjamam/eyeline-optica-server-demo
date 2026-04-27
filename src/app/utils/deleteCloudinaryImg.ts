import cloudinary from "../config/cloudinary";

const deleteCloudinaryImage = async (publicId: string) => {
	return await cloudinary.uploader.destroy(publicId);
};

export default deleteCloudinaryImage;
