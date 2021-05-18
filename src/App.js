import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Components/Landing';
import AsteriodDetails from './Components/details';
class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/details" component={(props) => { return <AsteriodDetails {...props} /> }}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;