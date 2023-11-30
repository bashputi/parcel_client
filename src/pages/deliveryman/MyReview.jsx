import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { useEffect, useState } from "react";
import useOrder from "../../hooks/useOrder";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';

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
        <div className="my-12">
            <SectionTitle data-aos="zoom-in" data-aos-duration="2000" heading={'Your Reviews'} subHeading={'...Keep Working Hard...'}></SectionTitle>
            <div className="my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    ratings.length && ratings.map(item => (
                        <div key={item._id} className="w-72 ">
                             <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt="green iguana"
                        />
                    <CardContent>
                    <Grid container alignItems="center">
                    <Typography variant="h6" component="span" margin="5px">Ratings:</Typography>
                    <Typography variant="h5" component="span" style={{ color: 'red' }}>
                        {item.review}
                    </Typography>
                    <Typography variant="h6" component="span">/5</Typography>
                    </Grid>
                    <Grid container alignItems="center">
                    <Typography variant="h6" component="span" margin="5px">Review By:</Typography>
                    <Typography variant="h6" component="span" style={{ color: 'green' }}>
                        {item.name}
                    </Typography>
                    
                    </Grid>
                    <Grid container margin="10px">
                    <Typography component="span" color="text.secondary">
                        {item.text}
                    </Typography>
                    
                    </Grid>
                    
                       
                        </CardContent>
                    </CardActionArea>
                    </Card>

                            </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MyReview;