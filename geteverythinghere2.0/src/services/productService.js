export async function fetchAllProducts() {
  try {
    const res = await fetch("https://geh-backend.onrender.com/api/v1/products");
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    const data = await res.json();
    return { $1: true, $2: data.products ?? [] };
  } catch (err) {
    console.error("fetchAllProducts error:", err);
    return { $1: false, $2: err.message };
  }
}

export async function getProductById(id) {
  try {
    const res = await fetch(`https://geh-backend.onrender.com/api/v1/products/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
    const data = await res.json();
    return { $1: true, $2: data };
  } catch (err) {
    console.error("getProductById error:", err);
    return { $1: false, $2: err.message };
  }
}
