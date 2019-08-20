import React from 'react';

import { Link } from 'react-router-dom'
import './styles/navicon.styles.css';
const NavIcon = (props) => {
    return (
        <Link className={`${props.status}`} to={`${props.name.toLowerCase()}`}>{ props.name }</Link>
    );
}

export default NavIcon;