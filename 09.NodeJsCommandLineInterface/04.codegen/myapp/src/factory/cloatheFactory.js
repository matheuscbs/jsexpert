
import CloatheService from "../service/cloatheService.js";
import CloatheRepository from "../repository/cloatheRepository.js";

export default class CloatheFactory {
  static getInstance() {
    const productRepository = new CloatheRepository();
    const productService = new CloatheService({ productRepository });
    return productService;
  }
}