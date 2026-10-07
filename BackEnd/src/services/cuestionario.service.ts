import Cuestionario from '../models/cuestionario.model';

export const getCuestionarios = () => Cuestionario.find();
export const getCuestionarioById = (id: string) => Cuestionario.findById(id);
export const createCuestionario = (data: any) => Cuestionario.create(data);
export const updateCuestionario = async (id: string, data: any) => {
  // Retornamos el documento actualizado
  const actualizado = await Cuestionario.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
  return actualizado;
};
export const deleteCuestionario = (id: string) => Cuestionario.findByIdAndDelete(id);
export const getCuestionariosByGrupo = (grupoId: string) =>
    Cuestionario.find({ grupo: grupoId }); 
export const getCuestionariosByCreador = (usuarioId: string) =>
    Cuestionario.find({ idUsuarioSolicitante: usuarioId });  
export const getCuestionariosByGrupoAndCreador = (grupoId: string, usuarioId: string) =>
    Cuestionario.find({ grupo: grupoId, idUsuarioSolicitante: usuarioId });