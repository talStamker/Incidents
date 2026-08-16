
import { useEffect, useState } from "react";

import {
     getIncidents,
  createIncident, 
  updateIncident,
  deleteIncident
} from "./api/IncidentsApi";

import IncidentList from "./components/IncidentList/IncidentList";
import IncidentSidebar from "./components/IncidentSideBar/IncidentSideBar";
import AddIncidentModal from "./components/IncidentModal/add/AddIncidentModal";
import EditIncidentModal from "./components/IncidentModal/edit/EditIncidentModal";

import "./App.css";


function App() {

    // All Incidents displayed on the screen
    const [incidents , setIncidents ] = useState([]);

    // Search + filter
    const [filters, setFilters] = useState({
        severity: "",
        status: "",
        from: "",
        to: "",
        sort: ""
    });

    // Add modal
    const [showAddModal, setShowAddModal] = useState(false);

    // Edit modal
    const [showEditModal, setShowEditModal] = useState(false);

    // Incident currently being edited
    const [selectedIncident, setSelectedIncident] = useState(null);

    // Error message
    const [error, setError] = useState("");


    // =========================
    // GET Incidents 
    // =========================

    useEffect(() => {
        loadIncidents ();
    }, [filters]);


    async function loadIncidents () {

        try {

            setError("");

            const data = await getIncidents(
                filters.sort,
                filters.from,
                filters.to,
                filters.severity,
                filters.status
                
                
            );

            setIncidents (data);

        } catch (error) {

            console.error(error);

            setError("Failed to load incidents ");
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


    async function handleAddIncident(newIncident) {

        try {

            setError("");

            await createIncident(newIncident);

            setShowAddModal(false);

            // Load the list again with the current search/filter
            await loadIncidents ();

        } catch (error) {

            console.error(error);

            setError("Failed to add incident");
        }
    }


    // =========================
    // EDIT
    // =========================

    function openEditModal(incident) {

        setSelectedIncident(incident);

        setShowEditModal(true);
    }


    function closeEditModal() {

        setShowEditModal(false);

        setSelectedIncident(null);
    }


    async function handleEditIncident(updatedIncident) {

        try {

            setError("");

            await updateIncident(
                selectedIncident.id,
                updatedIncident
            );

            setShowEditModal(false);

            setSelectedIncident(null);

            // Load updated list
            await loadIncidents ();

        } catch (error) {

            console.error(error);

            setError("Failed to update incident");
        }
    }


    // =========================
    // DELETE
    // =========================

    async function handleDeleteIncident(id) {

        try {

            setError("");

            await   deleteIncident(id);

            // Remove it immediately from the displayed list
            setIncidents ((currentIncidents ) =>
                currentIncidents .filter(
                    (incident) => incident.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            setError("Failed to delete incident");
        }
    }


    // =========================
    // RENDER
    // =========================

    return (
        <div className="app">
         <IncidentSidebar
        onFilterChange={setFilters}
    />

    <main className="main-content">

        <IncidentList
            incidents={incidents}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={handleDeleteIncident}
            isError={error}
        />

    </main>

        {/* </div>  */}
    
    {showAddModal && (
        <AddIncidentModal
            onClose={closeAddModal}
            onAdd={handleAddIncident}
        />
    )}

    {showEditModal && selectedIncident && (
        <EditIncidentModal
            incident={selectedIncident}
            onClose={closeEditModal}
            onEdit={handleEditIncident}
        />
    )} 

    </div>
    );
}

export default App;