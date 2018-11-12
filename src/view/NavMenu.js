import React from 'react';
import { Link } from '@curi/react-dom';


export default function NavMenu() {
  return (
    <nav>
        <Link to="" style={{color: 'black'}}> <h1 className="text-center">Welcome to Bonanzaa</h1></Link>
        <h6>
          <div style={{textAlign: 'center'}}>
            <Link to="Find Zero" style={{color: 'black'}}> Find Zero </Link>
            |
            <Link to="Calc" style={{color: 'black'}}> Calculator</Link>
          </div>
        </h6>

        <h6>
          <div style={{textAlign: 'center', display: 'none'}}>
            <Link to="" style={{color: 'black'}}> Rules </Link>
            | 
            <Link to="New" style={{color: 'black'}}> NewBonanza</Link>
          </div>
        </h6>
        
        <hr />

    </nav>
  );
}
