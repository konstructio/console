# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

K1-Console is the Kubefirst Frontend application that displays all Kubefirst installed services in a single interface. It's built with Next.js, React, TypeScript, and Redux Toolkit.

## Common Development Commands

### Development
```bash
yarn install              # Install dependencies
yarn dev                  # Start development server on localhost:3000
yarn check-types          # Run TypeScript type checking
```

### Testing
```bash
yarn test                 # Run tests in silent mode
yarn test:watch           # Run tests in watch mode
yarn test:coverage        # Run tests with coverage report
yarn test:coverage:watch  # Run tests with coverage in watch mode
```

### Code Quality
```bash
yarn lint                 # Run ESLint checks
yarn lint:fix             # Auto-fix ESLint issues
yarn format               # Format code with Prettier
```

### Building & Production
```bash
yarn build                # Build for production
yarn start                # Start production server
```

### Storybook
```bash
yarn storybook            # Start Storybook development server on port 6006
yarn build-storybook      # Build Storybook static files
yarn storybook-production # Run production Storybook server
```

### End-to-End Testing
```bash
yarn cypress:open         # Open Cypress test runner
```

## Code Architecture

### Directory Structure

- **`app/`** - Next.js App Router pages and layouts
  - Contains main layout, providers, and styled-components setup
  
- **`components/`** - Reusable UI components
  - Each component has its own folder with `.tsx`, `.styled.ts`, `.stories.tsx`, and optional `__tests__` files
  - Controlled form field components are in `controlledFields/`
  
- **`containers/`** - Complex UI containers that combine multiple components
  - `ClusterForms/` - Forms for cluster creation and management
  - `TerminalLogs/` - Terminal output display components
  
- **`redux/`** - State management using Redux Toolkit
  - `slices/` - Redux slices for different features (api, config, installation, etc.)
  - `thunks/` - Async actions
  - `selectors/` - State selectors
  
- **`hooks/`** - Custom React hooks
  - `useConfig/` - Configuration context and provider
  - `useQueue/` - Queue management for async operations
  
- **`services/`** - External service integrations
  - GitHub, GitLab, DigitalOcean API clients
  - Stream service for real-time logs
  
- **`pages/api/`** - Next.js API routes
  - Proxy endpoints, health checks, and streaming endpoints
  
- **`types/`** - TypeScript type definitions organized by feature

### Key Technologies & Patterns

1. **Next.js 13** with App Router
2. **Redux Toolkit** for state management with `redux-persist`
3. **Styled Components** for styling
4. **React Hook Form** for form management
5. **Material-UI (MUI)** components
6. **TypeScript** with strict mode enabled
7. **Jest** and **React Testing Library** for unit tests
8. **Storybook** for component documentation
9. **Cypress** for E2E testing

### API Integration

The app communicates with the [kubefirst-api](https://github.com/konstructio/kubefirst-api) backend (configured via `API_URL` environment variable). Key endpoints:
- Cluster management
- Git provider authentication
- Cloud provider integration
- Real-time log streaming

The frontend acts as a UI layer for the kubefirst-api, providing a web interface for Kubefirst's cluster provisioning and management capabilities.

### Environment Configuration

Create a `.env` file in the root directory. The app supports:
- Local installation mode: `API_URL=http://localhost:8081`
- Cluster installation mode: Configure appropriate cluster endpoints

### Node Version

Requires Node.js >= 18 (managed via Volta: Node 18.18.0, Yarn 1.22.19)