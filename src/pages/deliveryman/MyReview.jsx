import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { useEffect, useState } from "react";
import useOrder from "../../hooks/useOrder";

const MyReview = () => {
    const loadList = useLoaderData();
    const [ratings, setRatings] = useState(loadList);
        const [firstMatchingItemId] = useOrder();
        console.log(firstMatchingItemId)
        console.log( ratings[0].ID)

        useEffect(() => {
            setRatings(loadList);
        }, [loadList]);
    
        const filter = ratings.filter((item) => item.ID === firstMatchingItemId);
            console.log(filter)

    return (
        <div>
            <SectionTitle data-aos="zoom-in" data-aos-duration="2000" heading={'Your Reviews'} subHeading={'...Keep Working Hard...'}></SectionTitle>
            
        </div>
    );
};

export default MyReview;