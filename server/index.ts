import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import env from "@lib/env";
import {exportTests, startTests} from "./start-tests";

const app = express();
const port = env.PORT || 3500;

app.disable("x-powered-by");
app.use(cookieParser());
app.use(bodyParser.json({limit: "4mb"}));
app.use(bodyParser.urlencoded({limit: "4mb", extended: true}));
app.use(compression());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "static")));

app.use((req, res, next) => {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    next();
});
app.set("etag", false);

exportTests();
startTests(app);

app.listen(port, () => {
    console.log(`Project start on http://localhost:${port};`);
    console.log("env variables: ", env);
});
