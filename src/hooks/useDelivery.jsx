import { useEffect, useState } from "react";


const useDelivery = () => {
    const [deliveryman, setDeliveryman] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(deliveryman)

    const filter = deliveryman.filter((item) => item.role === 'deliveryman')
    console.log(filter);
    
    useEffect(() => {
        fetch('http://localhost:5002/users')
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