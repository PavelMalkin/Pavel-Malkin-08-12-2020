import React from 'react';

import Search from "../elementary/Search";
import CityContainer from "./CityContainer";

function Home() {
    return (
        <div className='Home'>
            <Search/>
            <CityContainer/>
        </div>
    );
}

export default Home;