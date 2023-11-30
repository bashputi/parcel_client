import { FcSearch } from "react-icons/fc";

const Banner = () => {
    return (
        <div  data-aos="fade-up"
        data-aos-duration="2500" className="mt-16 gap-8 lg:flex">
           <img className="lg:w-2/3 lg:pl-5" src="https://i.ibb.co/Gt0fNcg/Screenshot-2023-11-25-084643.png" alt="banner" />
           <div className="flex justify-center items-center">
            <div data-aos="zoom-in" data-aos-duration="3000" >
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