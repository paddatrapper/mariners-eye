# Mariner's Eye

## ✨ Features

## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

### Testing

Unit tests are implemented in Vitest. Running in development will cause vitest
to watch for changes and rerun the tests each time:

```bash
yarn test:unit
```

Type checking and linting are available:

```bash
yarn type-check
yarn lint
```

### Building for Production

To build your project for production, use:

```bash
yarn build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.
