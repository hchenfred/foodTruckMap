import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <section className="list-group list">
      {props.searchedResults.map((truck, index) => {
       return  <ListItem truck={truck} key={truck.applicant + truck.cnn}/>
      }
    )}
  </section>
);

export default List;