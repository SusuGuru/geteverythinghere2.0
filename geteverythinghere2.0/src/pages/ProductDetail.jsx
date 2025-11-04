import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { allProducts } from "../data/products";
import "../styles.css";

export default function ProductDetail() {
  const { productName } = useParams();

  const product = allProducts.find(
    (p) =>
      p.name.replace(/\s+/g, "-").toLowerCase() === productName.toLowerCase()
  );

  const [selectedColor, setSelectedColor] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [allImages, setAllImages] = useState([]);

  // ✅ Only one useEffect — correct placement
  useEffect(() => {
    if (product) {
      // Start gallery with the main product image
      const gallery = [product.img];

      // Add color-specific images if available
      if (product.colorImages) {
        Object.values(product.colorImages).forEach((url) => {
          if (url && url.trim() !== "" && !gallery.includes(url)) {
            gallery.push(url);
          }
        });
      }

      // Filter invalid entries and limit to only 3 images
      const filteredGallery = gallery
        .filter((img) => typeof img === "string" && img.trim() !== "")
        .slice(0, 3);

      setAllImages(filteredGallery);

      const defaultColor = product.colors ? product.colors[0] : "White";
      setSelectedColor(defaultColor);
      setMainImage(filteredGallery[0]);
    }
  }, [productName, product]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const colorURL = product.colorImages?.[color];
    setMainImage(colorURL || allImages[0]);
  };

  if (!product) return <p className="not-found">Product not found.</p>;

  return (
    <div>
      {/* ✅ Product Detail Header */}
      <header className="product-header">
        <div className="header-container">
          <Link to="/" className="logo">
            GetEverythingHere
          </Link>

          <nav>
            <ul>
              <li><Link to="/store">Product</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ✅ Product Detail Body */}
      <div className="product-detail">
        {/* LEFT SECTION */}
        <div className="image-section">
          <div className="image-wrapper">
            <img
              src={mainImage}
              alt={`${product.name} ${selectedColor}`}
              className="main-image"
            />
          </div>

          <div className="thumbnail-container">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} thumbnail ${i + 1}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="details-section">
          <Link to="/store" className="back-link">
            ← Back to Store
          </Link>

          <h2>{product.name}</h2>
          <h3 className="price">{product.price}</h3>
          <p className="stock-status">
            {product.available ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          <h4>Specifications</h4>
          <ul>
            {product.specs?.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>

          {product.colors && (
            <>
              <h4>Color Options</h4>
              <div className="color-options">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className={`color-circle ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      border:
                        selectedColor === color
                          ? "2px solid #fff"
                          : "1px solid #ccc",
                    }}
                    onClick={() => handleColorSelect(color)}
                  ></span>
                ))}
              </div>
            </>
          )}

          {product.storageOptions &&
            product.storageOptions[0] !== "N/A" &&
            product.storageOptions.length > 0 && (
              <>
                <h4>Storage Options</h4>
                <div className="storage-options">
                  {product.storageOptions.map((size, i) => (
                    <button key={i} className="storage-btn">
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}

          <h4>Condition</h4>
          <p>
            <strong>Condition:</strong> {product.condition}
          </p>
          <p>
            <strong>eSIM:</strong> {product.esIM}
          </p>

          <Link to="/contact" className="order-btn">
            Contact to Order
          </Link>
        </div>
      </div>
    </div>
  );
}
