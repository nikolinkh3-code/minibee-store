import { useEffect, useState } from "react";
import baseProducts from "./products";

// Google Sheet > File > Share > Publish to web > CSV — paste that link here
export const SHEET_CSV_URL = "";

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

const toImage = (value) => {
  const v = value.trim();
  if (!v) return "";
  if (v.startsWith("http") || v.startsWith("/")) return v;
  return `/products/${v}`;
};

const splitList = (value) =>
  (value || "")
    .split(/[|\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

function rowsToProducts(rows) {
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (row, name) => {
    const idx = header.indexOf(name);
    return idx === -1 ? "" : (row[idx] || "").trim();
  };

  return rows
    .slice(1)
    .filter((row) => col(row, "name"))
    .map((row, i) => {
      const images = splitList(col(row, "images")).map(toImage).filter(Boolean);
      const sizes = col(row, "sizes")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const availableText = col(row, "available").toLowerCase();

      return {
        id: `sheet-${i + 1}`,
        name: col(row, "name"),
        category: col(row, "category") || "Accessories",
        price: Number(col(row, "price").replace(/[^0-9.]/g, "")) || 0,
        image: images[0] || "",
        images,
        description: col(row, "description"),
        available: ["yes", "y", "true", "stock", "in stock"].includes(availableText),
        ...(sizes.length ? { sizes } : {}),
      };
    });
}

export default function useProducts() {
  const [products, setProducts] = useState(baseProducts);

  useEffect(() => {
    if (!SHEET_CSV_URL) return;
    let cancelled = false;

    fetch(SHEET_CSV_URL)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        const sheetProducts = rowsToProducts(parseCSV(text));
        setProducts([...sheetProducts, ...baseProducts]);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return products;
}
