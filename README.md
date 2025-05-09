# TimeTracker Frontend

This application serves as the frontend of my TimeTracker api (timetrackerbe).
The idea of the application is to track the amount of time the user spends on different activities
and get total and weekly statistics on time use.

## Setup

To run this app locally, you need to clone both this repo and the backend repo, **as well as setting
up your own MongoDB database** to handle saved activities and activity sessions.
The frontend is made with React + Typescript + Vite and the backend is a Spring Boot api.
**Start by setting up the backend and database,** then configure a few things in frontend:

Option 1: The fetch paths (in all pages and components) for running local are commented out and replaced
with production paths, **those all need to be swapped around,** OR:

Option 2: You can **create your own .env-file in the root folder with the correct variable to use current
fetch paths locally (.env content should be like <VITE_API_URL=http://localhost:8080>). The port needs
match the port configured in application.properties in the backend.**

When the backend is up and running with a database, type "npm run dev" into your IDE terminal to run
the frontend, then ctrl+click the link in the terminal to open it in your browser.

-------------------------------------------------------------------------------------------------------

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
