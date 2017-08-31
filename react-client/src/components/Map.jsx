import React, {Component} from 'react';
import storeImg from '../img/Shop-icon.png';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.infowindow = null;
    this.callback = this.callback.bind(this);
    this.createMarker = this.createMarker.bind(this);
  }

  componentDidMount() {
    this.initMap(this.props.currLocation);
  }

  initMap(currLocation) {
    this.map = new google.maps.Map(this.refs.map, {
      center: currLocation,
      zoom: 16
    });

    this.infowindow = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);
    // this.service.nearbySearch({
    //   location: currLocation,
    //   radius: 500,
    //   type: ['store']
    // }, this.callback);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null && (nextProps.currLocation.lat !== this.props.currLocation.lat || nextProps.currLocation.lng !== this.props.currLocation.lng)) {
      this.map.setCenter(nextProps.currLocation);
      fetch(`https://data.sfgov.org/resource/6a9r-agq8.json?$where=within_circle(location, ${nextProps.currLocation.lat}, ${nextProps.currLocation.lng}, 500)&facilitytype='Truck'`)
      .then(response => response.json())
      .then(responseJson => {
        console.log('hi', responseJson);
        let tempResults = responseJson;
        for (let i = 0; i < tempResults.length; i++) {
          let marker = this.createMarker(tempResults[i]);
          console.log(tempResults[i].applicant, tempResults[i].cnn);
          tempResults[i].marker = marker;
        }
        this.props.saveSearchedResults(tempResults);
      });
    }
  }

  createMarker(place) {
   const pinIcon = new google.maps.MarkerImage(
        storeImg,
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
          content: `<div>${place.applicant}</div>
          <div>${place.address}</div>`,
    });

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.open(this.map, marker);
      setTimeout(() => { infowindow.close(); }, '1000');
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