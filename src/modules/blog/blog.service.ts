import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import { AppError } from "../../app/errors/AppError";
import { Blog, IBlog } from "./blog.model";

import BlogImg from "../blogImage/blogImg.model";
import extractImgUrls from "../../app/utils/extractUrlFromHtml";
import extractPublicIdFromUrl from "../../app/utils/extractPublicIdFromUrl";
import deleteCloudinaryImage from "../../app/utils/deleteCloudinaryImg";
import { slugify } from "../../app/utils/slugify";

const createBlogService = async (payload: IBlog) => {
	const slugifiedData = await slugify(payload, Blog, "title");

	const result = await Blog.create(slugifiedData);

	if (!result) throw new AppError(StatusCodes.BAD_GATEWAY, "failed to load");

	const { description } = slugifiedData || {};

	const imageUrls = extractImgUrls(description);

	if (imageUrls.length > 0) {
		await BlogImg.updateMany({ url: { $in: imageUrls } }, { $set: { isStored: true } });
	}

	return result;
};

const getAllBlogService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Blog.find({}), query)
		.search(["title", "category", "description"])
		.filter()
		.fields()
		.sort()
		.pagination();

	const meta = await result.countTotal();
	const data = await result.modelQuery;

	return {
		meta,
		data,
	};
};

const getSingleBlogService = async (id: string) => {
	const result = await Blog.findOne({ _id: id });
	return result;
};

const updateBlogService = async (payload: Record<string, unknown>, id: string) => {
	const result = await Blog.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
	}
	return result;
};

const deleteBlogService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}
	// find blog ids which will be deleted
	const findDeletableBlogs = await Blog.find({ _id: { $in: ids } });

	// collect image urls and extract public ids
	const extractImageUrls = findDeletableBlogs.flatMap((item: IBlog) =>
		item.images.map((url: string) => extractPublicIdFromUrl(url)).filter(Boolean)
	);

	const findImagesUnderBlogs = findDeletableBlogs
		.map((item: IBlog) => extractImgUrls(item.description))
		.flatMap((item: any) => item)
		.filter(Boolean);

	const extractPublicIfFromImgUrlsFromHtmls = findImagesUnderBlogs?.map((extact) =>
		extractPublicIdFromUrl(extact)
	);
	const allExtractedImgUrls = [...extractImageUrls, ...extractPublicIfFromImgUrlsFromHtmls];
	console.log(allExtractedImgUrls);

	const result = await Blog.deleteMany({ _id: { $in: ids } });

	if (allExtractedImgUrls.length > 0) {
		await Promise.all(
			allExtractedImgUrls.map(async (id) => {
				try {
					await deleteCloudinaryImage(id);
				} catch (error) {
					console.error("Cloudinary delete failed:", id, error);
				}
			})
		);
	}

	// delete matched objects from blogImage collections

	await BlogImg.deleteMany({ url: { $in: findImagesUnderBlogs } });

	return result;
};

export const BlogService = {
	createBlogService,
	getAllBlogService,
	getSingleBlogService,
	updateBlogService,
	deleteBlogService,
};
