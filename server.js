import express from "express";
import "dotenv/config";
import vehiculesRouter from "./routes/vehicules.js";
import journal from "./middleware/journal.js";

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(journal);

app.use("/vehicules", vehiculesRouter);

// middleware 404
app.use((req, res) => {
    res.status(404).json({ message: "ressourse not found" });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});