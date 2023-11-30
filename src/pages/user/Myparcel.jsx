
import { FaTrashAlt} from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link, useLoaderData } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SectionTitle from "../../components/SectionTitle";
import { FcSearch } from "react-icons/fc";


const Myparcel = () => {
  const axiosPublic = useAxiosPublic();
        const loadedMyOrder = useLoaderData();
        const [updateUser, setUpdateUser] = useState(loadedMyOrder);
        const {user} = useContext(AuthContext);
        const [selectedUserId, setSelectedUserId] = useState(null);
        
        useEffect(() => {
          if (loadedMyOrder && user?.email) {
            const filterCard = loadedMyOrder.filter((item) => item.email === user.email);
            setUpdateUser(filterCard);
          }
        }, [loadedMyOrder, user?.email]);

        
      const totalPrice = updateUser?.reduce((total, item) => total + item.price, 0);

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
            axiosPublic.delete(`/books/${id}`)
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

    const handleSubmit = (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const image = e.target.image.value;
      const ID = e.target.ID.value;
      const review = e.target.review.value;
      const text = e.target.text.value;
        console.log(name, image, ID, review, text)
        const info = {
          name,
          image,
          ID,
          review,
          text,
          date: new Date()
        };
        axiosPublic.post('/ratings', info)
        .then(res => {
           if(res.data.insertedId){   
               Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Your Review send!!",
                          showConfirmButton: false,
                         timer: 1500
                      });
           }
        })


    }

    const handleSarch = (e) => {
      e.preventDefault();
      const parcel = e.target.parcel.value;
      if ( parcel === "All") {
         
            setUpdateUser(loadedMyOrder);
      } else {
          const remaining = loadedMyOrder?.filter((item) => item.status === parcel);
            setUpdateUser(remaining)
      }
   };
     
    return (
        <div className="my-20">
            <SectionTitle heading={'All Booked Item'} subHeading={'Watch your history'}></SectionTitle>
      <div className="flex justify-evenly mt-12 mb-8">
        <h2 className="text-4xl">Total Price: {totalPrice}</h2>
       {
        updateUser?.length ?
         <Link to="/dashboard/payment"> <button className="btn btn-primary">Pay</button></Link>
         :
         <button disabled className="btn btn-primary">Pay</button>
       }
      </div>

    <div className="my-12 flex justify-center">
            <form onSubmit={handleSarch}>
            <div className="form-control join">
            
            <div className="join">
            <select name="parcel"  className="select w-56 select-bordered">
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="on the way">On The Way</option>
                <option value="Cancelled">Cancelled</option>
                <option value="delivered">Delivered</option>
                </select>
                <button className="btn join-item"> <FcSearch  className="h-8 w-8"/> </button>
            </div>
            
            </div>
            </form>
            
          </div>


      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead > 
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
          <tbody data-aos="fade-up"
      data-aos-duration="2500">
            {/* row  */}
           {
            updateUser?.length && updateUser.map((item, index) => (
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
                    {item.deliverydate }
                </td>
                <td>
                    {item.time}
                </td>
                <td>
                    {item.deliverymanid}
                  
                </td>
                <td>
                 
                   {
                item.status === 'delivered' && <div>
                   <button
              onClick={() => {
                document.getElementById('my_modal_3').showModal();
                 setSelectedUserId(item.deliverymanid);
              }}
              className="btn btn-secondary "
            >Review</button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">

                 <div className="flex justify-end">
                 <button onClick={() => document.getElementById('my_modal_3').close(window.location.reload())} className="btn btn-warning">Close</button>
                 </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">Reviewer Name</span>
                    </label>
                    <input type="text" value={user.displayName} name="name" readOnly className="input input-bordered max-w-xs" />
                  </div>
                    <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">Reviewer Image URL</span>
                    </label>
                    <input type="url" value={user.photoURL} name="image" readOnly className="input input-bordered max-w-xs"  />
                  </div>
                    <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">Delivery Man ID</span>
                    </label>
                    <input type="text" value={selectedUserId || ''} name="ID" readOnly className="input input-bordered max-w-xs"/>
                  </div>
                  <div className="form-control my-5">
                  <label className="label">
                    <span className="label-text">Give Ratings</span>
                  </label>
                  <select name="review" className="select select-bordered w-full max-w-xs">
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                </select>
                </div>
                    <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">Feedback Text</span>
                    </label>
                    <textarea type="text" name="text" className="textarea textarea-accent max-w-xs" placeholder="Bio"></textarea>
                  </div>
                
                    <button type="submit" className="btn btn-primary mt-5">Submit</button>
                  </form>
                  </div>
                </dialog>
                </div>
              
                
               }
                </td>
                <td>
                <button disabled={item.status !== 'pending'} className='btn btn-warning'>
                <Link to={`/dashboard/updateItem/${item._id}`}>
                   Update
                     </Link>
                     </button> 
                </td>
                <td>
                <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btb-lg"  disabled={item.status !== 'pending'}><FaTrashAlt className='text-red-600 w-5 h-5'/></button>
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