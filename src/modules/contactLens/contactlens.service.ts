import ContactLens from "./contactlens.model";
import { IContactLens } from "./contactlens.type";

const createContactLensService = async (payload: IContactLens) => {
	const result = await ContactLens.create(payload);

	return result;
};

export const contactLensService = {
	createContactLensService,
};
