"use client";
import { useState } from "react";
import AddRecipeButton from "../components/AddRecipeButton";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";
import AlertDialog from "../components/AlertDialog";
import Modal from "../components/Modal";
import useRecipes from "@/hooks/useRecipe";

export default function Menu() {
  const { recipes, loading, error } = useRecipes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogMessage("");
  };

  const handleSuccess = (message) => {
    setDialogMessage(message);
    setIsDialogOpen(true);
    setIsModalOpen(false);
  };

  const handleEdit = (recipe) => {
    setRecipeToEdit(recipe);
    setIsModalOpen(true);
  };

  const handleAddRecipe = () => {
    setRecipeToEdit(null);
    setIsModalOpen(true);
  };

  if (loading) return <p className="text-center">Cargando recetas...</p>;
  if (error) return <p className="text-center text-red-500">Error al cargar recetas: {error}</p>;

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center">Recetas</h1>

      <p className="text-base sm:text-lg text-gray-500 text-center mb-6">
        Añade tus recetas de comidas favoritas 👨‍🍳
      </p>

      <div className="mb-6 flex justify-center">
        <AddRecipeButton onAdd={handleAddRecipe} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm onSuccess={handleSuccess} recipeToEdit={recipeToEdit} />
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            ingredients={recipe.ingredients.split(", ")}
            preparation_time={recipe.preparation_time}
            onDelete={handleSuccess}
            onEdit={handleEdit}
            id={recipe.id}
          />
        ))}
      </div>
    </main>
  );
}
