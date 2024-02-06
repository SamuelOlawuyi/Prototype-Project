import { connect, connection } from "mongoose";

export default function connectDB() {
  const devMode = process.env.NODE_ENV === 'development';
  
  const databaseUrl = devMode
    ? 'mongodb://localhost:27017/finEase'
    : process.env.DATABASE_URL as string;

  function connectWithRetry() {
    connect(databaseUrl)
      .then(() => {
        console.log(`Connected to ${devMode ? 'local' : 'shared'} database successfully!`);
      })
      .catch((err) => {
        console.error("Error connecting to Database: ", err.code);
        setTimeout(connectWithRetry, 5000);
      });
  }

  // Event listeners for disconnection
  connection.on("disconnected", () => {
    console.log("Disconnected from the database");
    setTimeout(connectWithRetry, 5000);
  });

  connectWithRetry();
}