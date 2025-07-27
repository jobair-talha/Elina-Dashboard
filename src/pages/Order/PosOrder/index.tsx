import React from "react";

const products = [
  {
    id: 1,
    name: "Product A",
    price: 19.99,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    name: "Product B",
    price: 29.99,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 3,
    name: "Product C",
    price: 39.99,
    image: "https://via.placeholder.com/80",
  },
];

const PosOrder = () => {
  return (
    <div
      style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2 style={{ textAlign: "center" }}>Product List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              borderBottom: "1px solid #eee",
              background: "#fff",
              marginBottom: "8px",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: "8px",
                marginRight: "16px",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                {product.name}
              </div>
              <div style={{ color: "#888", marginTop: "4px" }}>
                ${product.price.toFixed(2)}
              </div>
            </div>
            <button
              style={{
                padding: "8px 16px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PosOrder;
