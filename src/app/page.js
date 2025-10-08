"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const nameRef = useRef();
  const descripcionRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: nameRef.current.value,
        descripcion: descripcionRef.current.value,
        price: priceRef.current.value,
        stock: stockRef.current.value,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al crear producto");
      await loadProducts();
      nameRef.current.value = "";
      descripcionRef.current.value = "";
      priceRef.current.value = "";
      stockRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-300 p-4 mb-10"
      >
        <h2 className="text-lg font-semibold mb-3 text-center">
          Agregar producto
        </h2>

        <div className="flex flex-col gap-3">
          <input
            ref={nameRef}
            placeholder="Nombre"
            className="border border-gray-300 p-2"
          />
          <input
            ref={descripcionRef}
            placeholder="Descripción"
            className="border border-gray-300 p-2"
          />
          <input
            ref={priceRef}
            type="number"
            placeholder="Precio"
            className="border border-gray-300 p-2"
          />
          <input
            ref={stockRef}
            type="number"
            placeholder="Stock"
            className="border border-gray-300 p-2"
          />

          <button
            type="submit"
            className="bg-gray-800 text-white py-2 hover:bg-gray-700 transition"
          >
            Guardar
          </button>
        </div>
      </form>

      <table className="w-full max-w-3xl border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-3 text-gray-500">
                No hay productos.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.descripcion}</td>
                <td className="border p-2">${p.price}</td>
                <td className="border p-2">{p.stock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
