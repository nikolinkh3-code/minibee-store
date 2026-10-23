import { useState } from "react";
import "./App.css";
import useProducts from "./data/useProducts";

function App() {
  const products = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const openProduct = (product) => {
    setSelectedProduct(product);
    setCurrentImage(0);
    setSelectedSize("");
  };

  const getProductImages = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }

    return [product.image, product.image2].filter(Boolean);
  };

  const WHATSAPP_NUMBER = "8801613113028";

  const BKASH_NUMBER = "01521386564";
  const NAGAD_NUMBER = "01521386564";
  const ROCKET_NUMBER = "01521386564";

  const formatPrice = (amount) => {
    return `৳ ${new Intl.NumberFormat("en-BD", {
      maximumFractionDigits: 2,
    }).format(amount)}`;
  };

  const getAdvanceAmount = (product) => {
    return product.price * 0.5;
  };

  const categories = [
    "All",
    "Bags",
    "Shoes",
    "Dresses",
    "Makeup",
    "Jewellery",
    "Accessories",
    "Stationery",
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  const orderOnWhatsApp = (product) => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size first.");
      return;
    }

    const sizeText = product.sizes ? `\nSize: ${selectedSize}` : "";

    const message = product.available
      ? `Hi Minibee, I want to order:

${product.name}
Price: ${formatPrice(product.price)}
Status: Available${sizeText}`
      : `Hi Minibee, I want to pre-order:

${product.name}
Price: ${formatPrice(product.price)}
50% Advance: ${formatPrice(getAdvanceAmount(product))}
Status: Pre-order${sizeText}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="page">

      <header className="navbar">

        <div className="logo">
          mini<span>bee</span>
        </div>

        <div className="top-socials">


            <a
              href="https://www.instagram.com/mini_bee_23"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>


            <a
              href="https://www.facebook.com/people/MiniBee/61550534498463/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>


            <a
              href="mailto:YOUR_EMAIL@gmail.com"
            >
              Email
            </a>

          
        </div>

      </header>


      <main className="container">

        <section className="intro">
          <p className="small-title">
            MINIBEE STORE
          </p>

          <h1>
            Find something
            <span> cute.</span>
          </h1>

          <p className="description">
            Simple little products, lovely colors
            and happy everyday finds.
          </p>
        </section>


        <section className="filter-section">

          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}

        </section>


        <section className="products">

          {filteredProducts.map((product, index) => (

            <article
              className="product-card"
              key={product.id}
              style={{
                animationDelay: `${index * 70}ms`,
              }}
            >

              <div
                className="image-box clickable-product"
                onClick={() => openProduct(product)}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <span
                  className={
                    product.available
                      ? "status-badge available"
                      : "status-badge preorder"
                  }
                >
                  {product.available
                    ? "Available"
                    : "Pre-order"}
                </span>

              </div>


              <div className="product-info">

                <p className="category">
                  {product.category}
                </p>

                <h2
                  className="clickable-product-name"
                  onClick={() => openProduct(product)}
                >
                  {product.name}
                </h2>

                <p className="price">
                  {formatPrice(product.price)}
                </p>


                <div
                  className={
                    product.available
                      ? "availability-text available-text"
                      : "availability-text preorder-text"
                  }
                >
                  <span className="status-dot"></span>

                  {product.available
                    ? "Available"
                    : "Pre-order"}
                </div>


                {!product.available && (
                  <div className="card-advance">
                    <span>50% Advance</span>

                    <strong>
                      {formatPrice(
                        getAdvanceAmount(product)
                      )}
                    </strong>
                  </div>
                )}


                <button
                  className="view-button"
                  onClick={() => openProduct(product)}
                >
                  View Product
                </button>

              </div>

            </article>

          ))}

        </section>

      </main>


      <section className="reviews-section">

        <div className="reviews-header">
          <p className="small-title">
            CUSTOMER REVIEWS
          </p>

          <h2>Loved by our customers</h2>

          <p>
            A few sample reviews — replace these with real
            customer feedback later.
          </p>
        </div>


        <div className="reviews-grid">

          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p>
              “The product was really cute and exactly
              what I expected.”
            </p>
            <span>Sample Review</span>
          </article>


          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p>
              “Beautiful quality and the ordering process
              was very easy.”
            </p>
            <span>Sample Review</span>
          </article>


          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p>
              “Loved the packaging and the product looked
              even better in person.”
            </p>
            <span>Sample Review</span>
          </article>


          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p>
              “Very happy with my order. I would definitely
              shop from Minibee again.”
            </p>
            <span>Sample Review</span>
          </article>


          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p>
              “Cute collection, simple ordering and a
              really nice shopping experience.”
            </p>
            <span>Sample Review</span>
          </article>

        </div>

      </section>


      {/* TERMS & CONDITIONS - ONLY ONE COPY */}

      <section className="terms-section">

        <div className="terms-header">
          <p className="small-title">
            SHOP INFORMATION
          </p>

          <h2>
            Terms & Conditions
          </h2>

          <p>
            Please read our ordering and pre-order policy
            before placing your order.
          </p>
        </div>


        <div className="terms-list">

          <div className="term-item">
            <span className="term-number">01</span>

            <div>
              <h3>Direct Import</h3>
              <p>
                All Minibee products are directly
                imported from China.
              </p>
            </div>
          </div>


          <div className="term-item">
            <span className="term-number">02</span>

            <div>
              <h3>Available Products</h3>
              <p>
                Products marked as Available are
                currently in stock and can be
                processed for delivery.
              </p>
            </div>
          </div>


          <div className="term-item">
            <span className="term-number">03</span>

            <div>
              <h3>Pre-order</h3>
              <p>
                If a product is not currently
                available, customers must place
                a pre-order by paying 50% advance.
              </p>
            </div>
          </div>


          <div className="term-item">
            <span className="term-number">04</span>

            <div>
              <h3>Arrival Time</h3>
              <p>
                Pre-order products coming from China
                normally take approximately 15–20
                days to arrive.
              </p>
            </div>
          </div>


          <div className="term-item">
            <span className="term-number">05</span>

            <div>
              <h3>Advance Payment</h3>
              <p>
                Once the 50% advance payment has
                been made and the pre-order is
                confirmed, the advance payment
                is non-refundable.
              </p>
            </div>
          </div>

        </div>

      </section>


      <footer className="site-footer">

        <div className="footer-inner">

          <div className="footer-brand">
            <div className="footer-logo">
              mini<span>bee</span>
            </div>

            <p>
              Cute things, lovely colors,
              happy little finds.
            </p>
          </div>

        </div>


        <div className="footer-bottom">
          <p>
            © 2026 Minibee. All rights reserved.
          </p>
        </div>

      </footer>


      {selectedProduct && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-button"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>


            <div className="modal-gallery">

              <div className="modal-slider">

                <img
                  src={getProductImages(selectedProduct)[currentImage]}
                  alt={`${selectedProduct.name} view ${currentImage + 1}`}
                />

                {getProductImages(selectedProduct).length > 1 && (
                  <>
                    <button
                      className="slider-arrow slider-prev"
                      onClick={() =>
                        setCurrentImage((current) =>
                          current === 0
                            ? getProductImages(selectedProduct).length - 1
                            : current - 1
                        )
                      }
                      aria-label="Previous image"
                    >
                      ‹
                    </button>

                    <button
                      className="slider-arrow slider-next"
                      onClick={() =>
                        setCurrentImage((current) =>
                          current === getProductImages(selectedProduct).length - 1
                            ? 0
                            : current + 1
                        )
                      }
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </>
                )}

              </div>

              {getProductImages(selectedProduct).length > 1 && (
                <div className="slider-dots">

                  {getProductImages(selectedProduct).map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      className={
                        currentImage === index
                          ? "slider-dot active"
                          : "slider-dot"
                      }
                      onClick={() => setCurrentImage(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}

                </div>
              )}

            </div>


            <div className="modal-content">

              <p className="modal-category">
                {selectedProduct.category}
              </p>

              <h2>
                {selectedProduct.name}
              </h2>

              <p className="modal-price">
                {formatPrice(selectedProduct.price)}
              </p>


              <div
                className={
                  selectedProduct.available
                    ? "modal-status modal-available"
                    : "modal-status modal-preorder"
                }
              >
                <span className="status-dot"></span>

                {selectedProduct.available
                  ? "Available"
                  : "Pre-order"}
              </div>


              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div className="size-section">
                  <p className="size-title">Select Size</p>

                  <div className="size-options">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={
                          selectedSize === size
                            ? "size-button active"
                            : "size-button"
                        }
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="modal-description">
                {selectedProduct.description}
              </p>


              {!selectedProduct.available && (

                <div className="payment-section">

                  <div className="advance-summary">

                    <div>
                      <span>
                        50% Advance Required
                      </span>

                      <strong>
                        {formatPrice(
                          getAdvanceAmount(selectedProduct)
                        )}
                      </strong>
                    </div>

                    <p>
                      Pay 50% advance to confirm
                      your pre-order.
                    </p>

                  </div>


                  <p className="payment-title">
                    Payment Methods
                  </p>


                  <div className="payment-methods">

                    <div className="payment-card">
                      <span className="payment-name">
                        bKash
                      </span>

                      <span className="payment-number">
                        {BKASH_NUMBER}
                      </span>
                    </div>


                    <div className="payment-card">
                      <span className="payment-name">
                        Nagad
                      </span>

                      <span className="payment-number">
                        {NAGAD_NUMBER}
                      </span>
                    </div>


                    <div className="payment-card">
                      <span className="payment-name">
                        Rocket
                      </span>

                      <span className="payment-number">
                        {ROCKET_NUMBER}
                      </span>
                    </div>

                  </div>

                </div>

              )}


              <button
                className="whatsapp-button"
                onClick={() =>
                  orderOnWhatsApp(selectedProduct)
                }
              >
                {selectedProduct.available
                  ? "Order on WhatsApp"
                  : "Pre-order on WhatsApp"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
