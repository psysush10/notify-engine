import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [

  "DATABASE_URL",

  "SESSION_SECRET",

  "ADMIN_USERNAME",

  "ADMIN_PASSWORD"

];

export const validateEnvironment =
() => {

  const missing =

    requiredEnvVars.filter(

      key => !process.env[key]

    );

  if (
    missing.length > 0
  ) {

    console.error(

      "Missing Environment Variables:",

      missing.join(", ")

    );

    process.exit(1);

  }

};

export const env = {

  get databaseUrl() {
    return process.env.DATABASE_URL;
  },

  get sessionSecret() {
    return process.env.SESSION_SECRET;
  },

  get adminUsername() {
    return process.env.ADMIN_USERNAME;
  },

  get adminPassword() {
    return process.env.ADMIN_PASSWORD;
  },

  get apiKeyExpiryDays() {
    return Number(
      process.env.API_KEY_EXPIRY_DAYS
    ) || 90;
  }

};