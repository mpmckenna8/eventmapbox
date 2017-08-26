import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import {setStateValue, triggerMapUpdate} from '../actions/index'


class EventList extends Component {

  render() {
    console.log('events to show are', this.props.events);
    let events = this.props.events;
    return (
      <div className="eventList absolute top bg-white w-full w420-mm shadow-darken25 flex-parent flex-parent--column">
        Events:

        { events.map( (event, i) => {
            let eventprops = event.properties;
            console.log('maping the events', eventprops);
            let classString = "eventDisplay" + (i%2) + " eventer"

            return (
              <div key={i} className={classString} onClick={ ()=>{

                    console.log('clicked on an event ', event.geometry.coordinates, this.props)
                    let newlocation = event.geometry.coordinates;
                    this.props.dispatch(setStateValue('eventLocation', event))
                    this.props.dispatch(triggerMapUpdate(true));


              } }>
                <h3>{eventprops.name}</h3>
                <p>{eventprops.date}</p>
                <p><a className="eventLink" target="_blank" href={eventprops.website}>
                   {eventprops.website}
                 </a>

                 </p>
              </div>
            )
        })
      }

      </div>)
  }

}


const mapStateToProps = (state) => {
//  console.log(state)
  return {
    contextMenuActive: state.app.contextMenuActive,
    mode: state.app.mode,
    events: state.app.eventsGeojson.features,
    eventLocation: state.app.eventLocation,



  };
};


export default connect(mapStateToProps)(EventList);
