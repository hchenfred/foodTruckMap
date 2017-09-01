import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Map from '../src/components/Map.jsx';
import Form from '../src/components/Form.jsx';
import List from '../src/components/List.jsx';
import './style.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLocation: {lat: 37.7749, lng: -122.4194},
      searchedResults: []
    }
    this.setCurrLocation = this.setCurrLocation.bind(this);
    this.saveSearchedResults = this.saveSearchedResults.bind(this);
  }

  setCurrLocation(location) {
    this.setState({currLocation: location});
  }

  saveSearchedResults(results) {
    this.setState({searchedResults: results});
  }

  render() {
    // const loader = this.state.showLoader ? (<div className='loader'></div>) : null;
    return (
      <div className="container">
        <aside className="side-container">
          <Form setCurrLocation={this.setCurrLocation}/>
          <h3>Food Trucks Nearby</h3>
          <List searchedResults={this.state.searchedResults}/>
        </aside>
        <article className="map-container">
          <Map currLocation={this.state.currLocation} saveSearchedResults={this.saveSearchedResults}/>
        </article>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));