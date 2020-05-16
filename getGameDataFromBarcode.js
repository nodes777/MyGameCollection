import axios from "axios";
import { GIANT_BOMB_API_KEY } from "./constants/API_KEY";

import { handleAPIErrors } from "./utils/handleAPIErrors";
import { getBarcodeableData } from "./api_requests/getBarcodeableData";
import { getGiantBombSearchData } from "./api_requests/getGiantBombSearchData";
import { getGiantBombDetailsData } from "./api_requests/getGiantBombDetailsData";

export const getGameDataFromBarcode = async (barcodeValue) => {
	console.log("Requesting game data from barcode...");
	const barcodeData = await getBarcodeableData(barcodeValue);
	console.log(barcodeData.title);

	// const testData = {
	// 	amazon_url:
	// 		"https://www.amazon.com/Splash-Down-Rides-Gone-Wild/dp/B00008J2V0",
	// 	brand: "THQ",
	// 	company_name: "Kokopeli",
	// 	description:
	// 		"Experience fast and wet action in this white-knuckle racing game.",
	// 	manufacturer: "THQ",
	// 	new_price: 13.99,
	// 	platform: ["PlayStation 2"],
	// 	title: "Splash Down: Rides Gone Wild",
	// 	used_price: 1.55
	// };

	// after we have barcodeable's game name we search Giant Bomb with it
	const giantBombSearchData = await getGiantBombSearchData(barcodeData.title);

	// that search api will return a game guid, from which we can get the game details

	const giantBombDetailsData = await getGiantBombDetailsData(
		giantBombSearchData.guid
	);

	//Later properties overwrite earlier properties with the same name.
	const allData = {
		//...testData,
		...barcodeData,
		...giantBombSearchData,
		...giantBombDetailsData,
	};

	return allData;
};
