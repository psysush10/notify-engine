import { tenantConfigs } from "../store/tenantStore.js";

export const getTenants =
 (req,res)=>{

  res.json(
   Object.keys(
     tenantConfigs
   ).map(
     tenantId => ({
       tenantId
     })
   )
  );
};

export const getTenantConfigApi = (req, res) => {

  const tenantId = req.tenantId;

  res.json(
    tenantConfigs[tenantId]
  );
};

export const updateTenantConfig = (
  req,
  res
) => {

  const tenantId = req.tenantId;

  tenantConfigs[tenantId] = {
    ...tenantConfigs[tenantId],
    ...req.body
  };

  res.json({
    message: "Config updated",
    config: tenantConfigs[tenantId]
  });
};