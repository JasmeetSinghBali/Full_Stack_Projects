import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './routes/Home';
import ShopsDetailPage from './routes/ShopsDetailPage';
import UpdatePage from './routes/UpdatePage';
import { ShopsContextProvider } from './context/ShopsContext';

const App = () => {
  return(
      <ShopsContextProvider>
        <div className="container">
            <Router>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/shops/:id/update" component={UpdatePage}/>
                <Route exact path="/shops/:id" component={ShopsDetailPage}/>
              </Switch>
            </Router>
        </div>
      </ShopsContextProvider>
   
  )
}

export default App;
