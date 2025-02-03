# Autogenerated API's from OpenAPI schema

See [this](https://github.com/niraj-khatiwada/nestjs-starter-template) repo for backend setup.

### Steps

1. Point your OpenAPI schema.json file in `.env`

```
NEXT_PUBLIC_API_URL=http://localhost:8000/swagger/json
```

2. Generate the queries and schema

```
pnpm codegen
```
Your generated API will be available [here](./src/api/gen).
Now, you just import the queries/mutations in your [app](./src/app/page.tsx)

3. Start your server

```
pnpm dev
```
