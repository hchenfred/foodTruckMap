import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  componentDidMount() {
    var center = new google.maps.LatLng(37.7749, -122.431297);
    var circle = new google.maps.Circle({
        center: center,
        radius: 10000
    });
    this.autocomplete = new google.maps.places.Autocomplete((
      document.getElementById('autocomplete')), {
        types: ['address'],
      });
    this.autocomplete.setBounds(circle.getBounds());
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);  
  }

  onPlaceChanged() {
    const place = this.autocomplete.getPlace();
    this.setState({searchTerm: place});
  }

  handleSubmitForm(e) {
    e.preventDefault();
    const geometry = this.state.searchTerm.geometry
    if (geometry === null || geometry === undefined) {
      document.querySelector('.dropdown-info').style.display = 'block';
    } else {
      const lat = geometry.location.lat();
      const lng = geometry.location.lng();
      this.props.setCurrLocation({lat, lng});
    }
  }

  render() {
    return (<div className="form-container">
      <form onSubmit={this.handleSubmitForm} className="location-form">
        <div className="row">
        <div className="form-group">
          <input onChange={this.handleInputChange} id="autocomplete" 
          className="form-control formInput" 
          type="text" 
          placeholder="Enter an address to search for food trucks" 
          required/>
          <div className="dropdown-info">Please use autocompleted address</div>
        </div>
        <div className="form-group">
          <input className="btn btn-info formInput submitBtn btn-block" type="submit" value="Search"/>
        </div>
        </div>
      </form>
    </div>);
  }
}

export default Form;