# Friday Finance Fullstack Application

## Setup 

Make sure to install the dependencies:

```bash
# yarn
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