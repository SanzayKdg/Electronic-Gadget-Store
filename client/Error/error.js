let validationErrors = {};

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

/*--------------------- LOGIN DATA VALIDATION --------------------------------*/
export const userDataValidation = (name, email, contact, password, avatar) => {
  if (name === "") {
    validationErrors.name = "Name is required.";
  }
  if (email === "") {
    validationErrors.email = "Email is required.";
  }
  if (contact.length === 0) {
    validationErrors.contact = "Contact is required";
  } else if (isNaN(contact)) {
    validationErrors.contact = "Contact should be in numbers.";
  }
  if (password === "") {
    validationErrors.password = "Password is required.";
  }
  if (avatar === "") {
    validationErrors.avatar = "Profile Image is required.";
  }

  return validationErrors;
};
