import { env } from "./env.js"
 
export const securityConfig = {

  sessionSecret:env.sessionSecret,
  adminUsername:env.adminUsername,
  adminPassword:env.adminPassword

};