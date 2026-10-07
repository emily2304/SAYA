import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDB } from "./db/db";

import userRoutes from './routes/user.routes';
import foroRoutes from './routes/foro.routes';
import fileRoutes from './routes/archivo.routes';
import aficheRoutes from './routes/afiche.routes'
import cuestionarioRoutes from './routes/cuestionario.routes'
import gruposRoutes from './routes/grupo.routes'
import transcripcionesRoutes from './routes/transcripcion.routes'
import IARoutes from './routes/ia.routes'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200', // Ajusta según el frontend de Angular
  credentials: true
}));

connectDB(); //aca se llama a mongo y ya no hace falta agregar la instancia en los services

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/foros', foroRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/afiches', aficheRoutes);
app.use('/api/cuestionarios', cuestionarioRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/transcripciones', transcripcionesRoutes);
app.use('/api/IA', IARoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
