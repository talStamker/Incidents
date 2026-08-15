// import { useState } from "react";
// import ServiceView from "../serviceView.jsx";
// export default function EditServiceModal({
//     service,
//     onClose,
//     onEdit
// }) {

//     const [name, setName] = useState(service.name);
//     const [status, setStatus] = useState(service.status);
//     const [responseTime, setResponseTime] = useState(service.responseTime);
//     const [errors, setErrors] = useState(service.errors);

//     const handleEdit = () => {

//         const updatedService = {
//             name: name.trim(),
//             status,
//             responseTime: Number(responseTime),
//             errors: Number(errors)
//         };

//         onEdit(updatedService);
//     };

//     return (
//         <ServiceView
//             title="Edit Service"
//             onClose={onClose}
//             onSubmit={handleEdit}
//             submitText="Edit"
//             submitClass="edit-modal-button"
//         >

//             <div className="form-group">
//                 <label>Name</label>

//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//             </div>

//             <div className="form-group">
//                 <label>Status</label>

//                 <select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                 >
//                     <option value="healthy">Healthy</option>
//                     <option value="degraded">Degraded</option>
//                     <option value="down">Down</option>
//                 </select>
//             </div>

//             <div className="form-group">
//                 <label>Response Time</label>

//                 <input
//                     type="number"
//                     min="0"
//                     value={responseTime}
//                     onChange={(e) => setResponseTime(e.target.value)}
//                 />
//             </div>

//             <div className="form-group">
//                 <label>Errors</label>

//                 <input
//                     type="number"
//                     min="0"
//                     value={errors}
//                     onChange={(e) => setErrors(e.target.value)}
//                 />
//             </div>

//         </ServiceView>
//     );
// }
import ServiceView from "../serviceView";

export default function EditServiceModal({
    service,
    onClose,
    onEdit
}) {
    return (
        <ServiceView
            mode="edit"
            service={service}
            onClose={onClose}
            onSubmit={onEdit}
        />
    );
}