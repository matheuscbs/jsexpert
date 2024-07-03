/*
ProductId: should be between 2 and 20 characters
Name: should be only words
Price: should be from zero to a thousand
Category: should be electronic or organic
*/

function productValidator(product) {
  const errors = [];

  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    errors.push(`ProductId: should be between 2 and 20 characters`);
  }

  if (!/^[a-zA-Z ]+$/.test(product.name)) {
    errors.push(`Name: should be only words`);
  }

  if (!(product.price >= 0 && product.price <= 1000)) {
    errors.push(`Price: should be from zero to a thousand`);
  }

  if (!["electronic", "organic"].includes(product.category)) {
    errors.push(`Category: should be electronic or organic`);
  }

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { productValidator };
