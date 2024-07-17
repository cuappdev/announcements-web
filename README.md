# Announcements

Announcements is AppDev's generalized system for scheduling one-time marketing blasts to any of our applications. Built with React using Next.js and Tailwind CSS.

## Getting Started

1. Duplicate the `.envtemplate` file, rename it to `.env.local`, and fill out the environment variables.
2. Yarn is required for this project. If you do not have Yarn installed, run `npm install --global yarn` to install it.
3. If using VSCode, install the Prettier extension and configure your settings to use it.

## Running the Server

Run the development server with `yarn dev`. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run a production build, use `yarn build` folowed by `yarn start`.

To clear the cache, delete the auto-generated `.next` folder.

## Project Structure

This project uses App Router by Next.js which uses a file-based routing system within the `app` directory. Routes can be created by making new directories inside of the `app` folder with a `page.tsx` file.

- **public**: Houses static assets like images and fonts. Files here are accessible directly from the root of the web server.

- **src**: Where the main source code resides.
  - **app**: Used with Next.js's App Router, containing the application's layouts, pages, and potentially other components.
  - **components**: Reusable UI elements are typically stored here. These are the building blocks of the application's visual interface.
  - **icons**: Contains SVG files used as icons throughout the app.
  - **models**: Contains TypeScript interfaces, types, and other data structures to represent data models.
  - **services**: Houses code that interacts with external APIs or handles business logic related to data fetching, manipulation, or other asynchronous operations.
  - **stores**: Stores global state management logic with Zustand.
  - **utils**: General-purpose utility functions, helper code, and constants that can be reused across different parts of the application.

## Libraries

Zustand is used for global client-side state management. For global server-side state management, used TanStack Query. API calls should be made with Axios.
