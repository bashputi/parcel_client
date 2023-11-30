import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CountUp from "react-countup";



const Statistics = () => {
 

    const axiosPublic = useAxiosPublic();

    const {data: stats} = useQuery({
        queryKey: ['stats'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/stats');
            return res.data;
        }
    })
    console.log(stats)

    return (
      
        <div data-aos="flip-down" data-aos-duration="2000" className="mt-12">
        <h1 className="text-center mb-10 text-2xl font-semibold">Statistics of website</h1>
        <div className="flex justify-center gap-8">
            <div className="stats shadow">
                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary">
                   
                     <CountUp start={0} end={stats?.users || 0} duration={12} />
                  
                    </div>
                </div>

                <div className="stat  text-white font-bold place-items-center">
                    <div className="stat-title">Reveiws</div>
                    <div className="stat-value text-secondary">
                       
                      <CountUp start={0} end={stats?.review} duration={7} />
                       
                    </div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Booked</div>
                    <div className="stat-value text-secondary">
                       
                        <CountUp start={0} end={stats?.bookItems || 0} duration={12} />
                       
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
};

export default Statistics;