import { Helmet } from "react-helmet";
import TopDeliveryMan from "../components/TopDeliveryMan";
import Banner from "../components/header/Banner"
import Feature from "../components/ourFeature/Feature";

const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>PAKEED | Home </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Banner></Banner>
            <TopDeliveryMan></TopDeliveryMan>
            <Feature></Feature>
            
        </div>
    );
};

export default Home;