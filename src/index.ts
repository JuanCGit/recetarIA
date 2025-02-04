import express, { json } from "express";
import { recipesRouter } from "./routes/recipes";
import { authErrorHandler } from "./handlers/auth";
import { authRouter } from "./routes/auth";
import { defaultErrorHandler } from "./handlers/default";
import { notFoundErrorHandler } from "./handlers/route";
import { zodErrorHandler } from "./handlers/zod";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);

app.use(notFoundErrorHandler);
app.use(zodErrorHandler);
app.use(authErrorHandler);
app.use(defaultErrorHandler);

app.listen(8080, () => console.info("RecetarIA has started!"));
