import { normalizeMensajes } from "../utils/normalizeData.js";

import { MensajesDAOFirebase } from "../daos/mensajes/MensajesDAOFirebase.js";

import { logger } from "../utils/logger.js";

const storage = new MensajesDAOFirebase();

export const getMessages = async () => {
  try {
    const mensajes = await storage.getAll();
    return normalizeMensajes(mensajes);
  } catch (error) {
    logger.error({ error: error.message });
  }
};

export const addMessage = async (Mssg) => {
  try {
    const mensaje = {
      id: Math.random().toString(36).slice(2),
      author: {
        id: Mssg.author.id,
        nombre: Mssg.author.nombre,
        apellido: Mssg.author.apellido,
        edad: Mssg.author.edad,
        alias: Mssg.author.alias,
        avatar: Mssg.author.avatar,
      },
      text: Mssg.text,
      date: Mssg.date,
    };
    await storage.save(mensaje);
  } catch (error) {
    logger.error({ error: error.message });
  }
};