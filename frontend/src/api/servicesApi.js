// GET    /api/services
async function getServices(search = "", status = "") {
  try {
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }

    if (status) {
      params.append("status", status);
    }

    const response = await fetch(
      `http://localhost:5000/api/services?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
// GET    /api/services/:id
async function getService(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/services/${id}`
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
// POST   /api/services
async function createService(service) {
  try {
    // console.log(service)
    const response = await fetch(
      "http://localhost:5000/api/services",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
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
// PUT    /api/services/:id
async function updateService(id, service) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/services/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(service),
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
//DELETE /api/services/:id

async function deleteService(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/services/${id}`,
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
  getServices,
  getService,
  createService, 
  updateService,
  deleteService
};