import animation from "../../public/animation.json"
import orderAnimation from "../../public/orderAnimation.json"
import Lottie from 'react-lottie';



const TopDeliveryMan = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    const options = {
        loop: true,
        autoplay: true, 
        animationData: orderAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <div className="my-32">
           
           <div className="lg:flex justify-center gap-28">
         
           <div>
           <h1 data-aos="zoom-in" data-aos-duration="3000"  className="font-extrabold text-4xl text-[#d78131] text-center mb-20">Place Order</h1>
           <Lottie options={options}
              height={400}
              width={400}
            />
           </div>

            <div>
            <h1 data-aos="zoom-in" data-aos-duration="3000"  className="font-extrabold text-4xl text-[#d78131] text-center mb-20">Receive Parcel</h1>
            <Lottie options={defaultOptions}
              height={400}
              width={400}
            />
            </div>
           </div>
        </div>
    );
};

export default TopDeliveryMan;