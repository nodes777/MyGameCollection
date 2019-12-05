import axios from "axios";
import { handleAPIErrors } from "../utils/handleAPIErrors";
import { CONSOLE_NAMES } from "../constants/CONSOLE_NAMES";
export const getBarcodeableData = async barcodeValue => {
	const barcodeData = await axios({
		url: `https://api.barcodable.com/api/v1/upc/752919460320`, //${barcodeValue}
		method: "GET",
		headers: {
			Accept: "application/json"
		}
	})
		.then(response => {
			console.log("Getting data from barcodable...");
			if (response.data.item.matched_items.length > 1) {
				console.error("Multiple items match the bar code!");
				return;
			}

			const data = {
				title: response.data.item.matched_items[0].title,
				company_name: response.data.item.company_name,
				brand: response.data.item.matched_items[0].brand,
				manufacturer: response.data.item.matched_items[0].manufacturer,
				new_price: response.data.item.matched_items[0].new_price,
				used_price: response.data.item.matched_items[0].used_price,
				amazon_url: response.data.item.matched_items[0].url,
				description: response.data.item.matched_items[0].description
				//images: response.data.item.matched_items[0].images
			};

			// need to determine publisher and developer
			// dev is not found on barcodeable - it's rainbow studios
			let publisher;
			if (data.brand === data.manufacturer) {
				publisher = data.brand;
			} else {
				console.log(
					"The publisher is undefined because the brand and the manufacturer do not match"
				);
			}

			// need platform - search category_hierarchies for one of the set of CONSOLE_NAMES
			const categories =
				response.data.item.matched_items[0].category_hierarchies;

			const platform = categories.flat().filter(function(category) {
				return CONSOLE_NAMES.indexOf(category) > -1;
			});

			if (platform.length > 1) {
				console.error(
					"More than one platform returned from the barcorde"
				);
			}
			data.platform = platform;

			return data;
		})
		.catch(err => {
			handleAPIErrors(err);
		});
	return barcodeData;
};
