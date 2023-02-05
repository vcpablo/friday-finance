# Friday Finance Backend

## Preparation
Create an `.env` and add the content found on the `.env.default` file.
Update the values according to your local configuration

## Setup 

### Starting the database docker
```bash
docker-compose up -d
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Database

### Migrate database (create tables structure)

```bash
yarn db:migrate
```

### Seed database (feed database with example values)

```bash
yarn db:seed
```

### Reset database

```bash
yarn db:reset
```

## Development Server

Start the development server on http://localhost:4000

```bash
yarn dev
```

## Lint (look for and fix linting errors and format code)

```bash
yarn lint
```
