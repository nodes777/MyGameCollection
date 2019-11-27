import axios from "axios";
import GIANT_BOMB_API_KEY from "./constants/API_KEY";

import { CONSOLE_NAMES } from "./constants/CONSOLE_NAMES";

export const getGameDataFromBarcode = async barcodeValue => {
	console.log("Requesting game data from barcode...");
	const gameData = await axios({
		url: `https://api.barcodable.com/api/v1/upc/752919460320`,
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

			console.log(response.data);
			const data = {
				title: response.data.item.matched_items[0].title,
				company_name: response.data.item.company_name,
				brand: response.data.item.matched_items[0].brand,
				manufacturer: response.data.item.matched_items[0].manufacturer,
				new_price: response.data.item.matched_items[0].new_price,
				used_price: response.data.item.matched_items[0].used_price,
				amazon_url: response.data.item.matched_items[0].url,
				description: response.data.item.matched_items[0].description,
				images: response.data.item.matched_items[0].images
			};

			// need to determine publisher and developer
			// dev is not found on barcodeable - it's rainbow studios
			let publisher;
			if (data.brand === data.manufacturer) {
				publisher = data.brand;
			} else {
				console.error(
					"The publisher is undefined because the brand and the manufacturer do not match"
				);
			}

			// need platform - search category_hierarchies for one of a set number of consoles?
			const categories =
				response.data.item.matched_items[0].category_hierarchies;
			console.log(categories);

			const platform = categories.flat().filter(function(category) {
				return CONSOLE_NAMES.indexOf(category) > -1;
			});

			console.log(platform);
			if (platform.length > 1) {
				console.error(
					"More than one platform returned from the barcorde"
				);
			}
			data.platform = platform;
			return data;
		})
		.catch(err => {
			console.log("ERROR in barcodable");
			//console.error(err);
			return "Error in barcodable API";
		});

	// after we have barcodeable's game name we search Giant Bomb with it
	//const searchGiantBombURL = `http://www.giantbomb.com/api/search/?api_key=${GIANT_BOMB_API_KEY}&format=json&query=${gameData.title}&resources=game`;
	const gameData = await axios({
		url: `http://www.giantbomb.com/api/search/?api_key=${GIANT_BOMB_API_KEY}&format=json&query=${
			gameData.title
		}&resources=game`,
		method: "GET",
		headers: {
			Accept: "application/json"
		}
	});

	// that will return a game id, from which we can get the game details

	return gameData;
};
