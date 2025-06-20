import {
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  obtenerTodosLosSuperheroes,
  eliminarSuperheroePorNombre,
} from "../services/superheroesService.mjs";
import {
  renderizarListaSuperheroes,
  renderizarSuperheroe,
} from "../views/responseView.mjs";

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json({
      mensaje: "Listado completo de superheroes.",
      superheroesFormateados,
    });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los superhéroes",
      error: error.message,
    });
  }
};

export const crearSuperheroeController = async (req, res) => {
  try {
    const nuevo = await crearSuperheroe(req.body);
    const formateado = renderizarSuperheroe(nuevo);
    res
      .status(201)
      .json({ mensaje: "El superheroe fue creado con éxito.", formateado });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear superhéroe", error: error.message });
  }
};

export const actualizarSuperheroeController = async (req, res) => {
  try {
    const update = await actualizarSuperheroe(req.params.id, req.body);
    if (!update) return res.status(404).json({ mensaje: "No encontrado" });
    const actualizado = renderizarSuperheroe(update);
    res
      .status(200)
      .json({ mensaje: "Superheroe actualizado con éxito", actualizado });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar", error: error.message });
  }
};

export const eliminarSuperheroeController = async (req, res) => {
  try {
    const eliminado = await eliminarSuperheroe(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    const formateado = renderizarSuperheroe(eliminado);
    res
      .status(200)
      .json({ mensaje: "Superhéroe eliminado con éxito.", formateado });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar", error: error.message });
  }
};

export const eliminarSuperheroePorNombreController = async (req, res) => {
  try {
    const eliminado = await eliminarSuperheroePorNombre(req.params.nombre);
    if (!eliminado) {
      return res
        .status(404)
        .json({ mensaje: "Superhéroe no encontrado por nombre" });
    }
    const formateado = renderizarSuperheroe(eliminado);
    res.status(200).json({
      mensaje: "Superhéroe eliminado por nombre con éxito.",
      formateado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar por nombre",
      error: error.message,
    });
  }
};
