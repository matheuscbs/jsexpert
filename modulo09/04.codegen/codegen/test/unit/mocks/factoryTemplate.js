export default `
import ProductService from "../service/productService.js";
import ProductRepository from "../repository/productRepository.js";

export default class ProductFactory {
  static getInstance() {
    const productRepository = new ProductRepository();
    const productService = new ProductService({ productRepository });
    return productService;
  }
}`;
