import { useState } from "react";
import useDeleteRecipe from "@/services/useDeleteRecipe";
import AlertDialog from "./AlertDialog";

const DeleteRecipeButton = ({ id, onDelete }) => {
  const { deleteRecipe, isLoading } = useDeleteRecipe();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(""); 

  const handleDelete = async () => {
    const { success } = await deleteRecipe(id); 

    if (success) {
      setDialogMessage("Receta eliminada exitosamente."); 
      onDelete(id);
    } else {
      setDialogMessage("Error al eliminar la receta.");
    }

    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false); 
    window.location.reload();
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
