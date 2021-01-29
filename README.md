# NodeJS, ExpressJS, GraphQL, PostgreSQL boilerplate server

## How to run the project

Install dependencies:

```shell
yarn install

# or using npm

npm install
```

We'll be using 2 databases one is for testing (test) and one is for development (dev)
Create `./ormconfig.json` and update file with your database credentials:

```json
// Development Databse
{
  "name": "dev",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "......", // Your DB username
  "password": ".......", // Your DB password
  "database": "..........", // Your DB name
  "synchronize": true,
  "dropSchema": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
```

Run the project:

```shell
yarn start

# or using npm

npm start
```

Open GraphiQL in your browser [http://localhost:4000](http://localhost:4000)

## Example Queries

Register Mutation:

```graphql
mutation {
  register(email: "xyz@xyz.com", password: "123asd123") {
    path
    message
  }
}
```

Login Mutation:

```graphql
mutation {
  login(email: "xyz@xyz.com", password: "123asd123") {
    path
    message
  }
}
```

Me Query (returns the current loged in user)

```GraphQL
query{
  me{
    id
    email
  }
}
```

Logout Mutation:

```graphql
mutation {
  logout
}
```
