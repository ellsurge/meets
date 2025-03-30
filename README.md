# Meets Platform

## Tech Stack

### Frontend
- **React Native**: Cross-platform mobile app development.
- **Expo**: Simplified development and deployment.
- **Tamagui**: UI framework for consistent and performant design.
- **React Query**: Data fetching and state management.
- **tRPC**: Type-safe API integration.

### Backend
- **Fastly**: Backend runtime.
- **tRPC**: End-to-end type safety.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/meets.git
   cd meets
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the backend:
   ```sh
   cd backend
   npm install
   ```
4. Set up the database and start the backend server.
5. Start the frontend:
   ```sh
   cd frontend
   expo start
   ```

## Usage
- Open the Expo app on your mobile device or use an emulator.
- Scan the QR code displayed in the terminal or browser.
- Start creating and managing events!

## Environment Variables
Create a `.env` file in the backend directory with the necessary variables.

For the frontend, configure the backend URL in `utils/trpc.ts`.

## Contributing
We welcome contributions!

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```sh
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

