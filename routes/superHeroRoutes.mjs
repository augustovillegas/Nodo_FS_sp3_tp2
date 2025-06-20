import express from "express";
import {
  actualizarSuperheroeController,
  crearSuperheroeController,
  eliminarSuperheroeController,
  eliminarSuperheroePorNombreController,
  obtenerTodosLosSuperheroesController,
} from "../controllers/superheroesController.mjs";

const router = express.Router();

router.get("/heroes", obtenerTodosLosSuperheroesController);
router.post("/heroes", crearSuperheroeController);
router.put("/heroes/:id", actualizarSuperheroeController);
router.delete("/heroes/:id", eliminarSuperheroeController);
router.delete("/heroes/nombre/:nombre", eliminarSuperheroePorNombreController);

export default router;
