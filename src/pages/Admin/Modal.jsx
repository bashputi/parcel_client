import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useDelivery from "../../hooks/useDelivery";
import { useState } from "react";


const Modal = () => {
    const [filter] = useDelivery();
    const [parcels, setParcels] = useState(filter);
    const axiosPublic = useAxiosPublic();

    const handleAssign = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const approximateDate = formData.get('data'); 
        const deliveryManId = formData.get('man');
    console.log(approximateDate, deliveryManId);
    axiosPublic
    .patch(`/books/assign/${deliveryManId._id}`)
    .then((res) => {
      console.log(res)
      if (res.data.modifiedCount > 0) {
        const updatedStatus = filter.map((item) =>
          item._id === deliveryManId._id ? { ...item, type: 'approximateDate', name: 'deliveryManId' } : item
        );
        setParcels(updatedStatus);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Task Assigned' ,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((error) => {
      console.error("Error making status:", error);
    });
  
      }

    return (
        <div>
            <button className="btn btn-outline btn-warning" onClick={()=>document.getElementById('my_modal_3').showModal()}>Manage</button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">

                 <div className="flex justify-end">
                 <button onClick={() => document.getElementById('my_modal_3').close()} className="btn btn-warning">Close</button>
                 </div>

                  <form onSubmit={ handleAssign}>
                    <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">Approximate Date</span>
                    </label>
                    <input type="date" name="data" className="input input-bordered max-w-xs" required />
                  </div>
                  <div className="form-control my-5">
                  <label className="label">
                    <span className="label-text">Assign Delevery Man</span>
                  </label>
                  <select name="man" className="select select-bordered w-full max-w-xs">
                  {
                    filter?.length && filter.map((item) => (
                      <option key={item._id} value={item._id}>{item.name}</option>
                    ))
                  }
                </select>
                </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  </div>
                </dialog>
        </div>
    );
};

export default Modal;