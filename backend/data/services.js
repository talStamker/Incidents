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
];

module.exports = services;