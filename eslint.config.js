import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";


export default [

  // =========================
  // IGNORE
  // =========================

  {
    ignores: [
      "node_modules",
      "**/node_modules/**",
      "dist",
      "**/dist/**",
      ".vite",
      ".vercel",
      "coverage",
    ],
  },


  // =========================
  // FRONTEND REACT
  // =========================

  {
  files: [
    "client/src/**/*.{js,jsx}",
  ],


  languageOptions: {

    ecmaVersion: "latest",

    sourceType: "module",

    parserOptions: {
      ecmaFeatures:{
        jsx:true,
      },
    },


    globals:{
      ...globals.browser,
    },

  },


  plugins:{
    react,
    "react-hooks":reactHooks,
    "react-refresh":reactRefresh,
  },


  settings:{
    react:{
      version:"detect",
    },
  },


  rules:{


    ...js.configs.recommended.rules,


    ...react.configs.flat.recommended.rules,


    ...reactHooks.configs.recommended.rules,


    ...prettier.rules,


    // ======================
    // CUSTOM
    // ======================


    // matikan karena project JS modern
    "react/prop-types":"off",


    "no-unused-vars":[
      "warn",
      {
        argsIgnorePattern:"^_",
        varsIgnorePattern:"^_",
        ignoreRestSiblings:true,
      }
    ],


    "react-refresh/only-export-components":[
      "warn",
      {
        allowConstantExport:true,
      }
    ],


    "react/react-in-jsx-scope":"off",


  }

},





  // =========================
  // BACKEND NODE
  // =========================

  {

    files:[
      "server/**/*.js",
    ],


    languageOptions:{

      ecmaVersion:"latest",

      sourceType:"module",

      globals:{
        ...globals.node,
      },

    },


    rules:{


      ...js.configs.recommended.rules,


      "no-unused-vars":[
        "warn",
        {
          argsIgnorePattern:"^_",
          varsIgnorePattern:"^_",
        }
      ],


    },


  },

];