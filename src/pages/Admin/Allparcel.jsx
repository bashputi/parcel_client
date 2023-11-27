
import useBook from "../../hooks/useBook";


const Allparcel = () => {
    // const parcelData = useLoaderData();
    // const [parcel, setParcel] = useState(parcelData);
    const [book] = useBook();
  // console.log(book)
    return (
        <div>
             <div className="flex justify-evenly mt-12 mb-8">
      <div>
      
      <h1 className="text-4xl font-semibold text-gray-700">All Ordered Parcel</h1>
      <h2 className="text-2xl mt-5 text-center text-gray-700">Item: {book.length}</h2>
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
              <th>Client Name</th>
              <th>Client Phone No</th>
              <th>Booking Date</th>
              <th>Requested Delivery Date</th>
              <th>Cost</th>
            
        
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
           {
            book.length && book.map((item, index) => (
                <tr key={item._id}>
                <th>
                 {index + 1}
                </th>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.phnno}
               
                </td>
            
                <td>
                    {item.time}
                </td>
                <td>
                    {item.date}
                  
                </td>
                <td>
                   {item.price}
                </td>

                <td>
                    {item.status}
                </td>
                <td>
                    <button className="btn btn-outline btn-warning">Manage</button>
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

export default Allparcel;