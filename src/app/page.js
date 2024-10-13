"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/menu");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black">
      <Head>
        <title>Flavor Bliss - Recipes</title>
        <meta name="description" content="A catchy description of the app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center sm:text-5xl">
          Recetas 👨‍🍳
        </h1>
      </header>
      <main className="flex flex-col items-center text-center px-4 sm:px-0">
        <h2 className="text-2xl font-semibold mb-4 sm:text-3xl">
          ¡Bienvenido a Recetas! Aquí podrás crear y gestionar tus recetas
          favoritas!
        </h2>
        <p className="text-lg sm:text-xl">
          ¡Empieza a agregar tus recetas favoritas y disfruta de la experiencia
          de Recetas!
        </p>
        <button
          onClick={handleStart}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg mt-8 hover:bg-orange-400 transition duration-300 ease-in-out"
        >
          Comenzar
        </button>
      </main>
    </div>
  );
}
