import { env } from "./env.js"
 
export const securityConfig = {

  sessionSecret:env.sessionSecret,
  adminUsername:env.adminUsername,
  adminPassword:env.adminPassword

};

console.log(process.env.ADMIN_USERNAME);
console.log(process.env.ADMIN_PASSWORD);