import { Router } from "express";
import { handleChat, handleChatWithFile, handleChatWithFileAndSave, handleCuestionarioWithFileAndSave  } from "../controllers/chatGPT.controller";

const router = Router();
router.post("/chat", handleChat);
router.post("/chat/file/:idArchivo", handleChatWithFile);
router.post("/chat/afiche/:idArchivo", handleChatWithFileAndSave);
router.post("/chat/cuestionario/:idArchivo", handleCuestionarioWithFileAndSave);
export default router;
