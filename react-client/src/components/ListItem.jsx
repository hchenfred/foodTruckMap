import React, { Component } from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.truck.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      this.props.truck.marker.setAnimation(null);
     }, 1000);
  }

  render() {
    const {applicant, address, dayshours, fooditems} = this.props.truck;
    return (
      <div onClick={this.handleClick} className="card">
        <h5 className="card-title">
          {applicant}
        </h5>  
        <p><i className="fa fa-calendar" aria-hidden="true"></i> {dayshours}</p>
        <p><i className="fa fa-cutlery" aria-hidden="true"></i> {fooditems}</p>
        <p><i className="fa fa-map-marker" aria-hidden="true"></i> {address}</p>
      </div>
    );
  }
};

export default ListItem;