# ⚙️ Setup

1. Install [NodeJS](https://nodejs.org/en/);
    > Require [Node.js](https://nodejs.org) version >= 16.12.0.
2. Install the NPM dependencies by running `npm ci`;

# 🧞 Commands

-   Run the local dev server at `localhost:3000`:
    ```
    npm run dev
    ```
-   Build your production site to `./dist/`:
    ```
    npm run build
    ```
-   Preview your build locally, before deploying:
    ```
    npm run preview
    ```
-   Run CLI commands like `astro add`, `astro check`:
    ```
    npm run astro ...
    ```
-   Check your JavaScript/TypeScript for errors and warnings:
    ```
    npm run lint:eslint
    ```
-   Check your CSS for errors and warnings:
    ```
    npm run lint:stylelint
    ```
-   Check your code formatting:
    ```
    npm run lint:prettier
    ```
-   Fix your code formatting:
    ```
    npm run lint:prettier:fix
    ```
-   Check your code all together:
    ```
    npm run lint
    ```
-   Install husky:
    ```
    npm run prepare
    ```
