import { router } from "express";
import games from "../database/games.js";
import { soma } from "../share/utils.js";

const basicRoutes = Router();

basicRoutes.get("/", (req, res) => {
  res.status(200).json({
    sistema: "UNIFOA",
    ok: true,
  });
});

basicRoutes.get("/games", (req, res) => {
  res.status(200).json(games);
});

basicRoutes.get("/soma/:a/:b", (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  const r = soma(a, b);
  res.status(200).json({
    a: a,
    b: b,
    soma: r,
  });
});
basicRoutes.get("/pkjson", (req, res) => {
  res.json(pkjson);
});

export default basicRoutes;
