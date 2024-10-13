import { MdAdd } from 'react-icons/md';

export default function AddRecipeButton({ onAdd }) {
  return (
    <button 
      className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-400 transition duration-300 ease-in-out"
      onClick={onAdd}
    >
      <MdAdd className="mr-2" />
      Añadir Receta
    </button>
  );
}
