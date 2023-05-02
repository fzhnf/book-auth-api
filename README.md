# (WIP) book auth api using nextjs + prisma + mysql + joi + bcrypt + jsonwebtoken

[1]convert libs/prismadb from .ts to .js

[2]customizing services/userService - "add _newEmail" (Currently Not Working)

[3]add services/tokenService

## schema.prisma
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(nanoid())
  username     String   @unique
  email        String   @unique
  password     String
  photoProfile String?
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt

  book Book[]
}

model Book {
  id          Int      @id @default(autoincrement())
  title       String
  year        Int
  author      String
  readPage    Int
  pageCount   Int
  finished    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user_id     String
  description String?

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```


## file-tree
```
└───src
    ├───app
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.js
    │   │   page.js
    │   │
    │   └───api
    │       ├───books
    │       │   │   route.js
    │       │   │
    │       │   └───[id]
    │       │           route.js
    │       │
    │       ├───login
    │       │       route.js
    │       │
    │       ├───me
    │       │       route.js
    │       │
    │       └───register
    │               route.js
    │
    └───backend
        ├───errors
        │       AuthenticationError.js
        │       AuthorizationError.js
        │       ClientError.js
        │       InvariantError.js
        │       NotFoundError.js
        │
        ├───libs
        │       jsonwebtoken.js
        │       prismadb.js
        │
        ├───services
        │       bookService.js
        │       userService.js
        │
        ├───utils
        │       errorHandler.js
        │       getTokenHandler.js
        │
        └───validators
                bookValidator.js
                loginValidator.js
                registerValidator.js

```
