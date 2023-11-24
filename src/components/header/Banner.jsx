import { FcSearch } from "react-icons/fc";

const Banner = () => {
    return (
        <div className="mt-16 gap-8 lg:flex">
           <img className="lg:w-2/3 lg:pl-5" src="https://i.ibb.co/1d09QgW/Screenshot-2023-11-25-001139.png" alt="banner" />
           <div className="flex justify-center items-center">
            <div>
            <p className="text-2xl uppercase mb-3 text-[#d78131] md:text-4xl font-bold">Door to door, day to day...</p>
            <p className="md:text-lg font-medium mb-5 text-gray-500">You stay at home we delivery</p>
            <div className="join">
                <input type="text" placeholder="Search here..." className="input input-bordered join-item" /> 
                <button className="btn join-item"> <FcSearch  className="h-8 w-8"/> </button>
            </div>
            </div>
           </div>
        </div>
    );
};

export default Banner;