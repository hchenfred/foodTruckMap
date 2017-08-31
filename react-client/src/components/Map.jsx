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
    this.service.nearbySearch({
      location: currLocation,
      radius: 500,
      type: ['store']
    }, this.callback);
  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let tempResults = results;
      for (var i = 0; i < tempResults.length; i++) {
        let marker = this.createMarker(tempResults[i]);
        tempResults[i].marker = marker;
      }
      this.props.saveSearchedResults(results);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null && (nextProps.currLocation.lat !== this.props.currLocation.lat || nextProps.currLocation.lng !== this.props.currLocation.lng)) {
      this.map.setCenter(nextProps.currLocation);
      this.service.nearbySearch({
        location: nextProps.currLocation,
        radius: 500,
        type: ['store']
      }, this.callback);
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
    const placeLoc = place.geometry.location;
    const marker = new google.maps.Marker({
      map: this.map,
      icon: pinIcon,
      position: place.geometry.location
    });

    const infowindow = new google.maps.InfoWindow({
          content: `<div>${place.name}</div>`,
    });

    google.maps.event.addListener(marker, 'mouseover', () => {
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