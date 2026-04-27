import BlogImg from "./blogImg.model";

const createBlogImgService = async (payload: string) => {
	const result = await BlogImg.create({ url: payload });
	return result;
};

export const blogImgService = {
	createBlogImgService,
};
