import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { APP_ENV } from "./env.js";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Impervious Web API",
    version: "1.0.0",
    description: " API documentation for the Impervious Web platform.",
  },
  servers: [
    {
      url: APP_ENV.API_URL || "http://localhost:5001/api",
      description: " API server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    responses: {
      Unauthorized: {
        description: " Authentication required.",
      },
      Forbidden: {
        description: " User does not have permission.",
      },
      NotFound: {
        description: " Requested resource was not found.",
      },
      ValidationError: {
        description: " Request validation failed.",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: [
    "./server/api/**/*.js",
    "./server/auth/**/*.js",
    "./server/routes/**/*.js",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: "Impervious Web API Docs",
    })
  );

  app.get("/api-docs.json", (req, res) => {
    res.json(swaggerSpec);
  });

  return app;
}

export default swaggerSpec;