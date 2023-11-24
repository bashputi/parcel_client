

const Statistics = () => {
    return (
        <div className="mt-12">
            <h1 className="text-center mb-10 text-2xl font-semibold">Statistics of website</h1>
             <div className="flex justify-center">
                <div className="stats shadow">
                <div className="stat place-items-center">
                <div className="stat-title">Users</div>
                <div className="stat-value">31K</div>
                 </div>
            
                <div className="stat place-items-center">
                    <div className="stat-title">Delivered</div>
                    <div className="stat-value text-secondary">4,200</div>
                </div>
            
                <div className="stat place-items-center">
                    <div className="stat-title">Booked</div>
                    <div className="stat-value">1,200</div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;