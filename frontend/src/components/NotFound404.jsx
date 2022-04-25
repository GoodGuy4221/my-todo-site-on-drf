import React from "react";

import notFound from '../images/notFound.png'

const NotFound404 = ({location}) => {
    return(
        <>
            <img src={notFound} alt=""/>
            <h1 style={{'color': 'red'}}>Страница не найдена: {location.pathname}</h1>
        </>
    )
}

export default NotFound404
