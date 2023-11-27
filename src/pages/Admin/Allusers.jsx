// import {  useLoaderData } from "react-router-dom";
// import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";


const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const {data: users = [], refetch} = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
          const res = await axiosSecure.get('/users');
          return res.data;
      }
  });
  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`)
     .then(res => {
      console.log(res.data)
      if(res.data.modifiedCount > 0){
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500
      });
      }
     })
  };
  const handleMakeDeliveryMan = user => {
    axiosSecure.patch(`/users/deliveryman/${user._id}`)
     .then(res => {
      console.log(res.data)
      if(res.data.modifiedCount > 0){
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Delivery Man Now!`,
          showConfirmButton: false,
          timer: 1500
      });
      }
     })
  };


    return (
        <div className="mb-10">
        <div className="flex justify-evenly mt-12 mb-8">
       <div>
       <h1 className="text-4xl font-semibold text-gray-700">All User</h1>
       <h2 className="text-2xl mt-5 text-center text-gray-700">Item: {users.length}</h2>
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
                <th>Users Name</th>
                <th>Users Phone No</th>
                <th>Number of Parcel</th>
                <th>Total Spent Amount</th>
                <th>Make Delivery Man</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
             {
              users.length && users.map((user, index) => (
                  <tr key={user._id}>
                  <th>
                   {index + 1}
                  </th>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.phn}
                  </td>

                  <td>
                      {/* number of parcel  */}
                    
                  </td>
                  <td>
                     {/* total spant amount  */}
                  </td>
  
                  <td>
                  { user.role === 'deliveryman' ? <button className="btn btn-outline btn-warning">Delivery Man</button> : <button onClick={() => handleMakeDeliveryMan(user)} className="btn bg-orange-500 btn-lg"><FaUsers className="text-white text-2xl" /></button>}
                  </td>
                  <td>
                  { user.role === 'admin' ? <button className="btn btn-outline btn-warning">Admin</button> : <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-500 btn-lg"><FaUsers className="text-white text-2xl" /></button>}
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

export default Allusers;