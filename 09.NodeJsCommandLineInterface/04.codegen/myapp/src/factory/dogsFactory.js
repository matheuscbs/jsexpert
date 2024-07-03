
import DogsService from "../service/dogsService.js";
import DogsRepository from "../repository/dogsRepository.js";

export default class DogsFactory {
  static getInstance() {
    const productRepository = new DogsRepository();
    const productService = new DogsService({ productRepository });
    return productService;
  }
}