import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { routerData } from './utils/routerData';

export default function Menu() {
    const navigate = useNavigate();

    return (
        <ul>
      {routerData.map((i, key) => {
        return (
          <Link
            to={i.path}
            style={{cursor: 'pointer', marginRight: '20px'}}
            // onClick={() => {
            //   navigate(i.path);
            // }}
            key={key}
          >
            {i.name}
          </Link>
        );
      })}
    </ul>
    )
}
