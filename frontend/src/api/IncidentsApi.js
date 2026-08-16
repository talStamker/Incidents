// GET    /api/incidents
async function getIncidents(
    sort = "",
    from = "",
    to = "",
    severities = [],
    statuses = []
) {
    try {
        const params = new URLSearchParams();

        if (sort) {
            params.append("sort", sort);
        }

        if (from) {
            params.append("from", from);
        }

        if (to) {
            params.append("to", to);
        }

        if (severities.length > 0) {
            params.append("severity", severities.join(","));
        }

        if (statuses.length > 0) {
            params.append("status", statuses.join(","));
        }

        const response = await fetch(
            `http://localhost:5000/api/incidents?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error("Request failed");
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        throw error;
    }
}
// GET    /api/incidents/:id
async function getIncident(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/incidents/${id}`
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// POST   /api/incidents
async function createIncident(incident) {
  try {
    // console.log(incident)
    const response = await fetch(
      "http://localhost:5000/api/incidents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incident),
      }
    );
    // console.log(response.ok)

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// PUT    /api/incidents/:id
async function updateIncident(id, incident) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/incidents/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(incident),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//DELETE /api/incidents/:id

async function deleteIncident(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/incidents/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
export {
  getIncidents,
  getIncident,
  createIncident, 
  updateIncident,
  deleteIncident
};