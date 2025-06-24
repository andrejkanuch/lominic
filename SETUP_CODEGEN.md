# GraphQL Codegen Setup

This project uses GraphQL Codegen to generate type-safe resolvers and frontend hooks.

## Backend (NestJS API)

### Dependencies Added:
- `@graphql-codegen/cli`: 5.0.5
- `@graphql-codegen/typescript`: 4.1.5
- `@graphql-codegen/typescript-resolvers`: ^4.0.1
- `@graphql-codegen/typescript-operations`: 4.5.1
- `@graphql-codegen/typescript-react-apollo`: 4.3.2

### Configuration:
- `apps/api/codegen.yml` - Generates type-safe resolvers
- `apps/api/src/generated/graphql.ts` - Generated types and resolvers

### Scripts:
```bash
cd apps/api
pnpm codegen        # Generate types once
pnpm codegen:watch  # Watch for changes and regenerate
```

## Frontend (Next.js)

### Dependencies Added:
- `@apollo/client`: ^3.8.0
- `@graphql-codegen/cli`: 5.0.5
- `@graphql-codegen/typescript`: 4.1.5
- `@graphql-codegen/typescript-operations`: 4.5.1
- `@graphql-codegen/typescript-react-apollo`: 4.3.2

### Configuration:
- `apps/web/codegen.yml` - Generates Apollo Client hooks
- `apps/web/src/generated/graphql.ts` - Generated hooks and types
- `apps/web/src/graphql/` - GraphQL operation files

### Scripts:
```bash
cd apps/web
pnpm codegen        # Generate types once
pnpm codegen:watch  # Watch for changes and regenerate
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the API server to generate schema:**
   ```bash
   cd apps/api
   pnpm start:dev
   ```

3. **Generate types for backend:**
   ```bash
   cd apps/api
   pnpm codegen
   ```

4. **Generate types for frontend:**
   ```bash
   cd apps/web
   pnpm codegen
   ```

5. **Use generated hooks in components:**
   ```tsx
   import { useGetUsersQuery, useCreateUserMutation } from "@/generated/graphql";
   
   export function MyComponent() {
     const { data, loading, error } = useGetUsersQuery();
     const [createUser] = useCreateUserMutation();
     
     // Use the hooks...
   }
   ```

## Workspace Scripts

From the root directory:
```bash
pnpm codegen        # Run codegen for both apps
pnpm codegen:watch  # Watch mode for both apps
```

## File Structure

```
apps/
├── api/
│   ├── codegen.yml
│   ├── src/
│   │   ├── generated/graphql.ts (generated)
│   │   └── schema.gql (generated)
└── web/
    ├── codegen.yml
    ├── src/
    │   ├── generated/graphql.ts (generated)
    │   └── graphql/
    │       ├── users.graphql
    │       └── auth.graphql
```

## Features

- **Type-safe resolvers** in NestJS
- **Auto-generated Apollo Client hooks** for React
- **Real-time type generation** with watch mode
- **Workspace-level scripts** for easy management
- **Authentication support** with token handling 