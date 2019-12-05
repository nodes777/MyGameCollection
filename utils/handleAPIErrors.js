export const handleAPIErrors = err => {
	console.log("ERRROR IN AN API");
	if (err.response) {
		// Request made and server responded
		console.log(err.response.data);
		console.log(err.response.status);
		console.log(err.response.headers);
	} else if (err.request) {
		// The request was made but no response was received
		console.log(err.request);
	} else {
		// Something happened in setting up the request that triggered an err
		console.log("err", err.message);
	}

	console.log(err);
};
