import useAxiosPublic from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const Allusers = () => {
const axiosPublic = useAxiosPublic();
const loadedUsers = useLoaderData();

const [mans, setMans] = useState(loadedUsers)
const count = loadedUsers.length ;
const itemsPerPage = 5 ; 
const numberOfPage = Math.ceil( count / itemsPerPage);
const pages = [...Array(numberOfPage).keys()];
const [currentPage, setCurrentPage] = useState(0);
console.log(mans)
useEffect(() => {
  fetch(`http://localhost:5002/users?page=${currentPage}&size=${itemsPerPage}`)
      .then(res => res.json())
      .then(data => setMans(data))
}, [currentPage]);


const handleMakeAdmin = (user) => {
  axiosPublic
    .patch(`/users/admin/${user._id}`)
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        const updatedMans = mans.map((item) =>
          item._id === user._id ? { ...item, role: 'admin' } : item
        );
        setMans(updatedMans);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((error) => {
      console.error("Error making admin:", error);
    });
};
const handleMakeDeliveryMan = (user) => {
  console.log(user)
  axiosPublic
    .patch(`/users/deliveryman/${user._id}`)
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        const updatedMans = mans.map((item) =>
          item._id === user._id ? { ...item, role: 'deliveryman' } : item
        );
        setMans(updatedMans);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a Delivery Man Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((error) => {
      console.error("Error making deliveryman:", error);
    });
};

    return (
        <div className="mb-10">
        <div className="flex justify-evenly mt-12 mb-8">
       <div data-aos="zoom-in" data-aos-duration="2000">
       <h1 className="text-4xl font-semibold text-gray-700">All User</h1>
       <h2 className="text-2xl mt-5 text-center text-gray-700">Item: {mans.length}</h2>
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
            <tbody data-aos="fade-up"
      data-aos-duration="2500">
              {/* row  */}
             {
              mans.length && mans.map((user, index) => (
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
                  { user.role === 'deliveryman' ? <button className="btn btn-outline btn-warning">
                    Delivery Man</button> : <button onClick={() => handleMakeDeliveryMan(user)} className="btn bg-orange-500 btn-lg">
                      <FaUsers className="text-white text-2xl" /></button>}
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
        <div className="flex justify-center mt-16">
             <div className="grid grid-cols-3 gap-6">
                  
               {
                 pages.map(page => <button className={currentPage === page ? "btn btn-warning" : undefined} onClick={() => setCurrentPage(page)} key={page}>{page} </button>)
            }
             </div>
                </div>
      </div>
    );
};

export default Allusers;