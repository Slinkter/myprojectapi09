# FoodRecipe (API09) - Refactored

This document provides a comprehensive overview of the FoodRecipe project, a Single Page Application (SPA) for searching and managing kitchen recipes, built with React and Tailwind CSS. This version has been refactored to follow Clean Architecture and Clean Code principles.

## 📚 Table of Contents

- [Diagnosis Report (Technical Debt)](#-diagnosis-report-technical-debt)
- [Applied Architecture](#-applied-architecture)
- [Installation and Setup](#-installation-and-setup)
- [Technology Stack](#-technology-stack)
- [Documentation Index](#-documentation-index)

---

## 🧐 Diagnosis Report (Technical Debt)

The following critical technical debt findings were identified and addressed during the refactoring process:

1.  **Monolithic `GlobalState` Component:** The original `GlobalState` component violated the Single Responsibility Principle (SRP) by managing search, favorites, side effects (localStorage), API calls, and navigation.
    -   **Solution:** The component was broken down into smaller, more focused custom hooks (`useFavorites` and `useSearch`).

2.  **Logic Coupled with View:** Components like `Home` were tightly coupled with the `GlobalContext`, making them less reusable and difficult to test in isolation.
    -   **Solution:** Business logic was extracted into custom hooks, and components now consume state and actions from the context, which is a much cleaner approach.

3.  **No Custom Hooks:** The project lacked custom hooks, which led to duplicated logic and poor separation of concerns.
    -   **Solution:** Created `useFavorites.js` and `useSearch.js` to encapsulate reusable logic.

4.  **Implicit Prop Drilling:** The "catch-all" `GlobalContext` could lead to components consuming more state than necessary, causing unnecessary re-renders.
    -   **Solution:** By separating concerns into different hooks, the data flow is now more explicit and easier to trace.

5.  **Lack of Typing:** The project used `PropTypes`, but could be improved with TypeScript for stronger type safety.
    -   **Solution:** While TypeScript was not added in this refactoring, the new architecture makes it easier to introduce it in the future.

---

## 🏛️ Applied Architecture

The refactored project now follows a **Clean Architecture** approach, emphasizing the **separation of concerns** and **reusability**.

### Key Patterns and Principles:

-   **Custom Hooks:** Business logic is encapsulated in custom hooks (`useFavorites`, `useSearch`), making it reusable and independent of the UI.
-   **Context API as a Composition Layer:** The `GlobalState` provider now acts as a clean composition layer, integrating the different hooks and providing them to the component tree.
-   **Single Responsibility Principle (SRP):** Each component and hook now has a single, well-defined responsibility.
-   **Separation of Concerns:**
    -   **State Management:** Handled by custom hooks (`useFavorites`, `useSearch`).
    -   **API Interaction:** Managed within the `useSearch` hook, which calls the `fetchRecipes` function.
    -   **UI Components:** Focused solely on presentation.

### Folder Structure:

The most relevant parts of the new structure are:

```
src/
├── hooks/
│   ├── useFavorites.js  # Manages favorites state and localStorage
│   └── useSearch.js     # Manages search state, API calls, and localStorage
├── context/
│   ├── context.js       # The React context object
│   └── index.jsx        # The GlobalState provider, now a composition layer
├── pages/
│   └── ...              # Page components (Home, Favorites, etc.)
└── components/
    └── ...              # Reusable UI components
```

---

## 🚀 Installation and Setup

To get started with the project, follow these steps:

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run dev

# Build for production
pnpm run build
```

**Note:** This project uses `pnpm` as the package manager.

---

## 🛠️ Technology Stack

-   **Core:** React 18, Vite
-   **Styling:** Tailwind CSS 3
-   **State Management:** React Context API with Custom Hooks
-   **Routing:** React Router DOM 6
-   **Data:** Forkify API

---

## 📚 Documentation Index

The original documentation is still relevant and can be found in the `src/docs` directory:

-   [**1. Scope and Vision**](src/docs/01_alcance/PROJECT_OVERVIEW.md)
-   [**2. Requirements**](src/docs/02_requerimientos/REQUIREMENTS.md)
-   [**3. Architecture and Design**](src/docs/03_arquitectura/ARCHITECTURE.md)
-   [**4. Development and Implementation**](src/docs/04_desarrollo/DEVELOPMENT_GUIDE.md)
-   [**5. Quality and Deployment**](src/docs/05_despliegue/DEPLOYMENT.md)
-   [**6. Maintenance**](src/docs/06_mantenimiento/MAINTENANCE.md)