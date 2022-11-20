## Description

FrostbyteData internal tool used as a generic project starter template with 
default configs and example resources.

Includes 
several pre-built pipes, guards, and decorators to help with api design, 
user access/roles, and request validation. 
Utilizes [typeorm](https://typeorm.io/), 
[dot env](https://github.com/motdotla/dotenv), 
auth flow with [PassportJS](https://www.passportjs.org/docs/),
code formatting with [Prettier](https://prettier.io/docs/en/index.html),
and of course is based on the [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
```

## Environment Setup

You should create some `.env` files in your project root that each contain your dev, stg, and prd values. 
See the file `.env-example` for an example of what values are required to be set.
```dotenv
JWT_SECRET=some_random_string_of_characters
JWT_EXPIRY=2h
ALLOWABLE_ORIGINS=['localhost:4200']
DATABASE_URL=postgres://username:password@salt.db.elephantsql.com/dbname
DATABASE_TYPE=mongodb
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=false
TYPEORM_ENTITIES=dist/entity/*.js
TYPEORM_ENTITIES_DIR=src/entity
TYPEORM_MIGRATIONS=dist/migration/*.js
TYPEORM_MIGRATIONS_DIR=src/migration
TYPEORM_SUBSCRIBERS=dist/subscriber/*.js
TYPEORM_SUBSCRIBERS_DIR=src/subscriber
TYPEORM_CONNECTION=postgres
TYPEORM_URL=postgres://username:password@salt.db.elephantsql.com/dbname
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Migrations

Make sure your first migration runs before attempting to continue generating migrations.

Use the following command to generate a new migration file after any change to entity structure:
```bash
$ npm run migrate:generate -- -n InitialMigration
```

Move up and down the migration history using the following commands:
```bash
$ npm run migrate:up
$ npm run migrate:down
```

Query command to reset `id` column for any table. `seq_name` can be found in the identity column definition for each table.
```genericsql
ALTER SEQUENCE [seq_name] RESTART WITH 1;
```


## Use an API Route

### Explain getting a JWT here....
### Explain adding JWT to requests here...


## Explain User roles

### Restricting use of a route to one or more roles
### Adding/Removing Roles
