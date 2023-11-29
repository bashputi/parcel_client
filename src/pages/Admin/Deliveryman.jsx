import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";



const Deliveryman = () => {
  const loadedDeliveryman = useLoaderData();
  const [ deliverys, setDeliverys] = useState(loadedDeliveryman);

  useEffect(() => {
    const filter = loadedDeliveryman.filter((item) => item.role ===  'deliveryman' );
    setDeliverys(filter);
  },[loadedDeliveryman])
 
 

    return (
        <div>
            <div>
           
           <div className="flex justify-evenly mt-12 mb-8">
           <div data-aos="zoom-in" data-aos-duration="2000">
           
           <h1 className="text-4xl font-semibold text-gray-700">All Delivery Man</h1>
           <h2 className="text-2xl mt-5 text-center text-gray-700">Item: {deliverys.length}</h2>
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
               <tbody data-aos="fade-up"
      data-aos-duration="2500">
                 {/* row  */}
                {
                 deliverys.length && deliverys.map((item, index) => (
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