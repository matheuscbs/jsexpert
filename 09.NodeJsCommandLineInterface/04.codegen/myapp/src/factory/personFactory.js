
import PersonService from "../service/personService.js";
import PersonRepository from "../repository/personRepository.js";

export default class PersonFactory {
  static getInstance() {
    const productRepository = new PersonRepository();
    const productService = new PersonService({ productRepository });
    return productService;
  }
}