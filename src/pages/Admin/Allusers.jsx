import {  useLoaderData } from "react-router-dom";
import { useState } from "react";


const Allusers = () => {
    const userData = useLoaderData();
    const [users, setUsers] = useState(userData);

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
              users.length && users.map((item, index) => (
                  <tr key={item._id}>
                  <th>
                   {index + 1}
                  </th>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    {item.phn}
                  </td>

                  <td>
                      {/* number of parcel  */}
                    
                  </td>
                  <td>
                     {/* total spant amount  */}
                  </td>
  
                  <td>
                      <button className="btn btn-outline btn-success">Delivery man</button>
                  </td>
                  <td>
                      <button className="btn btn-outline btn-warning">Admin</button>
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