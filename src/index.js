import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { curiProvider } from '@curi/react-dom';

import './assets/foundation/foundation.min.css';
import "./index.css";
import routes from './utils/Routes';
import NavMenu from './view/NavMenu';

import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

//ReactDOM.render(<BonanzaSolver />, document.getElementById("root"));
ReactDOM.render((
  <Router>
    {({ response, router }) => {
      const { body:Body } = response;
      return (
        <div>
          <header>
            <NavMenu />
          </header>
          <main>
            <Body response={response} router={router} />
          </main>
        </div>
      );
    }}
  </Router>
), document.getElementById('root'));
registerServiceWorker();

//https://github.com/gitname/react-gh-pages
