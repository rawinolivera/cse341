const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Contacs",
    description: "Rawin's Contacts",
  },
  host: "cse341-848t.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);