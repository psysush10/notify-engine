export const generateTenantId = () => {
  return `org_${Date.now()}`;
};

export const generateApiKey = () => {
  return `ntf_${Math.random()
    .toString(36)
    .substring(2, 15)}`;
};