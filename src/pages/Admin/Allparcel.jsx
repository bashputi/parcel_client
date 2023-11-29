import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useDelivery from "../../hooks/useDelivery";


const Allparcel = () => {
  const axiosPublic = useAxiosPublic();
    const parcelData = useLoaderData();
    const [parcels, setParcels] = useState(parcelData);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [filter] = useDelivery();

    const handleAssign = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const approximateDate = formData.get('data'); 
      const deliveryManId = formData.get('man');
      const UserId = formData.get('text');
  console.log(deliveryManId, UserId);

  const updateItem = {
    deliverydate: approximateDate,
    deliverymanid: deliveryManId,
    status: 'on the way'
  }

  axiosPublic
  .patch(`/books/assign/${UserId}`, updateItem)
  .then((res) => {
    console.log(res)
    if (res.data.modifiedCount > 0) {
     
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Your bookin updated succefully!',
          showConfirmButton: false,
          timer: 1500
        });
        
    }
  })
  .catch((error) => {
    console.error("Error making status:", error);
  });

    }
 
    return (
        <div className="mb-20">
             <div className="flex justify-evenly mt-12 mb-8">
      <div data-aos="zoom-in" data-aos-duration="2000">
      
      <h1 className="text-4xl font-semibold text-gray-700">All Ordered Parcel</h1>
      <h2 className="text-2xl mt-5 text-center text-gray-700">Item: {parcels.length}</h2>
      </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
              Serial No
              </th>
              <th>Client Name</th>
              <th>Client Phone No</th>
              <th>Booking Date</th>
              <th>Requested Delivery Date</th>
              <th>Cost</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody data-aos="fade-up"
      data-aos-duration="2500">
            {/* row  */}
           {
            parcels.length && parcels.map((user, index) => (
                <tr key={user._id}>
                <th>
                 {index + 1}
                </th>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.phnno}
               
                </td>
            
                <td>
                    {user.time}
                </td>
                <td>
                    {user.date}
                  
                </td>
                <td>
                   {user.price}
                </td>

                <td>
                 
               {
                user.status === 'pending' ? <div>
                   <button
              onClick={() => {
                document.getElementById('my_modal_3').showModal();
                setSelectedUserId(user._id);
              }}
              className="btn btn-outline btn-warning"
            >Manage Order</button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">

                 <div className="flex justify-end">
                 <button onClick={() => document.getElementById('my_modal_3').close(window.location.reload())} className="btn btn-warning">Close</button>
                 </div>

                  <form onSubmit={ handleAssign}>
                    <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">User Id</span>
                    </label>
                    <input type="text" value={selectedUserId || ''} name="text" className="input input-bordered max-w-xs" readOnly />
                  </div>
                    <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">Approximate Date</span>
                    </label>
                    <input type="date" name="data" className="input input-bordered max-w-xs" required />
                  </div>
                    <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">Change Status</span>
                    </label>
                    <input type="text" readOnly name="status" placeholder="On The Way" className="input input-bordered max-w-xs" required />
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
                :
                <>
                <button className="btn btn-success">Managed</button>
                </>
               }
                    
                </td>
              </tr>
            ))
           }
         
          </tbody>
         
        </table>
      </div>
    
    </div>
    );
};

export default Allparcel;