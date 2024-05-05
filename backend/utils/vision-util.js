const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

const analyzeImage = async (imageUrl) => {
    try {
        const key = process.env.AZURE_KEY;
        const endpoint = process.env.AZURE_ENDPOINT;
        const credential = new AzureKeyCredential(key);
        const client = createClient(endpoint, credential);

        const features = [
            // 'Objects',
            'Tags'
        ];

        const result = await client.path('/imageanalysis:analyze').post({
            body: {
                url: imageUrl
            },
            queryParameters: {
                features: features,
                'language': 'en',
                'gender-neutral-captions': 'true',
                'smartCrops-aspect-ratios': [0.9, 1.33]
            },
            contentType: 'application/json'
        });

        return result.body;

    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error");
    }
}

module.exports = analyzeImage;
