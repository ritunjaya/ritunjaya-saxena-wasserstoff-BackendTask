const Image = require("../models/imageModel");

const reviewImages = async (req, res) => {
    try {
        let { status } = req.body;

        let queryStatus = ["In-Review", "Approved", "Rejected"];

        if (!status) {
            status = queryStatus;
        }
        const images = await Image.find({ status: { $in: status } })
            .populate("userId", "name ");

        if (images.length === 0) {
            return res.status(404).json({ message: "No Images Found" })
        }

        return res.status(200).json({
            message: "Images Found",
            images: images
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }

}
const reviewImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).json({ message: "No Image Found" })
        }

        return res.status(200).json({
            message: "Images Found",
            image: image
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }

}
const approveImage = async (req, res) => {
    try {
        const { id } = req.params;


        const image = await Image.findByIdAndUpdate(id, {
            status: "Approved"
        }, { new: true });

        if (!image) {
            return res.status(404).json({ message: "No Image Found" })
        }

        return res.status(200).json({
            message: "Images Approved",
            image: image
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }

}
const rejectImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await Image.findByIdAndUpdate(id, {
            status: "Rejected"
        }, { new: true });

        if (!image) {
            return res.status(404).json({ message: "No Image Found" })
        }

        return res.status(200).json({
            message: "Images Rejected",
            image: image
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const newUser = new User({
            name: name,
            email: email,
            password: password,
            role: role
        })

        const savedUser = await newUser.save();

        if (savedUser) {
            res.status(200).json({
                message: "User Registered",
                newUser: savedUser
            })
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

module.exports = {
    reviewImages,
    reviewImage,
    approveImage,
    rejectImage,
    registerUser
}