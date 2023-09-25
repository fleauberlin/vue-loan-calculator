# vue-loan-calculator
Submitted by Florian Hollm - florian.hollm@googlemail.com

## Setting up environment variables
1. Rename `.env.example` to `.env`
2. Replace `https://example.com` with your api url in the `.env` file.

If your GraphQL path is for example `/q`, please make sure to include `/q/` in the environment variable.

Note: Make sure your frontend has access to the backend resource by either setting your hosts accordingly, setting up a proxy or disabling cors in your browser.

## Install dependencies
Note: Both yarn and npm were tested as package managers.

Run `yarn install` or `npm install` in the root directory.

### Run in development
1. Run `yarn dev` or `npm run dev` in the root directory.
2. The application should open automatically. If this is not the case, visit `http://localhost:3000` in your browser.

### Build and run in production
1. Run `yarn build` or `npm run build` in the root directory.
2. Run `yarn preview` or `npm run preview` to open the local build.
3. The application should open automatically. If this is not the case, visit `http://localhost:3001` in your browser.

### Run Unit Tests with [Vitest](https://vitest.dev/)
Run `yarn test:unit` or `npm run test:unit` in the root directory.
