import express from "express";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Notify Engine is running 🚀");
});

// 👇 Route mount
app.use("/event", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});