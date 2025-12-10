export const processPublicIds = (rawId: string[]) => {
	const filteredId = rawId?.flatMap((item: any) =>
		item?.split("/")?.slice(item?.split("/")?.length - 1)
	);
	const proccessImageId = filteredId?.map((item: any) => `products/${item?.split(".")?.[0]}`);
	return proccessImageId;
};
