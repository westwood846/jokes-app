import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import storiesRouter from "./src/stories";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/stories", storiesRouter);
app.use(express.static(path.join(__dirname, "frontend")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
