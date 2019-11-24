import axios from "axios";
import IGDA_API_KEY from "./constants/API_KEY";

import { CONSOLE_NAMES } from "./constants/CONSOLE_NAMES";
const baseURL = "https://api-v3.igdb.com/games/";
// const data =
// 	"fields alternative_name,character,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme";

export const getGameDataFromBarcode = async barcodeValue => {
	console.log("Requesting game data...");
	const gameData = await axios({
		url: `https://api.barcodable.com/api/v1/upc/${barcodeValue}`,
		method: "GET",
		headers: {
			Accept: "application/json"
		}
	})
		.then(response => {
			console.log("Getting Data from barcodable...");
			if (response.data.item.matched_items.length > 1) {
				console.error("Multiple items match the bar code!");
				return;
			}

			// console.log(response.data);
			const data = {
				title: response.data.item.matched_items[0].title,
				company_name: response.data.company_name,
				brand: response.data.item.matched_items[0].brand,
				manufacturer: response.data.item.matched_items[0].manufacturer,
				new_price: response.data.item.matched_items[0].new_price,
				used_price: response.data.item.matched_items[0].used_price,
				amazon_url: response.data.item.matched_items[0].url,
				description: response.data.item.matched_items[0].description,
				images: response.data.item.matched_items[0].images
			};

			// need to determine publisher and developer

			// need platform - search category_hierarchies for one of a set number of consoles?
			const categories =
				response.data.item.matched_items[0].category_hierarchies;
			console.log(categories);

			const platforms = categories.flat();
			// .filter(function(category) {
			// 	return CONSOLE_NAMES.indexOf(category) > -1;
			// });

			console.log(platforms);
			// console.log(data.title);
			return data;
		})
		.catch(err => {
			console.log("ERROR in barcodable");
			//console.error(err);
			return "Error in barcodable API";
		});

	// const body = ``;
	// axios({
	// 	url: "https://api-v3.igdb.com/games/",
	// 	method: "POST",
	// 	headers: {
	// 		Accept: "application/json",
	// 		"user-key": "f91452adf912178d7155a9e28fed848d"
	// 	},
	// 	data: "fields name; limit 10;"
	// })
	// 	.then(response => {
	// 		console.log(response.data);
	// 	})
	// 	.catch(err => {
	// 		console.log("ERROR in IGDB API");
	// 		console.error(err);
	// 	});

	return gameData;
};
