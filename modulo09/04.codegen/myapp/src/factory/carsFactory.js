
import CarsService from "../service/carsService.js";
import CarsRepository from "../repository/carsRepository.js";

export default class CarsFactory {
  static getInstance() {
    const productRepository = new CarsRepository();
    const productService = new CarsService({ productRepository });
    return productService;
  }
}