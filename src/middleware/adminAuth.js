import { ROLES } from "../constants/roles.js";
export const requireAdmin =(req,res,next) => {

  if (
    req.session?.isAdmin
  ) {
    req.role = ROLES.ADMIN;

    return next();

  }

  res.redirect(
    "/admin/login"
  );

};