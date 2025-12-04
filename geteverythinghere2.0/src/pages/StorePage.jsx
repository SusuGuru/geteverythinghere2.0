import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../stylesheet/store.css";

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "");

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "iPhones", "Laptops", "Accessories", "Consoles", "TVs"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://geh-backend.onrender.com/products/");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const list = data.map((p) => ({
          id: p._id,
          name: p.productName,
          price: p.productPrice,
          img:
            Array.isArray(p.productImages) && p.productImages.length > 0
              ? `https://geh-backend.onrender.com${p.productImages[0]}`
              : "/placeholder-image.png",
          category: (() => {
            let cat = capitalize(p.productCategory);
            if (cat === "Iphones") cat = "iPhones";
            return cat;
          })(),
          description: p.productDescription,
          available: p.productStock > 0,
        }));

        setProducts(list);
        setFiltered(list);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== "All") result = result.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [products, activeCategory, search]);

  const placeholders = Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="product-card placeholder">
      <div className="image-container placeholder-box">Loading...</div>
      <div className="product-info">
        <h3 className="product-name">Loading...</h3>
        <p className="price price-grey">Loading...</p>
      </div>
    </div>
  ));

  return (
    <div className="store-page">
      <div className="store-header">
        <h1>Store</h1>
        <div className="store-controls">
          <div className="tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="search-box">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && <div className="error-banner">Error: {error}</div>}

      <div className="product-grid">
        {loading
          ? placeholders
          : filtered.length === 0
          ? <div className="empty-state"><p>No products found.</p></div>
          : filtered.map((p) => (
              <Link to={`/products/${p.id}`} key={p.id} className="product-card">
                <div className="image-container">
                  <img
                    src={p.img}
                    alt={p.name}
                    onError={(e) => e.currentTarget.src = "/placeholder-image.png"}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>
                  <p className={`price ${p.available ? "price-green" : "price-grey"}`}>
                    {p.price}
                  </p>
                </div>
              </Link>
            ))}
      </div>

      <footer className="store-footer">
        <p>© 2025 GetEverythingHere. All rights reserved.</p>
        <div className="footer-right">
          <button type="button">Privacy Policy</button>
          <button type="button">Terms of Service</button>
        </div>
      </footer>
    </div>
  );
}
