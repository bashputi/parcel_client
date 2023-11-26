import useRole from "../../hooks/useRole";


const Deliveryman = () => {
    const [role] = useRole();
    console.log(role)
    return (
        <div>
            <div>
           
           <div className="flex justify-evenly mt-12 mb-8">
           <div>
           
           <h1 className="text-4xl font-semibold text-gray-700">All Delivery Man</h1>
           <h2 className="text-2xl mt-5 text-center text-gray-700">Item: {role.length}</h2>
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
                   <th>Delivery Man's Name</th>
                   <th>Delivery Man's Phone No</th>
                   <th>Number of Parcel delivered</th>
                   <th>Average Review</th>
                 </tr>
               </thead>
               <tbody>
                 {/* row  */}
                {
                 role.length && role.map((item, index) => (
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
                       {/* number of parcel delivered  */}

                     </td>
                     <td>
                       {/* average rating  */}
                       
                     </td>
                   </tr>
                 ))
                }
               </tbody>
             </table>
           </div>
         </div>
        </div>
    );
};

export default Deliveryman;