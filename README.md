# Smart Shopper

Smart Shopper is an intelligent grocery list application designed to enhance your shopping experience. It helps you manage your grocery list, suggests re-purchases, offers healthier alternatives, and sends reminders for expiring items, all powered by AI.

## Features

- **Grocery List Management**: Easily add and remove items from your list.
- **Persistent Storage**: Your grocery list and purchase history are saved in your browser's `localStorage`, so your data is safe even after a refresh.
- **AI-Powered Suggestions**:
  - **Re-Purchase Suggestions**: Get reminders for items you've bought before but aren't on your current list.
  - **Healthier Alternatives**: Receive recommendations for healthier substitutes for items on your list.
  - **Expiry Reminders**: Get notified about items that are about to expire or have already expired.
- **Offline First**: The application is fully functional offline after the initial load.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **UI**: [ShadCN UI](https://ui.shadcn.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini model
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Prerequisites

Before you begin, ensure you have the following installed on your Ubuntu machine:
- [Node.js](https://nodejs.org/) (v18 or later is recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

You can check if they are installed by running:
```bash
node -v
npm -v
```

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Install Dependencies

Navigate to your project directory and install the required packages using npm:

```bash
npm install
```

### 2. Set Up Environment Variables

This project uses the Google Gemini API to power its AI features. You will need an API key to run the application.

1.  **Get a Gemini API Key**:
    - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Click **"Create API key in new project"**.
    - Copy the generated API key.

2.  **Create an Environment File**:
    - In the root of your project, create a new file named `.env`.
    - Add your Gemini API key to this file:

    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    Replace `YOUR_API_KEY_HERE` with the key you copied.

### 3. Run the Application

This project consists of two main parts: the Next.js frontend application and the Genkit AI flows. You'll need to run both concurrently in separate terminal windows.

**Terminal 1: Run the Genkit AI Service**

The Genkit service runs the AI flows that provide intelligent suggestions.

```bash
npm run genkit:watch
```
This command starts the Genkit development server and will automatically restart it when you make changes to the AI flow files (in `src/ai/flows/`).

**Terminal 2: Run the Next.js Frontend**

This command starts the Next.js development server for the user interface.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## Project Structure

- `src/app/`: Contains the main pages and layout of the Next.js application.
- `src/components/`: Contains all the React components, organized by feature.
  - `src/components/grocery/`: Components specific to the Grocery App.
  - `src/components/ui/`: Reusable UI components from ShadCN.
- `src/ai/`: Contains all the AI-related code.
  - `src/ai/flows/`: Genkit flows that define the AI agent's behavior.
- `src/hooks/`: Custom React hooks, like `useGroceryData` for managing `localStorage`.
- `src/lib/`: Contains utility functions, server actions, and type definitions.
  - `src/lib/rules-engine.ts`: Core rule-based engine with 550+ healthier alternatives, 150+ category associations, and 250+ expiry rules.
  - `src/lib/rules-storage.ts`: Manages rule storage and customization.
- `public/`: Static assets.
- `docs/`: Documentation files including application flow diagrams.

## Application Flow Diagrams

For detailed visualizations of the application architecture and data flow, see:
- [Complete Application Flow Diagrams](./docs/application-flow-diagram.md) - Comprehensive Mermaid diagrams showing:
  - System Architecture
  - Detailed Process Flow
  - Rule-Based Decision Flow
  - Data Flow Diagram
  - Component Interaction Diagram
