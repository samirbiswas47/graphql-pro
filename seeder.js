import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import books from "./data/user.js";
import authors from "./data/products.js";
import Book from "./models/book.js";
import Author from "./models/author.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Book.deleteMany();
    await Author.deleteMany();

    const createdAuthor = await Book.insertMany(authors);
    const authorId = createdAuthor[0]._id;
    const sampleBooks = books.map((book) => {
      return { ...book, authorId: authorId };
    });

    await Book.insertMany(sampleBooks);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Book.deleteMany();
    await Author.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
