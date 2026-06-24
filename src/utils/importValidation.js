export const validateCustomerRow =
  (row) => {

    const errors = [];

    if (
      !row.name ||
      row.name.trim() === ""
    ) {

      errors.push(
        "Name is required"
      );

    }

    if (
      !row.email ||
      row.email.trim() === ""
    ) {

      errors.push(
        "Email is required"
      );

    }

    if (
      row.email &&
      !row.email.includes("@")
    ) {

      errors.push(
        "Invalid email"
      );

    }

    return errors;

  };