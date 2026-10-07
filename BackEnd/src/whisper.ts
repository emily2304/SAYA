import path from "path";
import fs from "fs-extra";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import { spawnSync } from "child_process";

const WHISPER_EXEC = path.resolve(__dirname, "../../BackEnd/whisper.cpp/build/bin/Release/whisper-cli.exe");
const WHISPER_MODEL = path.resolve(__dirname, "../../BackEnd/whisper.cpp/models/ggml-base.bin");
const ARCHIVO_COLLECTION = "Archivo";

if (!fs.existsSync(WHISPER_EXEC)) {
  throw new Error(`❌ No se encontró whisper-cli.exe en: ${WHISPER_EXEC}`);
}
if (!fs.existsSync(WHISPER_MODEL)) {
  throw new Error(`❌ No se encontró el modelo en: ${WHISPER_MODEL}`);
}

export async function transcribirDesdeMongo(idArchivo: string): Promise<string> {
  const id = randomBytes(8).toString("hex");
  const tempAudioPath = path.resolve(__dirname, `../temp_audio_${id}.wav`);
  const outputBase = path.resolve(__dirname, `../transcripcion_${id}`);
  const outputTxtPath = `${outputBase}.txt`;

  try {
    // Obtener la conexión a la base de datos
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("❌ No se pudo acceder a la base de datos.");
    }

    // 1. Buscar el archivo en la colección `Archivo` utilizando su _id
    const archivo = await db.collection(ARCHIVO_COLLECTION).findOne({ _id: new mongoose.Types.ObjectId(idArchivo) });
    if (!archivo) {
      throw new Error(`❌ El archivo con ID ${idArchivo} no se encuentra en la colección Archivo.`);
    }

    // 2. Convertir el archivo `data` (Binary) a un Buffer
    const buffer = Buffer.from(archivo.data.buffer);

    // 3. Escribir el archivo temporal desde el buffer `data`
    await fs.writeFile(tempAudioPath, buffer);

    // 4. Ejecutar whisper-cli
    const result = spawnSync(
      WHISPER_EXEC,
      [
        "-m", WHISPER_MODEL,
        "-f", tempAudioPath,
        "--output-txt",
        "--output-file", outputBase,
        "--language", "es"
      ],
      { encoding: "utf-8" }
    );


    if (result.error) {
      throw new Error(`whisper-cli error: ${result.error.message}`);
    }

    // 5. Leer la transcripción
    if (!fs.existsSync(outputTxtPath)) {
      throw new Error("❌ El archivo de transcripción no se generó.");
    }

    const transcripcion = await fs.readFile(outputTxtPath, "utf-8");

    // 6. Guardar transcripción en MongoDB
    await db.collection("Transcripcion").insertOne({
      nombreArchivo: archivo.filename, // Nombre original del archivo
      transcripcion,
      subido_por: archivo.subido_por, // Suponiendo que 'subido_por' está en el objeto archivo
      grupo: archivo.grupo, // Suponiendo que 'grupo' está en el objeto archivo
      fecha: new Date(),
    });

    return transcripcion;

  } catch (error) {
    console.error("❌ Error durante la transcripción:", error);
    throw new Error("Hubo un error al procesar la transcripción.");
  } finally {
    // 7. Limpiar archivos temporales
    await fs.rm(tempAudioPath).catch(() => {});
    await fs.rm(outputTxtPath).catch(() => {});
  }
}
