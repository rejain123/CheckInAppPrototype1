import React, {useState} from 'react'
import './Event.css'
export default function Event(props) {

    
    return (
        
        <div className="events">
            
            <div  className="events_card">
                <p>{props.eventName1}</p>
                <button onClick={  ()=>{props.changeMainPage(false);props.changePage(true)}} className="events_button"> Check In </button>
            </div>
            <div className="events_card">
                <p>{props.eventName2}</p>
                <button onClick={  ()=>{props.changeMainPage(false);props.changePage(true)}} className="events_button"> Check In </button>
            </div>
            <div className="events_card">
                <p>{props.eventName3}</p>
                <button onClick={  ()=>{props.changeMainPage(false);props.changePage(true)}}className="events_button"> Check In </button>
            </div>
            
        </div>
    )
}
