import { useEffect, useState } from "react";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        const cachedRecipes = localStorage.getItem('recipes');
        if (cachedRecipes) {
          setRecipes(JSON.parse(cachedRecipes));
        }

        const response = await fetch('https://apirecetas-production.up.railway.app/api/recipes');
        
        if (!response.ok) {
          throw new Error('Error al obtener las recetas');
        }

        const { data } = await response.json();

        if (Array.isArray(data)) {
          setRecipes(data);
          localStorage.setItem('recipes', JSON.stringify(data));
        } else {
          throw new Error("Los datos no son un array");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error al cargar recetas:", error);

        const cachedRecipes = localStorage.getItem('recipes');
        if (cachedRecipes) {
          setRecipes(JSON.parse(cachedRecipes));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

export default useRecipes;
