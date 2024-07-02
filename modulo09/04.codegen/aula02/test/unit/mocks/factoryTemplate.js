export default `
import ProductService from "../services/productService.js";
import ProductRepository from "../repositories/productRepository.js";

export default class ProductFactory {
  static getInstance() {
    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);
    return productService;
  }
}`;
