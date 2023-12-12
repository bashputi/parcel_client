import { useEffect, useState } from "react";


const useDelivery = () => {
    const [deliveryman, setDeliveryman] = useState([]);
    const [loading, setLoading] = useState(true);

    const filter = deliveryman.filter((item) => item.role === 'deliveryman')
    
    useEffect(() => {
        fetch('https://parcel-delivery-server.vercel.app/users')
            .then((res) => res.json())
            .then(data => {
    
                setDeliveryman(data)
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return [filter, loading]
};

export default useDelivery;