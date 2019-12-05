import axios from "axios";
import { handleAPIErrors } from "../utils/handleAPIErrors";
import { GIANT_BOMB_API_KEY } from "../constants/API_KEY";

export const getGiantBombSearchData = async title => {
	const giantBombSearchData = await axios({
		url: `http://www.giantbomb.com/api/search/?api_key=${GIANT_BOMB_API_KEY}&format=json&query="${title}"&resources=game`,
		method: "GET",
		headers: {
			Accept: "application/json"
		}
	})
		.then(giantBombGameData => {
			console.log("Getting data from searching Giant Bomb");
			// take the first result automatically?
			const gbSearchData = {
				id: giantBombGameData.data.results[0].id,
				guid: giantBombGameData.data.results[0].guid,
				deck: giantBombGameData.data.results[0].deck,
				description: giantBombGameData.data.results[0].description,
				images: giantBombGameData.data.results[0].image,
				name: giantBombGameData.data.results[0].name,
				platforms: giantBombGameData.data.results[0].platforms
			};
			return gbSearchData;
		})
		.catch(err => {
			handleAPIErrors(err);
		});
	return giantBombSearchData;
};
