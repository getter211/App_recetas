import { useState, useEffect } from "react";
import useCreateRecipe from "@/hooks/useCreateRecipe";
import EditRecipeButton from "@/app/components/EditRecipeButton"; 
import AlertDialog from "@/app/components/AlertDialog"; // Asegúrate de importar el AlertDialog

const RecipeForm = ({ onSuccess, recipeToEdit }) => {
  const [title, setTitle] = useState(recipeToEdit?.title || "");
  const [ingredients, setIngredients] = useState(recipeToEdit?.ingredients || "");
  const [preparation_time, setPreparationTime] = useState(recipeToEdit?.preparation_time || "");
  const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de alerta

  const { createRecipe, isLoading: isCreating } = useCreateRecipe();

  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title);
      setIngredients(recipeToEdit.ingredients);
      setPreparationTime(recipeToEdit.preparation_time);
    }
  }, [recipeToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeToEdit) {
      try {
        const response = await createRecipe({
          title,
          ingredients,
          preparation_time,
        });

        if (response) {
          setAlertMessage("Receta agregada con éxito"); // Mostrar el mensaje de éxito
        } else {
          setAlertMessage("Error al agregar la receta"); // Mostrar error
        }
      } catch (error) {
        console.error("Error al agregar receta:", error);
        setAlertMessage("Error al realizar la operación");
      }
    }
  };

  // Función que se llama al cerrar el diálogo
  const handleCloseDialog = () => {
    setAlertMessage("");  // Ocultar el mensaje
    window.location.reload();  // Refrescar la página después de cerrar el diálogo
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Nombre de la receta"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Ingredientes"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Tiempo de preparación (en minutos)"
        value={preparation_time}
        onChange={(e) => setPreparationTime(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />

      {/* Botón de edición solo se muestra si estamos editando */}
      {recipeToEdit && (
        <EditRecipeButton
          recipeToEdit={recipeToEdit}
          title={title}
          ingredients={ingredients}
          preparation_time={preparation_time}
          onSuccess={setAlertMessage} // Muestra mensaje al editar
        />
      )}

      {/* El botón de crear solo aparece si no estamos editando */}
      {!recipeToEdit && (
        <button
          type="submit"
          disabled={isCreating}
          className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-400 transition duration-300 ease-in-out"
        >
          {isCreating ? "Cargando..." : "Crear Receta"}
        </button>
      )}

      {/* AlertDialog se muestra si hay un mensaje de alerta */}
      {alertMessage && (
        <AlertDialog
          message={alertMessage}
          onClose={handleCloseDialog} // Recarga la página al cerrar
        />
      )}
    </form>
  );
};

export default RecipeForm;
