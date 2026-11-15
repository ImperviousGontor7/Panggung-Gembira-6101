import { APP_ENV } from "./env.js";

const isProduction = APP_ENV.NODE_ENV === "production";

export const securityOptions = Object.freeze({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: {
    policy: "cross-origin",
  },
  dnsPrefetchControl: {
    allow: false,
  },
  frameguard: {
    action: "deny",
  },
  hidePoweredBy: true,
  hsts: isProduction
    ? {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      }
    : false,
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin",
  },
});

export default securityOptions;