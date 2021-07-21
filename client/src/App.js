import './App.css';
import React, {useState,useEffect, Component } from 'react';
import Event from './Event';
import Axios from "axios"
import axios from 'axios';


function App() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [bookingID, setBookingID]=useState("");
  const [event,setEvent]=useState("");
  const [mainPage,setMainPage]=useState(true);
  const[checkInPage,setCheckInPage]=useState(false)
  const [mainUserCheckIn,setMainUserCheckIn]=useState(false)
  const [checkedInPeople,setCheckedInPeople]=useState(false)
  const[BacktoZero,setBacktoZero]=useState(true)
  const[PartyNumber,setPartyNumber]=useState(1)
  const[ getStatsPage, setgetStatsPage]=useState(false)
  const[totalNumberofCheckIns,setTotalNumberofCheckIns]=useState(0)
  const[totalNumberofPeople,setTotalNumberofPeople]=useState(0)
  const eventList=["park gathering","salsa dancing","cooking session","painting class","happy hour","tennis lesson"]
  const [checkInsPerEvent,setCheckInsPerEvent]=useState([])
  const[ category1,setCategory1]=useState([])

  //const [category,setCategory]=useState([])

  
  const addMainUserTable =() =>{
    //add the main user, whose name the tickets will be under, to the database
    Axios.post("http://localhost:3001/insert/newUser",{
      name:name,
      email:email,
      bookingID:bookingID,
      event:event

      
    })


  }

  const getStatsPagefunc = ()=>{
    setCheckInPage(false)
    setMainPage(false)
    setgetStatsPage(true)
  }
  const addPeopleFromParty=()=>{
    if(!BacktoZero){
        setCheckedInPeople(false)
        console.log(checkedInPeople)
    }
    console.log(name,email,bookingID,event,checkedInPeople,PartyNumber)

    Axios.post("http://localhost:3001/insert/newUser",{
      name:name,
      email:email,
      bookingID:bookingID,
      event:event,
      check_ins: checkedInPeople,
      PartyNumber:PartyNumber
      
      
    })
    setBacktoZero(true)
  }
  
  const checkInPeople=(value)=>{
    console.log(value)
    setCheckedInPeople(value)
    setBacktoZero(false)
    
  }

  const clearDatabase=()=>{
    console.log("time to clear database")
    Axios.delete("http://localhost:3001/delete")
  }
  
  const updateUser=()=>{
    console.log(mainUserCheckIn)
    setMainUserCheckIn(!mainUserCheckIn)
    //if(mainUserCheckIn){
      console.log("checked in")
      Axios.put("http://localhost:3001/update",{
        check_ins: !mainUserCheckIn,
        name:name,
        bookingID:bookingID,
        PartyNumber:PartyNumber
      })
      //update database for the main user
   // }


  }

  async function getStats(){
    let category=[]
    let a=[{name:"a"},{name:"b"}]
    let c=[...a]
    const d=c.filter((element)=>element.name == "a")
    console.log(d)

    const response=await fetch("http://localhost:3001/data")
      const databaseArray=await response.json()
      console.log(databaseArray)

      //get total number of people
      const totalNumberofPeopleTemp=databaseArray.length
      setTotalNumberofPeople(totalNumberofPeopleTemp)

      //get total number of people who have checked in
      let duplicateDatabaseArray=[...databaseArray]
     const filteredArrayCheckIns=duplicateDatabaseArray.filter((element)=>element.check_ins=="1")
      console.log(filteredArrayCheckIns)
      
      const totalNumberofCheckInsTemp=filteredArrayCheckIns.length
      setTotalNumberofCheckIns(totalNumberofCheckInsTemp)

      //get total number of checkins per event
      let num=0
      let totalNum=0;
      eventList.map(value=>{
        num=0
        totalNum=0

        duplicateDatabaseArray.filter((element)=>element.event == 
          value).map(elem=>{
            totalNum+=1
            if(elem.check_ins=="1"){
              num+=1
            }
          })
         
          //setCheckInsPerEvent([...checkInsPerEvent,{eventName:value,checkIns:num}])
          console.log(num)
          console.log(value)
          category=[...category,{Event:value,Number:num,TotalNumber:totalNum}]
          setCheckInsPerEvent([...checkInsPerEvent,{Number:num}])


      }
      )
      setCategory1(category)

      console.log(category)

     


  }
 
  return (
    <div className="App">
       
        {mainPage? <>
          <div className="app_personalInfo">
            <label className="app_personalInputs" >Enter Your Name </label>
            <input onChange={(event)=>{setName(event.target.value)}} className="app_personalInputs" type="text" ></input>
            <label className="app_personalInputs" >Enter Your Email  </label>
            <input  onChange={(event)=>{setEmail(event.target.value)}} className="app_personalInputs" type="text" ></input>
            <label className="app_personalInputs" >Enter Your bookingID </label>
            <input onChange={(event)=>{setBookingID(event.target.value)}} className="app_personalInputs" type="text" ></input>
            <label>Choose Your Event: </label>
            <input onChange={(event)=>{setEvent(event.target.value)}} className="app_personalInputs" type="text" ></input>
            <button onClick={addPeopleFromParty} className="app_saveButton">Save</button>

            <label>Ready to Check In? </label>
            <Event 
              eventName1="Park Gathering" 
              eventName2="Salsa Dancing"
              eventName3="Painting Class" 
              changePage={word=>setCheckInPage(word)}

              changeMainPage={word1=>setMainPage(word1)}

              // changePage={word=>setCheckInPage(word)}
              // ignoreFirstPage={word1=>setMainPage(word1)}
            />
            <Event 
              eventName1="Tennis Lesson" 
              eventName2="Cooking Session"
              eventName3="Happy Hour"
              changePage={word=>setCheckInPage(word)}

              changeMainPage={word1=>setMainPage(word1)}
            />
            <button onClick={clearDatabase}>Clear DataBase</button>

        </div>

          </> : null}

          { checkInPage?  <>
          <div>

       
          <div className="app_personalInfo">
            <p>How Many People are in your party? </p>
            <input onChange={(event)=>{setPartyNumber(event.target.value)}} type="number"></input>
           
            <p>Are you checking yourself in? </p>
            <input  className="app_checkbox"   onClick={updateUser} type="checkbox"></input>
            <p>List the names of everyone else in your party : </p>
            <div className="app_checkin">
            <p>Name</p>
            <p>Check In</p>
            </div>
            
            <div className="app_checkin">
            <input onChange={(event)=>{setName(event.target.value)}} type="text"></input>
              <input onClick={(event)=>checkInPeople(event.target.checked)} className="app_checkbox" type="checkbox"></input>
              <input onClick={addPeopleFromParty} className="app_submit" type="submit"></input>

            </div>
            <div className="app_checkin">
            <input onChange={(event)=>{setName(event.target.value)}} type="text"></input>
              <input onClick={(event)=>checkInPeople(event.target.checked)} className="app_checkbox" type="checkbox"></input>
              <input onClick={addPeopleFromParty} className="app_submit" type="submit"></input>

            </div>
            <div className="app_checkin">
            <input onChange={(event)=>{setName(event.target.value)}} type="text"></input>
              <input onClick={(event)=>checkInPeople(event.target.checked)}  className="app_checkbox" type="checkbox"></input>
              <input onClick={addPeopleFromParty} className="app_submit" type="submit"></input>

            </div>
            <div className="app_checkin">
            <input onChange={(event)=>{setName(event.target.value)}} type="text"></input>
              <input onClick={(event)=>checkInPeople(event.target.checked)}  className="app_checkbox" type="checkbox"></input>
              <input onClick={addPeopleFromParty} className="app_submit" type="submit"></input>

            </div>
            <div className="app_checkin">
            <input onChange={(event)=>{setName(event.target.value)}} type="text"></input>
              <input onClick={(event)=>checkInPeople(event.target.checked)}  className="app_checkbox" type="checkbox"></input>
              <input onClick={addPeopleFromParty} className="app_submit" type="submit"></input>

            </div>
            
            
          </div>
          <button onClick={getStatsPagefunc}>Get Stats</button>
          </div>
          </> : null}
          
          {getStatsPage? <>
            <div className="app_statsDetails">
            <button onClick={getStats}>Get Stats</button>
            <p>Total Number of people: {totalNumberofPeople}</p>
           <p>Total Number of Check Ins: {totalNumberofCheckIns}</p>
           {console.log(category1)}
            {category1.map((elem)=>{
              return(
                <div >
                 {elem.Event} 
                 <ol>
                    <p>There are {elem.Number} people checked in for {elem.Event} </p>
                    <p>Total of {elem.TotalNumber} people have signed up for {elem.Event} </p>
                 </ol>
                  

                </div>
               

              )

              
            })}
            </div>
            
                  
            </> : null}

        
          
         
        
      
    </div>
  );
}

export default App;
