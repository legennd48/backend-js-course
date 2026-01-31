/**
 * Week 11 Session 22: API Documentation
 * Swagger Configuration
 */

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

/**
 * Setup Swagger UI middleware
 * @param {Express} app - Express application
 * @param {string} path - Route path for docs (default: /api-docs)
 */
function setupSwagger(app, path = '/api-docs') {
  // Swagger UI options
  const options = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Documentation'
  };

  // Serve Swagger UI
  app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

  // Serve raw OpenAPI spec as JSON
  app.get(`${path}.json`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  console.log(`API documentation available at ${path}`);
}

module.exports = { setupSwagger, swaggerDocument };
