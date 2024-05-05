const User = require("../models/user");
const Image = require("../models/imageModel");
const analyzeImage = require("../utils/vision-util");
const fileUploader = require("../utils/uploader");
const { getToken } = require("../midleware/auth");
const bcrypt = require("bcrypt");


const InsertImage = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(403).json({
                message: "User Id Not Found"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Image Not Found"
            })
        }

        console.log(req.file);

        const fileBuffer = req.file.buffer;
        const picturePath = req.file.originalname;
        const newFile = await fileUploader(fileBuffer, picturePath);
        const newPicturePath = `v${newFile.version}/${newFile.public_id}`;

        const imageUrl = `${process.env.CLOUDINARY_BASE_URL}/${newPicturePath}`;
        const result = await analyzeImage(imageUrl);
        const annotation = result.tagsResult.values.map((item) => {
            return {
                name: item.name,
                confidenceLevel: item.confidence
            }
        });

        const newImage = new Image({
            imagePath: newPicturePath,
            annotation: annotation,
            userId: userId
        });

        const savedImage = await newImage.save();

        if (savedImage) {
            return res.status(200).json({
                message: "Image Inserted",
                image: savedImage
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

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role: "user"
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "Email or Password not found"
            })
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                message: "User Not  Found"
            })
        }


        if (bcrypt.compare(password, user.password) === false) {
            return res.status(403).json({
                message: "Invalid Crendtials"
            })
        }

        const token = await getToken(user);
        delete user.password;

        return res.status(200).json({
            token: token,
            user: user
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

const checkStatus = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(req.body);
        if (!userId) {
            return res.status(403).json({
                message: "User Id Not Found"
            })
        }
        const images = await Image.find({ userId: userId })
            .populate("userId", "name");

        if (images.length === 0) {
            return res.status(404).json({
                message: "No Images Found"
            })
        }

        return res.status(200).json({
            images: images
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }

}

const checkStatusById = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).json({
                message: "No Image Found"
            })
        }

        return res.status(200).json({
            image: image
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}
module.exports = {
    registerUser,
    login,
    InsertImage,
    checkStatus,
    checkStatusById
}
