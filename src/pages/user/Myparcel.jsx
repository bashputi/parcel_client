import useAxiosSecure from '../../hooks/useAxiosSecure';
import useBook from '../../hooks/useBook';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link, useLoaderData } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider';


const Myparcel = () => {
        const axiosSecure = useAxiosSecure();
        // const [book, refetch] = useBook();
        const loadedMyOrder = useLoaderData();
        const [updateUser, setUpdateUser] = useState(loadedMyOrder);
        const {user, loading} = useContext(AuthContext);
        
        useEffect(() => {
          if (loadedMyOrder && user?.email) {
            const filterCard = loadedMyOrder.filter((item) => item.email === user.email);
            setUpdateUser(filterCard);
          }
        }, [loadedMyOrder, user?.email]);

        
     const totalPrice = updateUser.reduce((total, item) => total + item.price, 0);

     const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            
            if (result.isConfirmed) {
            axiosSecure.delete(`/books/${id}`)
            .then(res => {
                if(res.data.deletedCount > 0){
                   
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      const remaining = updateUser.filter((item) => item._id !== id);
              setUpdateUser(remaining)
                }
            })
            }
          });
    };
     
    return (
        <div>
           
      <div className="flex justify-evenly mt-12 mb-8">
        <h2 className="text-4xl">Item: {updateUser.length}</h2>
        <h2 className="text-4xl">Total Price: {totalPrice}</h2>
       {
        updateUser.length ? <Link to="/dashboard/payment"> <button className="btn btn-primary">Pay</button></Link>
        :  <button disabled className="btn btn-primary">Pay</button>
       }
      </div>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                Serial No
              </th>
              <th>Type</th>
              <th>Requested Date</th>
              <th>Aproximate Date</th>
              <th>Booking Date</th>
              <th>Delivery Man Id</th>
              <th>Review</th>
              <th>Update</th>
              <th>Cancel</th>
              <th>Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
           {
            updateUser.length && updateUser.map((item, index) => (
                <tr key={item._id}>
                <th>
                 {index + 1}
                </th>
                <td>
                  {item.type}
                </td>
                <td>
                  {item.date}
               
                </td>
                <td>
                    {/* aproximate date  */}
                </td>
                <td>
                    {item.time}
                </td>
                <td>
                    {/* deliveryman id  */}
                  
                </td>
                <td>
                   <button className='btn btn-success'>Review</button>
                </td>
                <td>
                <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className='btn btn-warning'><FaEdit /></button>
                    </Link>
                </td>
                <td>
                <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btb-lg"><FaTrashAlt className='text-red-600 w-5 h-5'/></button>
                </td>
                <td>
                {item.status}
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

export default Myparcel;