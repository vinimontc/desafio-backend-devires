import "reflect-metadata";

import express from "express";

import "@shared/container";
import "@shared/infra/typeorm";
import { router } from "@shared/infra/http/routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333);
