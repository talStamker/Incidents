
const express = require("express");
const cors = require("cors");

const incidentRoutes = require("./routes/incidentRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);