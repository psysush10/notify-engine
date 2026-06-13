export const retry = async (
  operation,
  retries = 3,
  delay = 1000
) => {

  for (let attempt = 1; attempt <= retries; attempt++) {

    try {

      console.log(
        `Attempt ${attempt} started`
      );

      return await operation();

    } catch (error) {

      console.log(
        `Attempt ${attempt} failed: ${error.message}`
        );

      if (attempt === retries) {
        throw error;
      }

      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );
    }
  }
};