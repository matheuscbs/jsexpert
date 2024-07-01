import Util from "../../src/utils.js";

const serviceNameAnchor = "$$serviceName";
const repositoryNameAnchor = "$$repositoryName";

const serviceNameDepAnchor = "$$serviceNameDep";
const repositoryNameDepAnchor = "$$repositoryNameDep";

const componentNameAnchor = "$$componentName";

const template = `
import $$serviceName from "../services/$$serviceNameDep.js";
import $$repositoryName from "../repositories/$$repositoryNameDep.js";

export default class $$componentNameFactory {
  static getInstance() {
    const productRepository = new $$repositoryName();
    const productService = new $$serviceName(productRepository);
    return productService;
  }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
    .replaceAll(
      repositoryNameDepAnchor,
      Util.lowerCaseFirstLetter(repositoryName)
    )
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(
      repositoryNameAnchor,
      Util.upperCaseFirstLetter(repositoryName)
    );

  return {
    fileName: `${componentName}Factory`,
    template: txtFile,
  };
}
