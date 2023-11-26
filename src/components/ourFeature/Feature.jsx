import Statistics from "./Statistics";


const Feature = () => {
    return (
        <div className="my-20">
            <h1 className="font-extrabold text-4xl text-[#d78131] text-center mb-20">Our Features</h1>
            <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="card px-5 w-96 bg-base-100 shadow-xl">
                    <img className="pt-16" src="https://i.ibb.co/tHBhXnN/Screenshot-2023-11-24-224507.png" alt="image" />
                    <h2 className="font-bold text-xl text-gray-700">Extra Delivery Safety</h2>
                    <p className="mt-2 text-gray-500 pb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat excepturi voluptatibus illum velit quas in. Quos, doloremque. Consectetur, quos voluptate?</p>
                </div>
                <div className="card px-5 w-96 bg-base-100 shadow-xl">
                    <img src="https://i.ibb.co/QX5JxCD/Screenshot-2023-11-24-224507.png" alt="image" />
                    <h2 className="font-bold text-xl text-gray-700">Super Fast Delivery</h2>
                    <p className="mt-2 text-gray-500 pb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat excepturi voluptatibus illum velit quas in. Quos, doloremque. Consectetur, quos voluptate?</p>
                </div>
                <div className="card px-5 w-96 bg-base-100 shadow-xl">
                    <img className="pt-20" src="https://i.ibb.co/fFjwT6g/Screenshot-2023-11-24-224507.png" alt="image" />
                    <h2 className="font-bold text-xl text-gray-700">Remote Delivery</h2>
                    <p className="mt-2 text-gray-500 pb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat excepturi voluptatibus illum velit quas in. Quos, doloremque. Consectetur, quos voluptate?</p>
                </div>
            </div>
            </div>





            <Statistics></Statistics>
        </div>
    );
};

export default Feature;