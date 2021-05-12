import "reflect-metadata";

import express from "express";

import "@shared/container";

import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.listen(3333);
