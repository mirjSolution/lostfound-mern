import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from '././component/auth/Login';
import Register from '././component/auth/Register';
import Alert from './component/layout/Alert';
import Items from './component/items/Items';
import AddItem from './component/items/add-item.component';
import EditItem from './component/items/edit-item.component';
// import Contact from './component/contact/Contact';
import Report from './component/reports/Report';
import Message from './component/messages/Message';
import ClaimedEmployee from './component/claimedemp/Claimedemp';
import ClaimedGuest from './component/claimedguest/Claimedguest';
import ToBeClaimed from './component/tobeclaimed/ToBeClaimed';
import PerishableToRelease from './component/perishable/PerishableToRelease';
import NonvaluableToRelease from './component/nonvaluable/NonvaluableToRelease';
import ValuableToRelease from './component/valuable/ValuableToRelease';
import GstClaimStub from './component/gstclaimstub/gst-claim-stub';

import NotFound from './component/layout/NotFound';
import PrivateRoute from './component/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Navbar />

          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Switch>
              <PrivateRoute exact path='/register' component={Register} />
              <PrivateRoute exact path='/additem' component={AddItem} />
              <PrivateRoute exact path='/edititem/:id' component={EditItem} />
              <PrivateRoute
                exact
                path='/gstclaimstub/:id'
                component={GstClaimStub}
              />
              <PrivateRoute exact path='/reports' component={Report} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/items' component={Items} />
              {/*<Route exact path='/contact' component={Contact} /> */}
              <PrivateRoute exact path='/message' component={Message} />
              <PrivateRoute
                exact
                path='/claimedemp'
                component={ClaimedEmployee}
              />
              <PrivateRoute
                exact
                path='/claimedguest'
                component={ClaimedGuest}
              />
              <PrivateRoute exact path='/tobeclaimed' component={ToBeClaimed} />
              <PrivateRoute
                exact
                path='/perishables'
                component={PerishableToRelease}
              />
              <PrivateRoute
                exact
                path='/nonvaluable'
                component={NonvaluableToRelease}
              />
              <PrivateRoute
                exact
                path='/valuable'
                component={ValuableToRelease}
              />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
