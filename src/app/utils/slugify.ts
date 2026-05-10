export const slugify = async (payload: any, Model: any, fieldName: string = "title") => {
	const { slug, ...remaining } = payload;

	const fieldValue = payload[fieldName];

	const totalCount = await Model.countDocuments({
		[fieldName]: fieldValue,
	});

	if (totalCount > 0) {
		const slugified = `${slug}-${totalCount}`;
		return {
			...remaining,
			[fieldName]: fieldValue,
			slug: slugified,
		};
	}

	return payload;
};
