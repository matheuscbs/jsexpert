
import AirplaneService from "../service/airplaneService.js";
import AirplaneRepository from "../repository/airplaneRepository.js";

export default class AirplaneFactory {
  static getInstance() {
    const productRepository = new AirplaneRepository();
    const productService = new AirplaneService({ productRepository });
    return productService;
  }
}