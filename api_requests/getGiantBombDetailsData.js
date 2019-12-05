import axios from "axios";
import { GIANT_BOMB_API_KEY } from "../constants/API_KEY";

import { handleAPIErrors } from "../utils/handleAPIErrors";

export const getGiantBombDetailsData = async guid => {
	const details = await axios({
		url: `https://www.giantbomb.com/api/game/${guid}/?api_key=${GIANT_BOMB_API_KEY}&format=json`,
		method: "GET",
		headers: {
			Accept: "application/json"
		}
	})
		.then(gbDetailsData => {
			console.log("Getting game details from Giant Bomb");

			const developers = gbDetailsData.data.results.developers.map(
				dev => {
					dev.name;
				}
			);

			const releaseDay = gbDetailsData.data.results.expected_release_day;
			const releaseMonth =
				gbDetailsData.data.results.expected_release_month;
			const releaseYear =
				gbDetailsData.data.results.expected_release_year;

			return details;
		})
		.catch(err => {
			handleAPIErrors(err);
		});
	return details;
};
