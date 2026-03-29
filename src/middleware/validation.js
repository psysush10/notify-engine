// AK - 30/Mar/2026: Simple validation middleware to check if incoming events have all required fields
export const validateEvent = (req, res, next) => {
  const { tenantId, type, project, severity } = req.body;

  // AK - 30/Mar/2026: Make sure we have the basic required fields, nothing fancy
  if (!tenantId || !type || !project || !severity) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["tenantId", "type", "project", "severity"],
      received: req.body
    });
  }

  // AK - 30/Mar/2026: Check if tenantId looks reasonable (basic string validation)
  if (typeof tenantId !== 'string' || tenantId.trim().length === 0) {
    return res.status(400).json({
      error: "tenantId must be a non-empty string"
    });
  }

  // AK - 30/Mar/2026: Severity should be one of our predefined levels
  const validSeverities = ['low', 'medium', 'high', 'critical'];
  if (!validSeverities.includes(severity.toLowerCase())) {
    return res.status(400).json({
      error: "Invalid severity level",
      allowed: validSeverities,
      received: severity
    });
  }

  // AK - 30/Mar/2026: If email is provided, do a basic email format check
  if (req.body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        error: "Invalid email format",
        received: req.body.email
      });
    }
  }

  // AK - 30/Mar/2026: Clean up the data a bit before passing it along
  req.body.tenantId = tenantId.trim();
  req.body.type = type.trim();
  req.body.project = project.trim();
  req.body.severity = severity.toLowerCase();

  next();
};