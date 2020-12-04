imports: [
    TypeOrmModule.forRoot({
       "name": "development",
       "type": "postgres",
       "host": "localhost",
       "port": 5432,
       "username": "postgres",
       "password": "rootadmin",
       "database": "graphql-server-boilerplate",
       "synchronize": true ,
       "logging": true,
       "entities": [
          "src/entity/**/*.ts"
       ],
       "migrations": [
          "src/migration/**/*.ts"
       ],
       "subscribers": [
          "src/subscriber/**/*.ts"
       ],
       "cli": {
          "entitiesDir": "src/entity",
          "migrationsDir": "src/migration",
          "subscribersDir": "src/subscriber"
       }
    }),
    TypeOrmModule.forRoot({
       "name": "test",
       "type": "postgres",
       "host": "localhost",
       "port": 5432,
       "username": "postgres",
       "password": "rootadmin",
       "database": "graphql-server-boilerplate-test",
       "synchronize": true,
       "dropSchema": true,
       "logging": true,
       "entities": [
          "src/entity/**/*.ts"
       ],
       "migrations": [
          "src/migration/**/*.ts"
       ],
       "subscribers": [
          "src/subscriber/**/*.ts"
       ],
       "cli": {
          "entitiesDir": "src/entity",
          "migrationsDir": "src/migration",
          "subscribersDir": "src/subscriber"
       }
    })
 ]