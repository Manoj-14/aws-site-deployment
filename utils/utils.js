const data = require("../data/ami-data.json")


module.exports = {
    getAmiId: (name) => {
        return data.find(ami => ami.name === name).id;
    },

    siteAvailabilityCheck: async (url) => {
        let interval = 3000, maxAttempts = 15, attempts = 0;
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    clearInterval(intervalId);
                    return true;
                } else {
                    console.log(`Received status code: ${response.status}`);
                }
            } catch (error) {
                console.error(`Error: ${error.message}`);
            }
            attempts += 1;
            if (attempts >= maxAttempts) {
                console.error('Max attempts reached. Nginx might not be running.');
                clearInterval(intervalId);
            }
            return false;
        }, interval);
    }
}