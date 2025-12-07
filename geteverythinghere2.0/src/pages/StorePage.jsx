import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../stylesheet/store.css";

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "");

const getImageUrl = (imgPath) => {
  if (!imgPath) return "/placeholder-image.png";
  return imgPath.startsWith("http")
    ? imgPath
    : `https://geh-backend.onrender.com/${imgPath.replace(/^\/+/, "")}`;
};

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
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
          id: p._id || p.id || p.productId,
          name: p.productName || p.title || p.name || "Unnamed Product",
          price: p.productPrice || p.price || p.amount || 0,
          img: getImageUrl(
            (Array.isArray(p.productImages) && p.productImages[0]) ||
              p.image ||
              (p.images && p.images[0])
          ),
          category: capitalize(p.productCategory || p.category || p.type || "Other"),
          description: p.productDescription || p.description || p.details || "",
          available: (() => {
            const stock = p.productStock ?? p.stock ?? p.qty ?? p.quantity;
            if (stock != null) {
              const stockNum = Number(stock);
              if (!isNaN(stockNum)) return stockNum > 0;
            }
            if (p.available != null && typeof p.available === "string") {
              return p.available.trim().toLowerCase() === "available";
            }
            return false;
          })(),
        }));

        setProducts(list);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => activeCategory === "All" || p.category === activeCategory);
  }, [products, activeCategory]);

  const placeholders = Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="product-card placeholder">
      <div className="image-container placeholder-box" />
      <div className="product-info">
        <h3 className="product-name">Loading...</h3>
        <p className="status loading">Loading...</p>
        <p className="price loading">Loading...</p>
      </div>
    </div>
  ));

  return (
    <div className="store-page">
      <div className="store-header">
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
        </div>
      </div>

      {error && <div className="error-banner">Error: {error}</div>}

      <div className="product-grid">
        {loading
          ? placeholders
          : filtered.length === 0
          ? (
            <div className="empty-state">
              <p>No products found.</p>
            </div>
          )
          : filtered.map((p, index) => (
              <Link
                to={`/products/${p.id}`}
                key={p.id || `${p.name}-${index}`}
                className="product-card"
              >
                <div className="image-container">
                  <img
                    src={p.img}
                    alt={p.name}
                    onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
                  />
                </div>

                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>

                  {/* ✅ Status with dot */}
                  <p className={`status ${p.available ? "in" : "out"}`}>
                    <span className={`dot ${p.available ? "green" : "red"}`}></span>
                    <span>{p.available ? "Available" : "Out of stock"}</span>
                  </p>

                  <p className={`price ${p.available ? "active" : "inactive"}`}>
                    GHC {Number(p.price).toFixed(2)}
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
