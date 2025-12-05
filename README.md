# Smart Shopper

Smart Shopper is an intelligent grocery list application designed to enhance your shopping experience. It helps you manage your grocery list, suggests re-purchases, offers healthier alternatives, and sends reminders for expiring items, all powered by AI.

## Features

- **Grocery List Management**: Easily add and remove items from your list
- **Persistent Storage**: Your grocery list and purchase history are saved in your browser's localStorage
- **AI-Powered Suggestions**:
  - Re-Purchase Suggestions based on your purchase history
  - Healthier Alternatives for items on your list
  - Expiry Reminders for items about to expire
- **Offline First**: The application is fully functional offline after the initial load

## Tech Stack

- **Frontend**: Next.js (React Framework)
- **UI**: ShadCN UI & Tailwind CSS
- **AI**: Genkit with Google's Gemini model
- **Icons**: Lucide React

## Prerequisites

- Node.js (v18 or later)
- npm (comes with Node.js)

Check if they are installed:
```bash
node -v
npm -v
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

1. Get a Gemini API Key from Google AI Studio
2. Create a `.env` file in the root directory
3. Add your API key:

```env
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### 3. Run the Application

Run both services in separate terminal windows:

**Terminal 1: Genkit AI Service**
```bash
npm run genkit:watch
```

**Terminal 2: Next.js Frontend**
```bash
npm run dev
```

The application will be available at `http://localhost:9002`

## Project Structure

- `src/app/` - Main pages and layout
- `src/components/` - React components
  - `grocery/` - Grocery app components
  - `ui/` - Reusable UI components
- `src/ai/` - AI-related code
  - `flows/` - Genkit flows
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and type definitions
  - `rules-engine.ts` - Rule-based engine with 550+ healthier alternatives, 150+ category associations, and 250+ expiry rules
  - `rules-storage.ts` - Rule storage management
- `public/` - Static assets
- `docs/` - Documentation files
