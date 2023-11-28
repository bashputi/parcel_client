import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useOrder from "../../hooks/useOrder";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const MyDeliveryList = () => {
    const loadedList = useLoaderData();
    const [lists, setLists] = useState(loadedList);
    const [firstMatchingItemId] = useOrder();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        setLists(loadedList);
    }, [loadedList]);

    const filter = lists.filter((item) => item.deliverymanid === firstMatchingItemId);
    console.log(filter);

    const handleStatus = (item) => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
          }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic
                .patch(`/books/tasks/${item._id}`)
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    const updatedStatus = lists.map((list) =>
                      list._id === item._id ? { ...list, status: 'Cancelled' } : list
                    );
                    setLists(updatedStatus);
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `${item.name}'s status is change Now!`,
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error making status:", error);
                });
            }
          });



      
      };
    const handleDelivered = (item) => {
        
        Swal.fire({
            title: "You delivered the parcel?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes i did it!"
          }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic
                .patch(`/books/delivers/${item._id}`)
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    const updatedStatus = lists.map((list) =>
                      list._id === item._id ? { ...list, status: 'delivered' } : list
                    );
                    setLists(updatedStatus);
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `${item.name}'s parcel is delivered!`,
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error making status:", error);
                });
            }
          });



      
      };

    return (
        <div>
           
      <div className="flex justify-evenly mt-12 mb-8">
        <h2 className="text-4xl">Item:</h2>
        
     
      </div>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                Serial No
              </th>
              <th>Booked User Name</th>
              <th>Receiver Name</th>
              <th>User Phn No</th>
              <th>Requested Date</th>
              <th>Approximate Date</th>
              <th>Reciever Phn No</th>
              <th>Reciever Address</th>
              <th>Cancel Task</th>
              <th>Deliver</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row  */}
           {
            filter?.length && filter.map((item, index) => (
                <tr key={item._id}>
                <th>
                 {index + 1}
                </th>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.receivername}
               
                </td>
                <td>
                    {item.phnno}
                </td>
                <td>
                    {item.date}
                </td>
                <td>
                    {item.deliverydate}
                  
                </td>
                <td>
                   {item.receiverphnno }
                </td>
                <td>
                {item.longitude }{item.latitude }
                
                </td>
                <td>
                { item.status === 'on the way' ? <button onClick={() => handleStatus(item)} disabled={item.status === 'delivered'} className="btn btn-outline btn-warning">Task Given</button> : <button disabled={item.status === 'delivered'} className="btn bg-orange-500 ">Canceled</button>} 
               
                </td>
                <td>
                { item.status === 'on the way' ? <button onClick={() => handleDelivered(item)} disabled={item.status === 'Cancelled'} className="btn btn-outline btn-warning">To Do</button> : <button disabled={item.status === 'Cancelled'} className="btn bg-orange-500 ">Delevered</button>} 
                </td>
                <td>
                    {item.price}
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

export default MyDeliveryList;