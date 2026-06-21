import { tenantConfigs, TENANT_FILE } from "../store/tenantStore.js";
import {
  createTenantService,
  getAllTenantsService,
  getTenantConfigService,
  updateTenantConfigService,
  updatePlanService
} from "../services/tenantService.js";

import {
 apiKeys,
 API_KEY_FILE
}
from "../store/apiKeyStore.js";

export const createTenant =  async (req, res) => {

    const tenantName =
      req.body.tenantName;

    if (!tenantName) {
      return res.status(400).json({
        message:
          "tenantName required"
      });
    }

    const result = await createTenantService(tenantName);

    res.status(201).json({
      result
    });
  };

export const getTenants = (req,res)=>{

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

export const getAllTenantsDbApi = async (req,res)=>{

 const tenants =
  await getAllTenantsService();

 res.json(tenants);
};

export const getTenantConfigApi = async (req, res) => {
  const tenantId = req.tenantId;
  const config = await getTenantConfigService(tenantId);

  if(!config){
    return res.status(404).json({
      message:
      "Config not found"
    });
  }

  res.json(
    config
  );
};

export const updateTenantConfig = async (
  req,
  res
) => {

  const tenantId = req.tenantId;

  console.log(req.body);

  const updatedConfig = await updateTenantConfigService(
    tenantId,
    req.body
  );

  res.json({
    message: "Config updated",
    config: updatedConfig
  });
};

export const updatePlan = async (
  req,
  res
) => {

  const tenantId =
    req.tenantId;

  const {
    plan
  } = req.body;

  const tenant =
    await updatePlanService(
      tenantId,
      plan
    );

  res.json(
    tenant
  );
};