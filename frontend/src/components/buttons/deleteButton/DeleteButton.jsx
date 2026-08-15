// // import  {useState, useEffect, useRef} from "react";
// // import "./DeleteButton.css"



// // export default function DeleteButton({ handleDelete }) {
// //     const [confirming, setConfirming] = useState(false);
// //     const buttonRef = useRef(null);

// //     const handleDeleteClick = () => {
// //         if (confirming) {
// //             handleDelete();
// //         } else {
// //             setConfirming(true);
// //         }
// //     };

// //     const handleClickOutside = (event) => {
// //         if (buttonRef.current && !buttonRef.current.contains(event.target)) {
// //             setConfirming(false);
// //         }
// //     };

// //     useEffect(() => {
// //     if (confirming) {
// //         document.addEventListener("click", handleClickOutside);
// //     }

// //     return () => {
// //         document.removeEventListener("click", handleClickOutside);
// //     };
// // }, [confirming]);

// //     return (
// //             <button
// //                 type="button"
// //                 ref={buttonRef}
// //                 // className="btn btn-danger "
// //                 className="delete-button"
// //                 onClick={handleDeleteClick}
// //             >
// //                 {confirming ? "Are you sure?" : <i className="delete-button bi bi-trash-fill"></i>}
// //             </button>
// //     );
// // }
// import { useState } from "react";
// import "./DeleteButton.css";

// export default function DeleteButton({ handleDelete }) {
//     const [confirming, setConfirming] = useState(false);

//     const handleDeleteClick = () => {
//         if (confirming) {
//             handleDelete();
//             setConfirming(false);
//         } else {
//             setConfirming(true);
//         }
//     };

//     return (
//         <button
//             type="button"
//             className="delete-button"
//             onClick={handleDeleteClick}
//         >
//             {confirming ? "Are you sure?" : (
//                 <i className="bi bi-trash-fill"></i>
//             )}
//         </button>
//     );
// }
import { useState } from "react";
import "./DeleteButton.css";

export default function DeleteButton({ handleDelete }) {
    const [confirming, setConfirming] = useState(false);

    if (confirming) {
        return (
            <div className="delete-confirmation">
                <span>Are you sure?</span>

                <button
                    type="button"
                    className="confirm-delete"
                    onClick={handleDelete}
                >
                    Delete
                </button>

                <button
                    type="button"
                    className="cancel-delete"
                    onClick={() => setConfirming(false)}
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <button
            type="button"
            className="delete-button"
            onClick={() => setConfirming(true)}
        >
            <i className="bi bi-trash-fill"></i>
        </button>
    );
}