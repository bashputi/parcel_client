import { useForm } from 'react-hook-form';
import SectionTitle from '../../components/SectionTitle';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Bookparcel = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);
    
    useEffect(() => {
        const calculatePrice = () => {
          const numericWeight = parseInt(weight); 
          if (!isNaN(numericWeight)) {
            let calculatedPrice = 0; 
      
            if (numericWeight === 1) {
              calculatedPrice = 50;
            } else if (numericWeight === 2) {
              calculatedPrice = 100;
            } else if (numericWeight > 2) {
              calculatedPrice = 150;
            }
      
            setPrice(calculatedPrice); 
          }
        };
      
        calculatePrice();
      }, [weight]);
     

      const calculatePrice = (numericWeight) => {
        let calculatedPrice = 0;

        if (numericWeight === 1) {
            calculatedPrice = 50;
        } else if (numericWeight === 2) {
            calculatedPrice = 100;
        } else if (numericWeight > 2) {
            calculatedPrice = 150;
        }

        return calculatedPrice;
    };

    const onSubmit = async (data) => {
        const parsedWeight = parseInt(data.weight);
        const calculatedPrice = calculatePrice(parsedWeight);

        data.weight = parsedWeight;
        data.price = calculatedPrice;

        const currentDate = new Date(); 
        const year = currentDate.getFullYear(); 
        let month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        let day = String(currentDate.getDate()).padStart(2, '0'); 

          const formattedDate = `${year}-${month}-${day}`;

          const bookItem = {
            address: data.address,
            date: data.date,
            time: formattedDate,
            email: data.email,
            latitude: data.latitude,
            longitude: data.longitude,
            name: data.name,
            phnno: data.phnno,
            price: data.price,
            receivername: data.receivername,
            receiverphnno: data.receivername,
            type: data.type,
            weight: parsedWeight,
            status: 'pending'
          }
        
         axiosPublic.post('/books', bookItem)
         .then(res => {
            if(res.data.insertedId){
              reset();
                Swal.fire({
                           position: "top-end",
                           icon: "success",
                           title: "Your pacel is booked",
                           showConfirmButton: false,
                          timer: 1500
                       });
            }
         })
       
      };

    return (
        <div className='my-10 mt-28'>
          
           <SectionTitle data-aos="zoom-in" data-aos-duration="2000" heading="book a parcel" subHeading="What's new?"></SectionTitle>
            <div data-aos="zoom-in-up" data-aos-duration="2500" className='mt-12 bg-lime-200 shadow-lg rounded-lg p-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">
               User email
              </span>
            </label>
            <input type="email" defaultValue={user?.email} readOnly placeholder="User email"{...register("email", { required: true})}
            className="input input-bordered input-warning w-full" />
          </div>
         <div className="flex w-full gap-4 my-6">
         <div className="flex-1">
         <label className="label">
              <span className="label-text">
               User Name
              </span>
            </label>
            <input type="text" defaultValue={user?.displayName} readOnly placeholder="User Name"{...register("name", { required: true})}
            className="input input-bordered input-warning w-full" />
         </div>
          <div className="form-control w-full flex-1">
            <label className="label">
              <span className="label-text">
               Phone Number
              </span>
            </label>
            <input type="number" placeholder="Phone Number"{...register("phnno", { required: true})}
            className="input input-bordered input-warning w-full" />
          </div>
         </div>
         <div className="flex w-full gap-4 my-6">
         <div className="flex-1">
         <label className="label">
              <span className="label-text">
               Parcel Type
              </span>
            </label>
            <input type="text" placeholder="Parcel Type"{...register("type", { required: true})}
            className="input input-bordered input-warning w-full" />
         </div>
          <div className="form-control w-full flex-1">
            <label className="label">
              <span className="label-text">
               Parcel Weight
              </span>
            </label>
            <input type="number" placeholder="Parcel Weight" {...register("weight", { required: true})} className="input input-bordered input-warning w-full" onChange={(e) => setWeight(parseInt(e.target.value))} 
            />
          </div>
         </div>
         <div className="flex w-full gap-4 my-6">
         <div className="flex-1">
         <label className="label">
              <span className="label-text">
              Receiver's Name
              </span>
            </label>
            <input type="text" placeholder="Receiver's Name"{...register("receivername", { required: true})}
            className="input input-bordered input-warning w-full" />
         </div>
          <div className="form-control w-full flex-1">
            <label className="label">
              <span className="label-text">
              Receiver's Phone Number
              </span>
            </label>
            <input type="number" placeholder="Receiver's Phone Number"{...register("receiverphnno", { required: true})}
            className="input input-bordered input-warning w-full" />
          </div>
         </div>
         <div className="flex w-full gap-4 my-6">
         <div className="flex-1">
         <label className="label">
              <span className="label-text">
              Delivery Address
              </span>
            </label>
            <input type="text" placeholder="Delivery Address"{...register("address", { required: true})}
            className="input input-bordered input-warning w-full" />
         </div>
          <div className="form-control w-full flex-1">
            <label className="label">
              <span className="label-text">
               Requested Delivery Date
              </span>
            </label>
            <input type="date" placeholder="Requested Delivery Date"{...register("date", { required: true})}
            className="input input-bordered input-warning w-full" />
          </div>
          <div className="form-control w-full flex-1">
            <label className="label">
              <span className="label-text">
              Delivery Charge
              </span>
            </label>
            <input type="number" readOnly placeholder="Delivery Charge" {...register("price", { required: true})}
            className="input input-bordered input-warning w-full" value={price}/>
          </div>
         </div>
         <div className="flex w-full gap-4 my-6">
         <div className="flex-1">
         <label className="label">
              <span className="label-text">
              Delivery Address Latitude
              </span>
            </label>
            <input type="text" placeholder="Delivery Address Latitude"{...register("latitude", { required: true})}
            className="input input-bordered input-warning w-full" />
         </div>
          <div className="form-control w-full flex-1">
            <label className="label">
              <span className="label-text">
              Delivery Address Longitude
              </span>
            </label>
            <input type="text" placeholder="Delivery Address Longitude"{...register("longitude", { required: true})}
            className="input input-bordered input-warning w-full" />
          </div>
         </div>
       
         <button className="btn bg-gray-200 btn-outline border-orange-500 border-0 border-b-4 mt-4">Book Now</button>
        </form>
      </div>
           </div>
      
    );
};

export default Bookparcel;