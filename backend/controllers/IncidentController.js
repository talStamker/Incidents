const incidents = require("../data/incidents");

const getIncidents = (req, res) => {
  const { sort, from, to, severity, status } = req.query;

  let result = incidents;

  if (sort === "Newest") {
  result.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

if (sort === "Oldest") {
  result.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}
  if (from) {
    result = result.filter(
      (incident) => new Date(incident.createdAt) >= new Date(from),
    );
  }
  if (to) {
    result = result.filter(
      (incident) => new Date(incident.createdAt) <= new Date(to),
    );
  }
  if (severity) {
    const severities = severity.split(",").map((value) => value.toLowerCase());

    result = result.filter((incident) =>
      severities.includes(incident.severity.toLowerCase()),
    );
  }

  if (status) {
    const statuses = status.split(",").map((value) => value.toLowerCase());

    result = result.filter((incident) =>
      statuses.includes(incident.status.toLowerCase()),
    );
  }

  res.json(result);
};

const getIncidentById = (req, res) => {
  const id = Number(req.params.id);

  const incident = incidents.find((incident) => incident.id === id);

  if (!incident) {
    return res.status(404).json({
      message: "incident not found",
    });
  }

  res.json(incident);
};

const createIncident = (req, res) => {
  const { title, description, severity, status, service } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  const now = new Date();

  const date = now.toISOString().slice(0, 19);
  const newIncident = {
    id:
      incidents.length > 0
        ? Math.max(...incidents.map((incident) => incident.id)) + 1
        : 1,
    title,
    description,
    severity,
    status,
    service,
    createdAt: date,
    updatedAt: date,
  };

  incidents.push(newIncident);

  res.status(201).json(newIncident);
};

const updateIncident = (req, res) => {
  const id = Number(req.params.id);

  const incident = incidents.find((incident) => incident.id === id);

  if (!incident) {
    return res.status(404).json({
      message: "incident not found",
    });
  }

  const { title, description, severity, status, service } = req.body;

  if (title !== undefined) incident.title = title;
  if (description !== undefined) incident.description = description;
  if (severity !== undefined) incident.severity = severity;
  if (status !== undefined) incident.status = status;
  if (service !== undefined) incident.service = service;
  const now = new Date();
  const date = now.toISOString().slice(0, 19);
  incident.updatedAt = date;

  res.json(incident);
};

const deleteIncident = (req, res) => {
  const id = Number(req.params.id);

  const index = incidents.findIndex((incident) => incident.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "incident not found",
    });
  }

  const deleted = incidents.splice(index, 1)[0];

  res.json(deleted);
};

module.exports = {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
};
