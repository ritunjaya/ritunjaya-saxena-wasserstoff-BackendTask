const express = require("express")
const mongoose = require("mongoose");
const cloudinary = require("cloudinary")
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routers/user");
const adminRouter = require("./routers/admin");
const visionRouter = require("./routers/vision");


require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

//ROUTES
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/vision", visionRouter);

app.get("/", (req, res) => {
    res.send("API is  Working")
})

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
}).then(() => {

    app.listen(PORT, () => {
        console.log("SERVER Running at PORT", PORT);
    })

})