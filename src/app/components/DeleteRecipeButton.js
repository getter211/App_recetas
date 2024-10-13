import { useState } from "react";
import useDeleteRecipe from "@/hooks/useDeleteRecipe";
import AlertDialog from "./AlertDialog";

const DeleteRecipeButton = ({ id, onDelete }) => {
  const { deleteRecipe, isLoading } = useDeleteRecipe();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(""); // Mensaje vacío por defecto

  const handleDelete = async () => {
    const { success } = await deleteRecipe(id); // Solo usamos success aquí

    if (success) {
      setDialogMessage("Receta eliminada exitosamente."); // Mensaje claro
      onDelete(id); // Pasa el ID de la receta eliminada al padre
    } else {
      setDialogMessage("Error al eliminar la receta."); // Mensaje de error general
    }

    setShowDialog(true); // Muestra el diálogo de éxito o error
  };

  const handleClose = () => {
    setShowDialog(false); // Cierra el diálogo
    window.location.reload(); // Refresca la página
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
        disabled={isLoading}
      >
        {isLoading ? "Eliminando..." : "Eliminar"}
      </button>

      <AlertDialog message={dialogMessage} onClose={handleClose} />
    </>
  );
};

export default DeleteRecipeButton;
