# Food Delivery Mobile App

A modern food delivery mobile application built with **React Native**, **Node.js**, **Express.js**, **Supabase**, and **Redux**. The project is designed to provide customers with a smooth mobile experience for discovering food, managing their cart, and placing orders.

## Features

- **Food browsing:** Explore available food items and menus.
- **Category filtering:** Browse food by category.
- **Shopping cart:** Add items and manage quantities before ordering.
- **Order management:** Connect the ordering flow with the backend API.
- **Authentication:** Supports user authentication when configured in the project.
- **REST API:** Node.js and Express.js backend for application data and business logic.
- **Database integration:** Supabase/PostgreSQL for persistent data storage.
- **State management:** Redux for shared application state.
- **Mobile-first interface:** Designed for a convenient mobile experience.
- **Scalable structure:** Separate mobile frontend and backend responsibilities.

## Technology Stack

| Layer              | Technology            |
| ------------------ | --------------------- |
| Mobile application | React Native          |
| Backend            | Node.js               |
| API framework      | Express.js            |
| Database           | Supabase / PostgreSQL |
| State management   | Redux                 |
| API communication  | REST API              |

## Project Structure

Your exact folders may differ. A common structure is:

```text
food-delivery-app/
├── mobile/                 # React Native application
│   ├── src/
│   ├── assets/
│   └── package.json
├── backend/                # Node.js and Express API
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js (LTS recommended)
- npm
- React Native CLI development environment
- Android Studio and Android SDK for Android development
- A Supabase project with the required database tables

Follow the official React Native environment setup guide for your operating system:  
https://reactnative.dev/docs/set-up-your-environment

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

Replace the placeholders with your repository URL and project folder name.

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and add your actual configuration:

```env
PORT=5000
DATABASE_URL=your_supabase_postgresql_connection_string
```

Use the variable names expected by your backend code. If your project uses Supabase client credentials instead of a PostgreSQL connection string, configure the required Supabase URL and key variables according to your implementation.

**Security:** Never commit `.env` files, database passwords, service-role keys, or other secrets to GitHub. Add `.env` to `.gitignore`.

Start the backend using the script configured in `backend/package.json`. For example:

```bash
npm run dev
```

If no `dev` script exists, check `package.json` for the available start command.

### 3. Configure the React Native App

Open a separate terminal:

```bash
cd mobile
npm install
```

Configure the API base URL in the app using the approach already implemented in your project. For Android Emulator, a locally running computer's backend is commonly reachable at:

```text
http://10.0.2.2:5000
```

For a physical Android device, use your computer's local network IP address and ensure both devices can reach each other. For a deployed backend, use its HTTPS URL.

Do not use `localhost` in the mobile app when it needs to reach a backend running on your development computer: on a physical phone, `localhost` refers to the phone itself.

### 4. Run the Mobile App

Start Metro:

```bash
npm start
```

In another terminal, run the Android app:

```bash
npm run android
```

Use the scripts available in your mobile app's `package.json`. iOS builds require macOS and Xcode.

## API Configuration

Make sure the mobile app's API base URL matches the backend environment. Verify that:

- The backend starts successfully.
- The Supabase database connection and required tables are configured.
- The API routes match the paths called by the mobile app.
- CORS and deployment settings are configured where applicable.
- Production environment variables are set in the hosting provider.

## Environment Variables

Environment variable names depend on the codebase. A typical backend configuration might include:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
```

Only add variables that your backend actually uses. Keep credentials private and use your hosting provider's environment-variable settings for deployment.

## Development Notes

- Keep API requests and database access separate from UI components where practical.
- Use Redux consistently for shared state such as cart contents and authenticated-user data.
- Validate order data on the backend before saving it.
- Handle API errors and loading states to improve the user experience.
- Never expose database passwords or Supabase service-role keys in the mobile app.

## Future Improvements

Potential enhancements include:

- Online payment integration
- Live order tracking
- Push notifications
- Delivery address management
- Restaurant ratings and reviews
- Order history and reorder functionality

These are possible future additions and may not be implemented in the current version.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch and open a pull request.

## License

Add a license to this repository if you intend to distribute or reuse the project publicly.

---

**Built with React Native, Node.js, Supabase, and Redux.**
