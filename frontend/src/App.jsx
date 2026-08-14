import { useEffect, useState } from 'react'
import { getServices , getService, createService, updateService, deleteService} from "./api/servicesApi";
import './App.css'

function App() {
  const [services, setservices] = useState([])
  useEffect(() => {
    getServices().then((data)=> {
      setservices(data);
    });
  }, []);
  const [service, setService] = useState(null)
  useEffect(() => {
  getService(2).then((data) => {
    setService(data);
    // console.log(data)
  });
}, []);
  const [newService, setNewService] = useState(null)
  useEffect(() => {
  createService({
  name: "Test API",
  status: "healthy",
  responseTime: 100,
  errors: 0
}).then((data) => {
    setNewService(data);
    // console.log(data)
  });
}, []);
  const [updatedService, setUpdatedService] = useState(null)
  useEffect(() => {
  updateService(2,{
  name: "Test API",
  status: "healthy",
  responseTime: 200,
  errors: 0
}).then((data) => {
    setUpdatedService(data);
    console.log(data)
  });
}, []);
  const [deletedService, setDeletedService] = useState(null)
  useEffect(() => {
  deleteService(2).then((data) => {
    setDeletedService(data);
    console.log(data)
  });
}, []);
  return (
    <div>
     
    </div>
  );
}

export default App
