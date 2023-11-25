import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);
    return (
        <div>
            <SectionTitle heading="payment" subHeading="Pay to get service"></SectionTitle>
            <div className="mt-20">
                <h2 className="text-2xl mb-12">Please pay to confirm your booking..</h2>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;