import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "http://localhost:8000/swagger/json",
  output: {
    format: "prettier",
    path: "./src/@api/gen",
  },
  types: {
    dates: "types+transform",
    enums: "javascript",
  },
  plugins: ["@tanstack/react-query"],
});
