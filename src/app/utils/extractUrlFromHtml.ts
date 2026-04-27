import * as cheerio from "cheerio";
import { Element } from "domhandler";

const extractImgUrls = (html: string): string[] => {
	const $ = cheerio.load(html);

	const urls: string[] = [];

	$("img").each((_: number, element: Element) => {
		const src = $(element).attr("src");

		if (src) {
			urls.push(src);
		}
	});

	return urls;
};

export default extractImgUrls;
