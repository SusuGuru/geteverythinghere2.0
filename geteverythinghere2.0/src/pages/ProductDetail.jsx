import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../stylesheet/details.css";

const getImageUrl = (imgPath) => {
  if (!imgPath) return "/placeholder-image.png";
  return imgPath.startsWith("http")
    ? imgPath
    : `https://geh-backend.onrender.com/${imgPath.replace(/^\/+/, "")}`;
};

export default function ProductDetail() {
  const { id } = useParams(); // matches App.jsx route

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`https://geh-backend.onrender.com/products/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (!data) {
          setError("Product not found.");
          setLoading(false);
          return;
        }

        // Map fields similarly to store page
        const mapped = {
          id: data._id || data.id,
          name: data.productName || data.title || "Unnamed Product",
          price: data.productPrice || data.price || 0,
          available: (() => {
            const stock = data.productStock ?? data.stock ?? data.qty ?? data.quantity;
            if (stock != null) return Number(stock) > 0;
            if (data.available != null && typeof data.available === "string") {
              return data.available.trim().toLowerCase() === "available";
            }
            return false;
          })(),
          specs: data.productSpecification || data.specs || [],
          images: Array.isArray(data.productImages) ? data.productImages : [data.image],
          description: data.productDescription || data.description || "",
        };

        const imgs = mapped.images.map(getImageUrl);

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

  if (loading) return <p className="not-found">Loading product...</p>;
  if (error) return <p className="not-found">{error}</p>;
  if (!product) return <p className="not-found">Product not found.</p>;

  return (
    <div className="product-detail-page">
      <header className="product-header">
        <div className="header-container">
          <Link to="/" className="logo">GetEverythingHere</Link>
          <nav>
            <ul>
              <li><Link to="/store">Products</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

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
          <p>{product.description}</p>
          <h3 className="price">GHC {Number(product.price).toFixed(2)}</h3>
          <p className="stock-status">
            {product.available ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          <h4>Specifications</h4>
          <ul>
            {product.specs.length > 0
              ? product.specs.map((s, i) => <li key={i}>{s}</li>)
              : <li>No specifications available</li>
            }
          </ul>

          <Link to="/contact" className="order-btn">Contact to Order</Link>
        </div>
      </div>
    </div>
  );
}
