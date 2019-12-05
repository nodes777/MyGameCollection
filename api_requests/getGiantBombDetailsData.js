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

			const details = {
				releaseDay: gbDetailsData.data.results.expected_release_day,
				releaseMonth: gbDetailsData.data.results.expected_release_month,
				releaseYear: gbDetailsData.data.results.expected_release_year
			};

			const developers = gbDetailsData.data.results.developers.map(
				dev => {
					return dev.name;
				}
			);
			const publishers = gbDetailsData.data.results.publishers.map(
				pub => {
					return pub.name;
				}
			);

			details.developers = developers;
			details.publishers = publishers;
			details.releaseDate = `${details.releaseMonth}/${
				details.releaseDay
			}/${details.releaseYear}`;

			return details;
		})
		.catch(err => {
			handleAPIErrors(err);
		});
	return details;
};
