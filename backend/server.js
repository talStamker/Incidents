const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
let services = [
  {
    id: 1,
    name: "Doctor API",
    status: "healthy",
    responseTime: 120,
    errors: 2
  },
  {
    id: 2,
    name: "Pharmacy API",
    status: "degraded",
    responseTime: 650,
    errors: 15
  },
  {
    id: 3,
    name: "AI Recommendation",
    status: "down",
    responseTime: 0,
    errors: 43
  }
]
//GET    /api/services
app.get("/api/services", (req, res) => {
  const { search, status } = req.query;

  let result = services;

  // Search by service name
  if (search) {
    result = result.filter(service =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by status
  if (status) {
    result = result.filter(service =>
      service.status.toLowerCase() === status.toLowerCase()
    );
  }

  res.json(result);
});
// GET    /api/services/:id
app.get("/api/services/:id", (req, res) => {
  console.log(req.params.id);
   const id = Number(req.params.id);

  const service = services.find((service) => service.id === id);

  if (!service) {
    return res.status(404).json({
      message: "Service not found"
    });
  }

  res.json(service);
});

// POST   /api/services
app.post("/api/services", (req, res) => {
  const { name, status, responseTime, errors } = req.body;

  if (!name) {
    return res.status(404).json({
      message: "Service not found"
    });
  }

  const newService = {
    id: services.length + 1,
    name,
    status,
    responseTime,
    errors
  };

  services.push(newService);
  console.log(newService)
  res.status(201).json(newService);
});
// PUT    /api/services/:id
app.put("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);

  const service = services.find(
    (service) => service.id === id
  );

  if (!service) {
    return res.status(404).json({
      message: "service not found"
    });
  }

  const { name, status, responseTime, errors } = req.body;

  if (name !== undefined) {
    service.name = name;
  }

  if (status !== undefined) {
    service.status = status;
  }
  if (responseTime !== undefined) {
    service.responseTime = responseTime;
  }

  if (errors !== undefined) {
    service.errors = errors;
  }
console.log(service);
  res.status(200).json(service);
});
// DELETE /api/services/:id
app.delete("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = services.findIndex(
    (service) => service.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "service not found"
    });
  }

  const deleted = services.splice(index, 1)[0];
  console.log(deleted);
  res.status(200).json(deleted);
});
