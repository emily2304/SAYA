// src/controllers/chat.controller.ts
import { Request, Response, NextFunction } from "express";
import * as chatService from "../services/chat.service";
import * as transcripcionService from '../services/transcripcion.service';
import Afiche from '../models/afiche.model'; // Asegúrate de importar tu modelo Afiche
import Cuestionario from "../models/cuestionario.model";
import { RequestHandler } from "express";


export const handleChat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { prompt, provider } = req.body;
  if (!prompt) {
    res.status(400).json({ error: "El campo prompt es requerido" });
    return;          // <-- void
  }

  try {
    const responseText =
      provider === "deepseek"
        ? await chatService.callDeepSeek(prompt)
        : await chatService.callOpenAI(prompt);

    res.json({ response: responseText });
    return;          // <-- void
  } catch (err: any) {
    console.error("Chat error:", err);
    next(err);       // propagate error
    return;          // <-- void
  }
};


export const handleChatWithFile = async (
  req: Request<{ idArchivo: string }, any, { prompt: string; provider?: string }>,
  res: Response,
  next: NextFunction
) => {
  const { idArchivo } = req.params;
  const { prompt, provider } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "El campo prompt es requerido" });
    return;
  }

  try {
    // 1. Recupera el contenido del archivo de texto
    const textoArchivo = await transcripcionService.getTranscripcionById(idArchivo);

    // 2. Construye el prompt combinando el contenido del archivo + prompt del usuario
    const fullPrompt = `
Contenido del archivo:
${textoArchivo}

Pregunta del usuario:
${prompt}
    `.trim();

    // 3. Llama al servicio de IA con el prompt combinado
    let responseText: string;
    if (provider === "deepseek") {
      responseText = await chatService.callDeepSeek(fullPrompt);
    } else {
      responseText = (await chatService.callOpenAI(fullPrompt)) || "";
    }

    // 4. Devuelve la respuesta
    res.json({ response: responseText });
  } catch (err: any) {
    next(err);
  }
};


function extraerJSON(texto: string): any | null {
  const regex = /{[\s\S]*?}/g;
  const coincidencias = texto.match(regex);
  if (!coincidencias) return null;

  for (const bloque of coincidencias) {
    try {
      return JSON.parse(bloque);
    } catch (e) {
      continue;
    }
  }

  return null;
}

export const handleChatWithFileAndSave: RequestHandler = async (req, res, next) => {
  const { idArchivo } = req.params;
  const { prompt, provider } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "El campo prompt es requerido" });
    return;
  }

  try {
    const textoArchivo = await transcripcionService.getTranscripcionById(idArchivo);

    const fullPrompt = `
Analiza el siguiente texto y responde únicamente en formato JSON con las claves: "titulo", "resumen" y "conceptos_clave" (una lista de strings). No incluyas explicaciones adicionales.
Contenido del archivo:
${textoArchivo}

Pregunta del usuario:
${prompt}`.trim();

    let responseText: string;
    if (provider === "deepseek") {
      responseText = await chatService.callDeepSeek(fullPrompt);
    } else {
      responseText = (await chatService.callOpenAI(fullPrompt)) || "";
    }

    const aficheData = extraerJSON(responseText);
    if (!aficheData) {
      res.status(500).json({ error: "La respuesta de la IA no contiene un JSON válido" });
      return;
    }

    const nuevoAfiche = new Afiche({
      titulo: aficheData.titulo,
      resumen: aficheData.resumen,
      conceptos_clave: aficheData.conceptos_clave,
      id_creador: textoArchivo!.subido_por,
      id_archivo_fuente: idArchivo,
      grupo: textoArchivo!.grupo,
    });

    await nuevoAfiche.save();

    res.json({ response: responseText, afiche: nuevoAfiche });
  } catch (err: any) {
    next(err);
  }
};

export const handleCuestionarioWithFileAndSave: RequestHandler = async (req, res, next) => {
  const { idArchivo } = req.params;
  const { prompt, provider } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "El campo prompt es requerido" });
    return;
  }

  try {
    // 1. Recupera transcripción
    const textoArchivo = await transcripcionService.getTranscripcionById(idArchivo);
    if (!textoArchivo) {
      res.status(404).json({ error: "Archivo no encontrado" });
      return;
    }
    const baseText = textoArchivo.transcripcion;

    // 2. Construye prompt específico
    const schemaPrompt = `
A partir del siguiente texto, genera un cuestionario. Responde únicamente con un JSON que contenga:
- preguntas: array de strings
- respuestas: array de strings con una respuesta correcta resaltada y 3 respuestas incorrectas por pregunta

No incluyas ningún texto adicional.

Texto:
"""${baseText}"""

    `.trim();

    // 3. Llama a la IA
    const responseText = provider === "deepseek"
      ? await chatService.callDeepSeek(schemaPrompt)
      : (await chatService.callOpenAI(schemaPrompt)) || "";

    // 4. Extrae el JSON
    const data = extraerJSON(responseText);
    if (!data) {
      console.error("Respuesta IA inválida:", responseText);
      res.status(500).json({ error: "La IA no devolvió un JSON válido" });
      return;
    }

    // 5. Guarda en Mongo usando tu esquema Cuestionario
    const nuevoQuiz = new Cuestionario({
      txt: JSON.stringify(data),                     // JSON stringificado
      idUsuarioSolicitante: textoArchivo.subido_por,  // el que pidió
      respuestas: JSON.stringify(data),               // respuestas JSON
      resultado: 0,                                   // inicial
      grupo: textoArchivo.grupo                       // ObjectId (o array)
    });
    await nuevoQuiz.save();

    // 6. Envía la respuesta
    res.json({ cuestionario: nuevoQuiz });
    return;   // <— Muy importante: termina sin return res.json
  } catch (err) {
    next(err);
  }
};
