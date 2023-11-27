import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";


const Allparcel = () => {
  const axiosPublic = useAxiosPublic();
    const parcelData = useLoaderData();
    const [parcels, setParcels] = useState(parcelData);

 
    
    const handleStatus = (user) => {
      console.log(user)
      axiosPublic
        .patch(`/books/status/${user._id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            const updatedStatus = parcels.map((item) =>
              item._id === user._id ? { ...item, status: 'on the way' } : item
            );
            setParcels(updatedStatus);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name}'s status is change Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error("Error making status:", error);
        });
    };
 
    return (
        <div className="mb-20">
             <div className="flex justify-evenly mt-12 mb-8">
      <div>
      
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
            
        
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
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
                
                { user.status === 'pending' ? <button onClick={() => handleStatus(user)} className="btn btn-outline btn-warning">Pending</button> : <button  className="btn bg-orange-500 ">On The Way</button>} 
                </td>
                <td>
                    <button className="btn btn-outline btn-warning">Manage</button>
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