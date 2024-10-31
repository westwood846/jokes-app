import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import adminStoriesRouter from "./src/admin/admin-stories";
import displayStoriesRouter from "./src/display-stories";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/admin/stories", adminStoriesRouter);
app.use("/api/stories", displayStoriesRouter);
app.use(express.static(path.join(__dirname, "frontend")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(
    `First request will connect to DB at ${process.env.DATABASE_URL}`
  );
});
