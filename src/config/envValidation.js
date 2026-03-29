// AK - 30/Mar/2026: Simple env validation to make sure we have what we need to run
export const validateEnvironment = () => {
  const errors = [];
  const warnings = [];

  // AK - 30/Mar/2026: Check for email config if we want email to work
  if (!process.env.EMAIL_USER) {
    warnings.push("EMAIL_USER not set - email notifications will fail");
  }
  if (!process.env.EMAIL_PASS) {
    warnings.push("EMAIL_PASS not set - email notifications will fail");
  }

  // AK - 30/Mar/2026: Webhook URL is optional but nice to have
  if (!process.env.WEBHOOK_URL) {
    warnings.push("WEBHOOK_URL not set - webhook notifications will fail");
  }

  // AK - 30/Mar/2026: Check for tenant Slack configs
  if (!process.env.SLACK_WEBHOOK_ORG_1) {
    warnings.push("SLACK_WEBHOOK_ORG_1 not set - Slack notifications will fail for org_1");
  }

  // AK - 30/Mar/2026: Port should be a valid number
  const port = process.env.PORT;
  if (port && isNaN(parseInt(port))) {
    errors.push("PORT must be a valid number");
  }

  // AK - 30/Mar/2026: Warn if no API key is set (will use default)
  if (!process.env.API_KEY) {
    warnings.push("API_KEY not set - using default key (not secure for production)");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// AK - 30/Mar/2026: Helper to log validation results in a readable way
export const logEnvironmentStatus = () => {
  const validation = validateEnvironment();
  
  console.log("🔧 Environment Validation:");
  
  if (validation.errors.length > 0) {
    console.error("❌ ERRORS:");
    validation.errors.forEach(error => console.error(`  - ${error}`));
  }
  
  if (validation.warnings.length > 0) {
    console.warn("⚠️  WARNINGS:");
    validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
  
  if (validation.errors.length === 0 && validation.warnings.length === 0) {
    console.log("✅ All environment variables look good!");
  }
  
  return validation.isValid;
};