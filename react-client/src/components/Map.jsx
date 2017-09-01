import React, {Component} from 'react';
import foodImg from '../img/food.png';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.infowindow = null;
    this.createMarker = this.createMarker.bind(this);
    this.createAllMarkers = this.createAllMarkers.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
  }

  componentDidMount() {
    this.initMap(this.props.currLocation);
  }

  initMap(currLocation) {
    this.map = new google.maps.Map(this.refs.map, {
      center: currLocation,
      zoom: 15
    });

    this.infowindow = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);
    this.markers = [];
    fetch(`https://data.sfgov.org/resource/6a9r-agq8.json?$where=within_circle(location, 37.7749, -122.431297, 1000)&facilitytype='Truck'`)
    .then(response => response.json())
    .then(responseJson => {
      this.createAllMarkers(responseJson);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null && (nextProps.currLocation.lat !== this.props.currLocation.lat || nextProps.currLocation.lng !== this.props.currLocation.lng)) {
      this.clearMarkers();
      this.map.setCenter(nextProps.currLocation);
      fetch(`https://data.sfgov.org/resource/6a9r-agq8.json?$where=within_circle(location, ${nextProps.currLocation.lat}, ${nextProps.currLocation.lng}, 500)&facilitytype='Truck'`)
      .then(response => response.json())
      .then(responseJson => {
        console.log('hi', responseJson);
        this.createAllMarkers(responseJson);
      });
    }
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    })
  }

  createAllMarkers(trucks) {
    let tempResults = trucks;
    for (let i = 0; i < tempResults.length; i++) {
      let marker = this.createMarker(tempResults[i]);
      this.markers.push(marker);
      tempResults[i].marker = marker;
    }
    this.props.saveSearchedResults(tempResults);
  }

  createMarker(place) {
   const pinIcon = new google.maps.MarkerImage(
        foodImg,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(40, 40),
    );    
    const placeLoc = {lat: Number(place.latitude), lng: Number(place.longitude)};
    const marker = new google.maps.Marker({
      map: this.map,
      icon: pinIcon,
      position: placeLoc
    });

    const infowindow = new google.maps.InfoWindow({
          content: `<div class="card">
          <h5 className="card-title">
            ${place.applicant}
          </h5>  
          <p><i class="fa fa-calendar" aria-hidden="true"></i> ${place.dayshours}</p>
          <p><i class="fa fa-cutlery" aria-hidden="true"></i> ${place.fooditems}</p>
          <p><i class="fa fa-map-marker" aria-hidden="true"></i> ${place.address}</p>
        </div>`,
    });

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.open(this.map, marker);
      setTimeout(() => { infowindow.close(); }, '2000');
    });
    
    return marker;
  }

  render() {
    return (
      <div ref="map" className="map" />
    );
  }
};

export default Map;