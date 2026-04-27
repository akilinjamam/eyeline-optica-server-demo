import * as cheerio from "cheerio";

const extractImgUrls = (html: string) => {
	const $ = cheerio.load(html);

	const urls: string[] = [];

	$("img").each((_, element) => {
		const src = $(element).attr("src");

		if (src) {
			urls.push(src);
		}
	});

	return urls;
};

export default extractImgUrls;
