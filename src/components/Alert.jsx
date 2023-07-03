// alert at the top

import React from "react";
export default function Alert(props) {
  return (
    <div style={{ height: '70px' }}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.alert.type}</strong> {props.alert.message}</div>}
    </div>
  )
}


// pop up Alert

// import React, { useRef, useState } from "react";
// export default function Alert(props) {
//   // const [theme, setTheme] = useState({ bgColor: "white", tColor: "black" })
//   const refOpen = useRef(null)
//   const refClose = useRef(null)
//   // const colorChange = () => {
//   //   if (props.alert.type === "success") {
//   //     setTheme({ bgColor: "#048400", tColor: "white" })
//   //   } else {
//   //     setTheme({ bgColor: "white", tColor: "black" })
//   //   }
//   // }

//   if (props.alert.message === "") {
//   } else {
//     // colorChange()
//     refOpen.current.click()
//     setTimeout(() => {
//       refClose.current.click()
//     }, 3000)
//   }


//   return (
//     <>
//       <button type="button" className="btn btn-primary d-none" ref={refOpen} data-bs-toggle="modal" data-bs-target="#exampleModal">
//         Launch demo modal
//       </button>
//       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content" style={{ backgroundColor: "#5b73a4", color: "white" }}>
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">Alert: {props.alert.type}</h1>
//               <button type="button" className="btn-close" ref={refClose} data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             {<div className="modal-body">
//               {props.alert.message}
//             </div>}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

