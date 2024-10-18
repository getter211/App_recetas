import { useState } from "react";
import useEditRecipe from "@/services/useEditRecipe";

const EditRecipeButton = ({ recipeToEdit, title, ingredients, preparation_time, onSuccess }) => {
  const { editRecipe, isLoading } = useEditRecipe();
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = async () => {
    setErrorMessage(""); 
    try {
      const response = await editRecipe(recipeToEdit.id, {
        title,
        ingredients,
        preparation_time,
      });

      if (response) {
        onSuccess("Receta editada con éxito");
      } else {
        setErrorMessage("Error al editar la receta");
        onSuccess("Error al editar la receta");
      }
    } catch (error) {
      console.error("Error al editar receta:", error);
      setErrorMessage("Error al realizar la operación");
      onSuccess("Error al realizar la operación");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleEdit}
        disabled={isLoading}
        className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-400 transition duration-300 ease-in-out"
      >
        {isLoading ? "Cargando..." : "Editar Receta"}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};

export default EditRecipeButton;
