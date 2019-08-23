import React from 'react';

import { Link } from 'react-router-dom'
import './styles/navicon.styles.css';
const NavIcon = (props) => {
    let url = '';
    let path = props.name.toLowerCase();
    if (path === 'home') {
        url = '';
    } else {
        url = path;
    }
    console.log(url);
    return (
        <Link className={`${props.status}`} to={url}>{ props.name }</Link>
    );
}

export default NavIcon;