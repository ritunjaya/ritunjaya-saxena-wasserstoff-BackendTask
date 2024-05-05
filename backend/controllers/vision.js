const analyzeImage = require("../utils/vision-util");

const analyze = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const result = await analyzeImage(imageUrl);
        console.log(result);
        if (!result) {
            res.status(200).json({
                message: "No result found"
            })
        }
        return res.status(200).json({
            message: "Image Analyzed Successfully",
            result: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    analyze
}