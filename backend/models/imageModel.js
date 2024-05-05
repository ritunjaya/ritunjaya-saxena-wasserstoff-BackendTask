const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            "In-Review",
            "Approved",
            "Rejected"
        ],
        default: "In-Review"
    },
    annotation: [
        {
            name: {
                type: String,
            },
            confidenceLevel: {
                type: Number,
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });


const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;