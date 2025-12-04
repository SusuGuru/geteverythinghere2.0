import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../stylesheet/details.css";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ONE product by ID (from the general products endpoint)
  useEffect(() => {
    setLoading(true);

    fetch("https://geh-backend.onrender.com/api/v1/products/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        // Find product by ID
        const foundProduct = data.find((p) => String(p.id) === String(id));
        if (!foundProduct) throw new Error("Product not found");

        setProduct(foundProduct);

        // Build image gallery
        const gallery = foundProduct.img ? [foundProduct.img] : [];
        if (foundProduct.colorImages) {
          Object.values(foundProduct.colorImages).forEach((url) => {
            if (url && !gallery.includes(url)) gallery.push(url);
          });
        }
        setAllImages(gallery);

        // Set main image and default color
        const defaultColor = foundProduct.colors?.[0] ?? "";
        setSelectedColor(defaultColor);
        setMainImage(gallery[0] || "");

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const colorURL = product?.colorImages?.[color] ?? allImages[0] ?? "";
    setMainImage(colorURL);
  };

  if (loading) return <p className="not-found">Loading product...</p>;
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

      {/* PRODUCT DETAIL */}
      <div className="product-detail">
        {/* LEFT: Images */}
        <div className="image-section">
          <div className="image-wrapper">
            <img
              src={mainImage || allImages[0] || ""}
              alt={`${product.name ?? "Product"} ${selectedColor ?? ""}`}
              className="main-image"
            />
          </div>
          <div className="thumbnail-container">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name ?? "thumbnail"} ${i + 1}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="details-section">
          <Link to="/store" className="back-link">← Back to Store</Link>

          <h2>{product.name ?? "Unnamed Product"}</h2>
          <h3 className="price">{product.price ?? "Price not available"}</h3>
          <p className="stock-status">
            {product.available ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          {/* Specifications */}
          <h4>Specifications</h4>
          <ul>
            {product.specs?.length > 0
              ? product.specs.map((spec, i) => <li key={i}>{spec}</li>)
              : <li>No specifications available</li>}
          </ul>

          {/* Color Options */}
          {product.colors?.length > 0 && (
            <>
              <h4>Color Options</h4>
              <div className="color-options">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => handleColorSelect(color)}
                  ></span>
                ))}
              </div>
            </>
          )}

          {/* Storage Options */}
          {product.storageOptions?.length > 0 && product.storageOptions[0] !== "N/A" && (
            <>
              <h4>Storage Options</h4>
              <div className="storage-options">
                {product.storageOptions.map((size, i) => (
                  <button key={i} className="storage-btn">{size}</button>
                ))}
              </div>
            </>
          )}

          {/* Condition */}
          <h4>Condition</h4>
          <p><strong>Condition:</strong> {product.condition ?? "Unknown"}</p>
          <p><strong>eSIM:</strong> {product.esim ?? "Not supported"}</p>

          {/* Order Button */}
          <Link to="/contact" className="order-btn">Contact to Order</Link>
        </div>
      </div>
    </div>
  );
}
