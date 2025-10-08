import pool from "@/lib/db";

// Obtener todos los productos
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM products");
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Agregar un nuevo producto
export async function POST(req) {
  try {
    const { name, descripcion, price, stock } = await req.json();

    const result = await pool.query(
      "INSERT INTO products (name, descripcion, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, descripcion, price, stock]
    );

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Actualizar producto existente
export async function PUT(req) {
  try {
    const { id, name, descripcion, price, stock } = await req.json();

    const result = await pool.query(
      "UPDATE products SET name=$1, descripcion=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *",
      [name, descripcion, price, stock, id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: "Producto no encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
