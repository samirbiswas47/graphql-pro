import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import connectDB from "./config/db.js";
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
connectDB();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log("App is running at port: ", port);
});
