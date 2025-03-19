const BannerModal = require('../models/Banner');


// post home banner

const HomeBanner = async (req, res, next) => {
    const { image } = req.body;
    const upload = new BannerModal({
        image
    });

    try {
        await upload.save();
        res.status(201).json({ message: "Your Banner upload successfully" });
    } catch (error) {
        console.log(error)
    }
}

// show banner

const ShowBanner = async (req, res, next) => {
    try {
        const Banner = await BannerModal.find(); // Fetch all products from MongoDB
        res.status(200).json(Banner); // Return the products in the response
    } catch (error) {
        next(error);
    }
};

module.exports = { HomeBanner, ShowBanner };