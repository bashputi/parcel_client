import useAxiosSecure from '../../hooks/useAxiosSecure';
import useBook from '../../hooks/useBook';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const Myparcel = () => {
        const axiosSecure = useAxiosSecure();
        const [book, refetch] = useBook();
        console.log(book)
     const totalPrice = book.reduce((total, item) => total + item.price, 0);

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
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
            })
            }
          });
    };
     
    return (
        <div>
           
      <div className="flex justify-evenly mt-12 mb-8">
        <h2 className="text-4xl">Item: {book.length}</h2>
        <h2 className="text-4xl">Total Price: {totalPrice}</h2>
       {
        book.length ? <Link to="/dashboard/payment"> <button className="btn btn-primary">Pay</button></Link>
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
            book.map((item, index) => (
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