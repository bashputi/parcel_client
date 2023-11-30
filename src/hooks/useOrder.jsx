import { useEffect, useState } from "react";
import useAuth from "./useAuth";


const useOrder = () => {
    const [orderlists, setOrderlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [firstMatchingItemId, setFirstMatchingItemId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5002/users')
            .then((res) => res.json())
            .then(data => {
                setOrderlists(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const find = orderlists.filter((item) => item.email === user.email);
        console.log(find);

        if (find.length > 0) {
            const firstMatchingItem = find[0]; 
            console.log(firstMatchingItem._id); 
            setFirstMatchingItemId(firstMatchingItem._id);
        } else {
            setFirstMatchingItemId(null); 
        }
    }, [orderlists, user.email]);

    return [firstMatchingItemId, loading];
};

export default useOrder;