import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import cypressPlugin from 'eslint-plugin-cypress';
import eslintConfigPrettier from 'eslint-config-prettier';

const ALIAS_PATHS = [
  '@',
  '@assets',
  '@components',
  '@widgets',
  '@utils',
  '@hooks',
  '@store',
  '@api',
  '@domain',
  '@layouts',
  '@router',
  '@public',
];

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: [
      "**/*.config.{js,ts}",
      "**/*.d.ts",
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**",
      "**/.next/**",
      "**/public/**",
      "**/coverage/**",
      "**/storybook-static/**",
      "**/stories/**",
      "**/*.{img,png,svg,woff,woff2,ttf,ico,pdf,xml}",
      "**/public/**"
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig-eslint.json'],
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        browser: true,
        node: true,
        'cypress/globals': true
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      cypress: cypressPlugin
    },
    settings: {
      react: { 
        version: 'detect' 
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            './tsconfig.json',
            './tsconfig-eslint.json',
            './packages/*/tsconfig.json',
            './packages/apps/*/tsconfig.json'
          ]
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss']
        }
      }
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
            parameterProperties: 'explicit'
          }
        }
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports'
      }],
      '@typescript-eslint/no-var-requires': 'error',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-filename-extension': ['error', { 
        extensions: ['.tsx', '.jsx'] 
      }],

      // Imports
      'import/extensions': ['error', 'never', {
        'css': 'always',
        'scss': 'always',
        'json': 'always'
      }],
      'import/no-unresolved': ['error', {
        ignore: [
          '\\.css$',
          '\\.scss$',
          '\\.svg$',
          '\\.png$',
          '\\.jpg$',
          '\\.jpeg$',
          '\\.gif$',
          '\\.ico$',
          '\\.webp$',
          '^@audiostore/.*',
          '^@mf-types/.*',
          'photoswipe/.*'
        ]
      }],
      // Enforce using aliases
      'no-restricted-imports': ['warn', {
        patterns: [
          {
            group: ['./src/*', '../src/*', '../../src/*'],
            message: 'Please use aliases (@) instead of relative paths from src'
          },
          {
            group: ['src/*'],
            message: 'Please use aliases (@) instead of absolute paths from src'
          }
        ]
      }],
      'import/order': ['warn', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: ALIAS_PATHS.map((alias) => ({
          pattern: `${alias}/**`,
          group: 'internal',
          position: 'before'
        })),
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }],

      // General
      'no-console': ['warn', { 
        allow: ['warn', 'error'] 
      }],
      'max-len': ['error', { 
        code: 150,
        ignorePattern: 'd="([\\s\\S]*?)"',
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }],
      'prettier/prettier': ['error', {
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'none',
        tabWidth: 2,
        semi: true
      }]
    }
  },

  // Cypress configuration
  {
    files: ['cypress/**/*.{js,ts,jsx,tsx}'],
    ...cypressPlugin.configs.recommended,
    rules: {
      'cypress/no-unnecessary-waiting': 'warn',
      '@typescript-eslint/no-namespace': 'off'
    }
  },

  // Test configuration
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': 'off'
    }
  },

  // JavaScript files configuration
  {
    files: ['**/*.{js,mjs}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off'
    }
  },

  // Prettier conflict resolution
  eslintConfigPrettier
];
