import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useBook from "../../hooks/useBook";
import { useNavigate } from "react-router-dom";



const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [book] = useBook();
    const navigate = useNavigate();

    const totalPrice = book.reduce( (total, item) => total + item.price , 0);

    useEffect(() => {
     if(totalPrice > 0){
      axiosSecure.post('/create-payment-intent', {price: totalPrice})
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
    }, [axiosSecure, totalPrice])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
          return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
          return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          setError(error.message);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
        }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.display || 'anonymous'
          }
        }
      })
      if(confirmError){
        // console.log('confirm errror')
      }else{
        if(paymentIntent.status === 'succeeded'){
        //   console.log('transaction id', paymentIntent.id);
          setTransactionId(paymentIntent.id);

          const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            cartIds: book.map(item => item._id),
            menuItemIds: book.map(item => item.menuId),
            status: 'pending'
         }
         const res = await axiosSecure.post('/payments', payment);
         
         if(res.data?.paymentResult?.insertedId){
          
          navigate('paymentsuccess');
         }
        }
      }
    };
 


    return (
        <form data-aos="zoom-in" data-aos-duration="2000" onSubmit={handleSubmit}>
              <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" className="btn mt-10 bg-gray-200 btn-outline border-orange-500 border-0 border-b-4" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="mt-8 text-red-600">{error}</p>
      {transactionId && <p className="mt-8 text-green-600">Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;