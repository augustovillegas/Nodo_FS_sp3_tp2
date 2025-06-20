import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: {
      type: String,
      required: [true, "El nombre del superhéroe es obligatorio"],
      trim: true,
      minlength: [3, "Debe tener al menos 3 caracteres"],
      maxlength: [60, "No puede superar los 60 caracteres"],
    },
    nombreReal: {
      type: String,
      required: [true, "El nombre real es obligatorio"],
      trim: true,
      minlength: [3, "Debe tener al menos 3 caracteres"],
      maxlength: [60, "No puede superar los 60 caracteres"],
    },
    edad: {
      type: Number,
      required: [true, "La edad es obligatoria"],
      min: [0, "La edad no puede ser negativa"],
    },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: String,
    poderes: {
      type: [String],
      required: [true, "Los poderes son obligatorios"],
      validate: {
        validator: function (arr) {
          if (!Array.isArray(arr) || arr.length === 0) {
            return false;
          }

          for (const poder of arr) {
            if (
              typeof poder !== "string" ||
              poder.trim() !== poder ||
              poder.length < 3 ||
              poder.length > 60
            ) {
              return false;
            }
          }
          return true;
        },
        message:
          "Los poderes deben ser un array de strings no vacío. Cada poder debe tener entre 3 y 60 caracteres y no debe contener espacios al inicio o al final.",
      },
    },
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
  },
  { collection: "Grupo-03" }
);

export const SuperHero = mongoose.model("SuperHero", superheroSchema);
