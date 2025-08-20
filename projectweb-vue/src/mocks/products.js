import Mock from "mockjs";
import products from "@/mocks/data/products.json";

Mock.mock("/api/products", "get", () => {
  return {
    code: 200,
    message: "success",
    data: products,
  };
});

Mock.mock(/\/api\/products\/\d+/, "get", (options) => {
  // extract the ID from the URL
  const idMatch = options.url.match(/\/api\/products\/(\d+)/);
  const id = idMatch ? parseInt(idMatch[1], 10) : null;

  // find product inside nutrition array
  const product = products.nutrition.find((p) => p.id === id);

  if (product) {
    return {
      code: 200,
      message: "success",
      data: product,
    };
  } else {
    return {
      code: 404,
      message: "Product not found",
    };
  }
});
