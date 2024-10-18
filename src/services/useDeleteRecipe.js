import { useState } from "react";

export default function useDeleteRecipe() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRecipe = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://apirecetas-production.up.railway.app/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la receta');
      }

      return { success: true, message: 'Receta eliminada exitosamente.' }; 
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message }; 
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteRecipe,
    isLoading,
    error,
  };
}
