import React, {Component} from 'react';
import Card from './../components/Card';

class NewBonanza extends Component {
    render() {
        return(
            <div className="grid-container grid-x">
                <div className="small-12 grid-x">
                    <div className="medium-6 small-12 grid-x">
                        <div className="small-3" style={{backgroundColor: 'red'}}><Card/></div>
                        <div className="small-3"><Card/></div>
                        <div className="small-3"><Card/></div>
                        <div className="small-3"><Card/></div>
                    </div>
                    <div className="medium-6 small-12"></div>
                </div>
            </div>
        );
    };
}

export default NewBonanza;