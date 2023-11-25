import ConfettiExplosion from "react-confetti-explosion";
import Confetti from "react-confetti";


const PaymentSuccess = () => {
    
    return (
        <div>
             <Confetti wind={0.05}/>
            <div className="flex justify-center items-center h-[70vh]">< ConfettiExplosion />
            <p className="font-bold text-orange-400 text-3xl">Your payment successfull!!</p>
            </div>
           
        </div>
    );
};

export default PaymentSuccess;