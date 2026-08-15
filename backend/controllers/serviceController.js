const services = require("../data/services");

const getServices = (req, res) => {
    const { search, status } = req.query;

    let result = services;

    if (search) {
        result = result.filter(service =>
            service.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (status) {
        result = result.filter(service =>
            service.status.toLowerCase() === status.toLowerCase()
        );
    }

    res.json(result);
};

const getServiceById = (req, res) => {
    const id = Number(req.params.id);

    const service = services.find(service => service.id === id);

    if (!service) {
        return res.status(404).json({
            message: "Service not found"
        });
    }

    res.json(service);
};

const createService = (req, res) => {
    const { name, status, responseTime, errors } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    const newService = {
        id: services.length > 0
            ? Math.max(...services.map(service => service.id)) + 1
            : 1,
        name,
        status,
        responseTime,
        errors
    };

    services.push(newService);

    res.status(201).json(newService);
};

const updateService = (req, res) => {
    const id = Number(req.params.id);

    const service = services.find(service => service.id === id);

    if (!service) {
        return res.status(404).json({
            message: "Service not found"
        });
    }

    const { name, status, responseTime, errors } = req.body;

    if (name !== undefined) service.name = name;
    if (status !== undefined) service.status = status;
    if (responseTime !== undefined) service.responseTime = responseTime;
    if (errors !== undefined) service.errors = errors;

    res.json(service);
};

const deleteService = (req, res) => {
    const id = Number(req.params.id);

    const index = services.findIndex(service => service.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Service not found"
        });
    }

    const deleted = services.splice(index, 1)[0];

    res.json(deleted);
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};