import cloudinary from '../lib/cloudinary.js';
import Books from '../models/Books.js';

const addBook = async (req, res) => {
    try {
        const { title, caption, rating, image } = req.body;

        if (!image, !caption, !rating, !image) {
            return res.status(400).json({ message: "Please provide all fileds" });
        }

        const uploadResponse = await cloudinary.uploader.upload(image);
        const imgUrl = uploadResponse.secure_url;

        const newBook = new Books({
            title,
            caption,
            image: imgUrl,
            rating,
            user: req.user._id, // Assuming req.user is set by the protectRoute middleware
        });

        await newBook.save();
        res.status(201).json(newBook);

    } catch (error) {
        console.error("Error in bookController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getBook = async (req, res) => {
    try { 
        // Example call from the frontend
        // const response = await fetch("https://localhost:3000/api/books?page=1&limit=5");
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;

        const books = await Books.find()
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .skip(skip)
            .limit(limit)
            .populate("user", "username profileimage") // Populate user field with username and profile image
        
        const totalBooks = await Books.countDocuments();
        
        res.send({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit)
        });

    } catch (error) {
        console.log("Erorr in getBook:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Books.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        
        //check if user is the creator of the book
        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unautherized" });
        }

        //delete image from cloudinary
        if (book.image && book.image.includes("cloudinary")) {
            try {
                const publicId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.log("Error deleting image from Cloudinary:", error);
            }
        }

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });
        
    } catch (error) {
        console.log("Error in deleteBook:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRcomendedBook = async (req, res) => {
    try {
        const books = await Books.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(books);
    } catch (error) {
        console.log("Error in getRcomendedBook:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { addBook, getBook, deleteBook, getRcomendedBook };