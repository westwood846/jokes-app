import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import storiesRouter from "./src/stories";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/stories", storiesRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
