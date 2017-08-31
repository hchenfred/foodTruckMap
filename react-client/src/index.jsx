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
      searchedResults: [],
      trucks: [],
      showLoader: true
    }
    this.setCurrLocation = this.setCurrLocation.bind(this);
    this.saveSearchedResults = this.saveSearchedResults.bind(this);
  }

  componentDidMount() {
    fetch(`https://data.sfgov.org/resource/6a9r-agq8.json?$where=within_circle(location, 37.7749, -122.431297, 1000)&facilitytype='Truck'`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      this.setState({ searchedResults: responseJson, showLoader: false });
    });
  }

  setCurrLocation(location) {
    this.setState({currLocation: location});
  }

  saveSearchedResults(results) {
    this.setState({searchedResults: results});
  }

  render() {
    const loader = this.state.showLoader ? (<div className='loader'></div>) : null;
    return (
      <div className="container">
        <aside className="side-container">
          <Form setCurrLocation={this.setCurrLocation}/>
          <h3>Food Trucks Nearby</h3>
          {loader}
          <List searchedResults={this.state.searchedResults}/>
        </aside>
        <article className="map-container">
          <Map currLocation={this.state.currLocation} saveSearchedResults={this.saveSearchedResults}/>
        </article>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));