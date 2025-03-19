const ProductModal = require('../models/ProductModal');

// Post Product
// const UploadProduct = async (req, res, next) => {
//     const { productName,description, price, image } = req.body;

//     const slug = productName.toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
//         .replace(/(^-|-$)/g, "");

//     const upload = new ProductModal({
//         productName,description, price, image, slug
//     });

//     try {
//         await upload.save();
//         res.status(201).json({ message: "Your product upload successfully", slug });
//     } catch (error) {
//         next(error)
//     }
// }

const UploadProduct = async (req, res, next) => {
    const { productName, description, price, images } = req.body; 
    if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ message: "Please upload at least one image" });
    }

    const slug = productName.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newProduct = new ProductModal({
        productName,
        description,
        price,
        images, 
        slug
    });

    try {
        await newProduct.save();
        res.status(201).json({ message: "Your product uploaded successfully", slug });
    } catch (error) {
        next(error);
    }
};



// Get Products
const GetProduct = async (req, res, next) => {
    try {
        const products = await ProductModal.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Product info
const ProductInfo = async (req, res, next) => {
    try {

        const { slug } = req.params;  // Extract slug from URL

        const product = await ProductModal.findOne({ slug });

        if (!product) {
            console.log("Product not found!");  // Debugging
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);  // Debugging
        next(error);
    }
};



module.exports = { UploadProduct, GetProduct, ProductInfo };