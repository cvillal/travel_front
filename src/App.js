import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';


const App = () => {

  //Hooks
//travel card array state
const [travelCard, setNewTravelCard] = useState([]);

//display states
const [displayAddTravelCard, setDisplayAddTravelCard] = useState(false)

//Model states
const [newImage, setNewImage] = useState();
const [newPlace, setNewPlace] = useState();
const [newStay, setNewStay] = useState(false)
const [newLink, setNewLink] = useState()
const [newNotes, setNewNotes] = useState()
const [newRating, setNewRating] = useState(0)
const [newUsername, setNewUsername] = useState(' ')
const [newLat, setNewLat] = useState(0)
const [newLng, setNewLng] = useState (0)
//update states
const [showForm, setShowForm] = useState(false)



//get travel data
const getTravelCards = () => {
  axios
    .get('http://localhost:3000/tc', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then((response) =>{
        setNewTravelCard(response.data)
    });
}

//effect
useEffect(() => {
  getTravelCards()
}, [])

//create new travel card

const handleCreate = (addTC) => {
  addTC.preventDefault();
  axios.post('http://localhost:3000/tc',
    {
      image: newImage,
      place: newPlace,
      stay: newStay,
      link: newLink,
      notes:newNotes,
      rating:newRating,
      username:newUsername,
      lat: newLat,
      lng: newLng
    }
  ).then(() => {
    axios
      .get('http://localhost:3000/tc')
      .then((response) =>{
        setNewTravelCard(response.data)
      })
  })
  setDisplayAddTravelCard(!displayAddTravelCard)
}

//update travel card

const updateTravelCard = (travelData) => {
  axios.put(`http://localhost:3000/tc/${travelData._id}`,
    {
      image: newImage,
      place: newPlace,
      stay: newStay,
      link: newLink,
      notes:newNotes,
      rating:newRating,
      username:newUsername,
      lat: newLat,
      lng: newLng
    }
  ).then(() => {
    axios
      .get('http://localhost:3000/tc')
      .then((response) => {
        setNewTravelCard(response.data)
      })
  })
}

//delete travel card

const handleDelete = (deleteTC) => {
  axios.delete('http://localhost:3000/tc/'+ deleteTC._id)
       .then(() => {
        axios
          .get('http://localhost300/tc')
          .then((response) => {
            setNewTravelCard(response.data)
          })
       })
}

//displays

const showAddTravelCard = () => {
  setDisplayAddTravelCard(!displayAddTravelCard)
}
const editButton = () => {
  { showForm ? setShowForm(false) : setShowForm (true) }
}



//new card changes
const submitNewImage = (event) => {
  setNewImage(event.target.value)
}
const submitNewPlace = (event) => {
  setNewPlace(event.target.value)
}
const submitNewStay = (event) => {
  setNewStay(event.target.checked)
}
const submitNewLink = (event) => {
  setNewLink(event.target.value)
}
const submitNewNotes = (event) => {
  setNewNotes(event.target.value)
}
const submitNewRating = (event) => {
  setNewRating(event.target.value)
}
const submitNewUsername = (event) => {
  setNewUsername(event.target.value)
}
const submitNewLat = (event) => {
  setNewLat(event.target.value)
}
const submitNewLng = (event) => {
  setNewLng(event.target.value)
}

//MAP STUFF

const centers = [{
  lat: 37.832,
  lng: -122.424
},
{
  lat: 37.832,
  lng: -125.424
}];

const containerStyle ={
  width: '80vw',
  height: '80vh'
};
const center = {
  lat: 40.730610,
  lng: -73.935242
};

const NoSearchResults = () => {
    // {travelCard.map((i) => { 
    return (
      <>
    
        <Marker
          icon={{
            path:
              "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: "red",
            fillOpacity: 0.9,
            scale: 2,
            strokeColor: "gold",
            strokeWeight: 2,
          }}
          position={centers[0]}
        />
         
      </>
     
  )
  //  })}
}




  return (
    <div className="App">
      <h1>Lets travel</h1>
      <section>
        <button className='addButton' type= 'button' onClick={showAddTravelCard}>
          Add Travel Spot Here
        </button>
        {displayAddTravelCard?
          <div className='addformbox'>
            <form onSubmit = {handleCreate}>
              <label>Image link:</label><input type='text' onChange={submitNewImage}/><br/>
              <label>What's this place?</label><input type='text' onChange={submitNewPlace}/><br/>
              <label>Where'd you stay? <br/> airbnb </label><input type='checkbox' value='false' onChange={submitNewStay}/>
              <label>hotel</label><input type='checkbox' value='false' onChange={submitNewStay}/>
              <label>friend's place</label><input type='checkbox' value='false' onChange={submitNewStay}/><br/>
              <details><summary><label>Have a link of where you stayed?</label></summary><input type='text' onChange={submitNewLink}/></details>
              <label>Notes on the place:</label><input type='text' onChange={submitNewNotes}/><br/>
              <label>Rating:</label><input type='number' min='0' max='5' onChange={submitNewRating}/><br/>
              <label>Username:</label><input type='text' onChange={submitNewUsername}/><br/>

              <input className='inputbutton' type='submit' value='Post New Travel Card'/>
            </form>
          </div>
          : null }
      </section>
      

      <div className='travelCards'>
        {travelCard.map((tc) => {
          return (
            <div className="cards" key={tc._id}>
              <img src={tc.image} style={{height:"300px"}}/>
              <h5>What's this place? {tc.place}</h5>
              <h5>Where'd you stay? {tc.stay}</h5>
              <h5>{tc.link}</h5>
              <h5>My thoughts and tips: <br/>{tc.notes}</h5>
              <h5>Rating: {tc.rating}</h5>
              <h5>Username: {tc.username}</h5>
              
              <>
              <button onClick={editButton}>edit</button>
              <button onClick={(event) => {handleDelete(tc)}}>Delete this Travel Card</button>
              {showForm ? (
                <form  onSubmit={() => {updateTravelCard(tc)}}>
                <label>Image link:</label><input type='text' placeholder={tc.image} onChange={submitNewImage}/><br/>
                <label>What's this place?</label><input type='text' placeholder={tc.place} onChange={submitNewPlace}/><br/>
                <label>Where'd you stay? <br/> airbnb </label><input type='checkbox' value='false'  onChange={submitNewStay}/>
                <label>hotel</label><input type='checkbox' value='false' onChange={submitNewStay}/>
                <label>friend's place</label><input type='checkbox' value='false'  onChange={submitNewStay}/><br/>
                <details><summary><label>Have a link of where you stayed?</label></summary><input type='text' placeholder={tc.link} onChange={submitNewLink}/></details>
                <label>Notes on the place:</label><input type='text' placeholder={tc.notes} onChange={submitNewNotes}/><br/>
                <label>Rating:</label><input type='number' min='0' max='5' placeholder={tc.rating} onChange={submitNewRating}/><br/>
                <label>Username:</label><input type='text' placeholder={tc.username} onChange={submitNewUsername}/><br/>

                <input className='inputbutton' type='submit' value='Update Travel Card' onClick={(e) => {updateTravelCard(tc)}}/>
                
              </form>
              ) : (
              null
          )}
              
              </>
            </div>
          )
           
        
          
          
        })}
  <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GMKEY}
                        >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
              >
            
          <NoSearchResults/>
          
              </GoogleMap>
          
  </LoadScript>


      </div>


    </div>
  );




}

export default App;
