import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../stylesheet/details.css";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://geh-backend.onrender.com/products/");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        // Find the product using MongoDB ID
        const found = data.find((p) => String(p._id) === String(id));

        if (!found) {
          setError("Product not found.");
          setLoading(false);
          return;
        }

        // Map fields
        const mapped = {
          id: found._id,
          name: found.productName || "Unnamed Product",
          price: found.productPrice || 0,
          available: found.productStock > 0,
          specs: found.productSpecification || [],
          images: found.productImages || []
        };

        // Create full URLs
        const imgs = mapped.images.map((img) =>
          img
            ? img.startsWith("/")
              ? `https://geh-backend.onrender.com${img}`
              : `https://geh-backend.onrender.com/${img}`
            : "/placeholder-image.png"
        );

        setProduct(mapped);
        setAllImages(imgs);
        setMainImage(imgs[0] || "/placeholder-image.png");
      } catch (err) {
        console.error(err);
        setError("Something went wrong loading this product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // STATES
  if (loading) return <p className="not-found">Loading product...</p>;
  if (error) return <p className="not-found">{error}</p>;
  if (!product) return <p className="not-found">Product not found.</p>;

  return (
    <div>
      {/* HEADER */}
      <header className="product-header">
        <div className="header-container">
          <Link to="/" className="logo">GetEverythingHere</Link>
          <nav>
            <ul>
              <li><Link to="/store">Product</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* DETAIL SECTION */}
      <div className="product-detail">
        {/* LEFT */}
        <div className="image-section">
          <div className="image-wrapper">
            <img
              src={mainImage}
              alt={product.name}
              className="main-image"
              onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
            />
          </div>

          <div className="thumbnail-container">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
                onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="details-section">
          <Link to="/store" className="back-link">← Back to Store</Link>

          <h2>{product.name}</h2>
          <h3 className="price">${Number(product.price).toFixed(2)}</h3>

          <p className="stock-status">
            {product.available ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          <h4>Specifications</h4>
          <ul>
            {product.specs.length > 0 ? (
              product.specs.map((s, i) => <li key={i}>{s}</li>)
            ) : (
              <li>No specifications available</li>
            )}
          </ul>

          <Link to="/contact" className="order-btn">Contact to Order</Link>
        </div>
      </div>
    </div>
  );
}
