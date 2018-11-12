import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BonanzaSolver from './view/BonanzaSolver';

class Bonanza extends Component {
    constructor(props) {
        super(props);
        this.state = {
    };
}

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={BonanzaSolver} />
                    <Route exact path="/rules" component={<h1>Page Under Construction</h1>} />
                </Switch>
            </BrowserRouter>
        );
    }

}

export default Bonanza;