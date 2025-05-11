import { fetchImages, fetchTasteDive } from "../services/mediaService.js";

export const recommendMedias = async (req, res) => {
  
};

export const fetchGeminiAi = async (req, res) => {
    const mediaName = req.query.searchInput;
    const mediaTypes = JSON.parse(req.query.selectedMedias);

    try {
        const selectedMedias = Object.keys(mediaTypes).filter((key) => {
            return mediaTypes[key];
        });

        const allResults = await Promise.all(
            selectedMedias.map(async (mediaType) => {
                const response = await fetchGeminiAi(10, mediaName, mediaTypes);

                const jsonResponse = (response) => {
                        const start = response.indexOf("[")-1;
                        const end = response.lastIndexOf("]")+1;
                        if (start !== -1 && end !== -1 && end > start) {
                            return response.substring(start, end + 1);
                        }
                        return response;
                    }

                return jsonResponse(result.response.text());
            })
        );

        return res.status(200).json(allResults);
    } catch (error) {
        return res.status(500).json({ error });
    }
}


export const tasteDive = async (req, res) => {
    const searchQuery = req.query.searchInput;
    const mediaTypes = JSON.parse(req.query.selectedMedias);

    try {
        const selectedMedias = Object.keys(mediaTypes).filter((key) => {
            return mediaTypes[key];
        });
        // selectedMedias is now an array of selected media types

        const allResults = await Promise.all(
            selectedMedias.map(async (mediaType) => {
                const jsonData = await fetchTasteDive(searchQuery, mediaType);
                // assign the media type to each result
                jsonData.similar.results?.forEach((result) => {
                    result.mediaType = mediaType;
                });
                return jsonData.similar.results;
            })
        );

        const jsonResults = allResults.flat();
        const enrichedResults = await fetchImages(jsonResults);

        return res.status(200).json(enrichedResults);
    } catch (error) {
        return res.status(500).json({ error });
    }
};