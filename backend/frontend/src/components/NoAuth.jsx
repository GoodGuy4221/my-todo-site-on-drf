import React from 'react'
import {Link} from "react-router-dom";

const NoAuth = () => {
    return (
        <>
        <p>Войдите в свой <Link to='/auth'>аккаунт</Link> для возможного получения информации!</p>
        </>
    )
}

export default NoAuth
