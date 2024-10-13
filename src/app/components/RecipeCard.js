// src/components/RecipeCard.js
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeCard = ({
  title,
  ingredients,
  preparation_time,
  id,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="border-2 border-gray-300 p-4 rounded-xl shadow">
      <h2 className="font-bold text-xl">{title}</h2>
      <p>Ingredientes: {ingredients.join(", ")}</p>
      <p>Tiempo de preparación: {preparation_time} minutos</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit({ id, title, ingredients, preparation_time })}
          className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-400 transition duration-300 ease-in-out"
        >
          Editar
        </button>
        <DeleteRecipeButton id={id} onDelete={onDelete} />{" "}
      </div>
    </div>
  );
};

export default RecipeCard;
