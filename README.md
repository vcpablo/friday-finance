# Friday Finance Fullstack Application

## Requirements
You'll need these in order to run this full project locally:

- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://www.docker.com/products/docker-desktop/)

## Preparation
Create an `.env` and add the content found on the `.env.default` file.
Update the values according to your local configuration

### Link environment variables
```
yarn db:generate
```

## Setup 

### Starting the database docker
```bash
cd friday-finance-be && docker-compose up -d
```

### Installing all dependencies

```bash
yarn install
```

When the root dependencies are all installed, the script will then install the dependencies for both the frontend and the backend projects

## Development Server

- Start the **frontend** development server on http://localhost:3000
- Start the **backend** development server on http://localhost:4000

```bash
yarn dev
```

## Frontend scripts

### Start only the frontend development server

```bash
yarn dev:fe
```

### Build the frontend for production

```bash
yarn build:fe
```

## Backend scripts

#### Start only the backend development server

```bash
yarn build:be
```

#### Migrate database (create tables structure)

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