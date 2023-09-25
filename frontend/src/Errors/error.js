let validationErrors = {};

/*--------------------- PRODUCT DATA VALIDATION --------------------------------*/
export const validateProductdata = (
  productName,
  description,
  price,
  stock,
  category,
  imagesPreview
) => {
  if (productName === "") {
    validationErrors.productName = "Product name is required.";
  }
  if (description === "") {
    validationErrors.description = "Description is required.";
  }
  if (price === 0) {
    validationErrors.price = "Price is required";
  } else if (isNaN(price)) {
    validationErrors.price = "Price should be in numbers.";
  }
  if (stock === 0) {
    validationErrors.stock = "Stock is required";
  } else if (isNaN(stock)) {
    validationErrors.stock = "Stock should be in numbers.";
  }
  if (category === "") {
    validationErrors.category = "Product Category is required";
  }
  if (imagesPreview.length === 0) {
    validationErrors.imagesPreview = "Product Image is required";
  }

  return validationErrors;
};

/*--------------------- LOGIN DATA VALIDATION --------------------------------*/
export const loginDataValidation = (email, password) => {
  if (email === "") {
    validationErrors.email = "Email is required.";
  }

  if (password === "") {
    validationErrors.password = "Password is required.";
  }

  return validationErrors;
};

/*--------------------- ORDER DATA VALIDATION --------------------------------*/
export const orderDataValidation = (status) => {
  if (status === "") {
    validationErrors.status = "Order status is required.";
  }
  return validationErrors;
};
/*--------------------- USER DATA VALIDATION --------------------------------*/
export const userDataValidation = (userName, email, role) => {
  if (userName === "") {
    validationErrors.name = "User name is required.";
  }
  if (email === "") {
    validationErrors.email = "Email is required.";
  }
  if (role === "") {
    validationErrors.role = "User role is required.";
  }

  return validationErrors;
};
