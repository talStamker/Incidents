
import { useEffect, useState } from "react";

import {
    getServices,
    createService,
    updateService,
    deleteService
} from "./api/servicesApi";

import ServiceList from "./components/serviceList/ServiceList";
import ServiceSidebar from "./components/sideBar/ServiceSidebar";
import AddServiceModal from "./components/serviceView/add/AddServiceModal";
import EditServiceModal from "./components/serviceView/edit/EditServiceModal";

import "./App.css";


function App() {

    // All services displayed on the screen
    const [services, setServices] = useState([]);

    // Search + filter
    const [filters, setFilters] = useState({
        search: "",
        status: ""
    });

    // Add modal
    const [showAddModal, setShowAddModal] = useState(false);

    // Edit modal
    const [showEditModal, setShowEditModal] = useState(false);

    // Service currently being edited
    const [selectedService, setSelectedService] = useState(null);

    // Error message
    const [error, setError] = useState("");


    // =========================
    // GET SERVICES
    // =========================

    useEffect(() => {
        loadServices();
    }, [filters]);


    async function loadServices() {

        try {

            setError("");

            const data = await getServices(
                filters.search,
                filters.status
            );

            setServices(data);

        } catch (error) {

            console.error(error);

            setError("Failed to load services");
        }
    }


    // =========================
    // ADD
    // =========================

    function openAddModal() {
        setShowAddModal(true);
    }


    function closeAddModal() {
        setShowAddModal(false);
    }


    async function handleAddService(newService) {

        try {

            setError("");

            await createService(newService);

            setShowAddModal(false);

            // Load the list again with the current search/filter
            await loadServices();

        } catch (error) {

            console.error(error);

            setError("Failed to add service");
        }
    }


    // =========================
    // EDIT
    // =========================

    function openEditModal(service) {

        setSelectedService(service);

        setShowEditModal(true);
    }


    function closeEditModal() {

        setShowEditModal(false);

        setSelectedService(null);
    }


    async function handleEditService(updatedService) {

        try {

            setError("");

            await updateService(
                selectedService.id,
                updatedService
            );

            setShowEditModal(false);

            setSelectedService(null);

            // Load updated list
            await loadServices();

        } catch (error) {

            console.error(error);

            setError("Failed to update service");
        }
    }


    // =========================
    // DELETE
    // =========================

    async function handleDeleteService(id) {

        try {

            setError("");

            await deleteService(id);

            // Remove it immediately from the displayed list
            setServices((currentServices) =>
                currentServices.filter(
                    (service) => service.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            setError("Failed to delete service");
        }
    }


    // =========================
    // RENDER
    // =========================

    return (
        <div className="app">
        <ServiceSidebar
        onFilterChange={setFilters}
    />

    <main className="main-content">

        <ServiceList
            services={services}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={handleDeleteService}
            isError={error}
        />

    </main>

        {/* </div>  */}
    
    {showAddModal && (
        <AddServiceModal
            onClose={closeAddModal}
            onAdd={handleAddService}
        />
    )}

    {showEditModal && selectedService && (
        <EditServiceModal
            service={selectedService}
            onClose={closeEditModal}
            onEdit={handleEditService}
        />
    )}

    </div>
    );
}

export default App;