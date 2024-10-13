import { useState } from 'react';

export default function useCreateRecipe() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRecipe = async (recipe) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://apirecetas-production.up.railway.app/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la receta');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createRecipe, isLoading, error };
}
