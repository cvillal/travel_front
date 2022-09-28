import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

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
const [newRating, setNewRating] = useState()
const [newUsername, setNewUsername] = useState()
const [newLat, setNewLat] = useState(0)
const [newLng, setNewLng] = useState (0)
//update states




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



//displays

const showAddTravelCard = () => {
  setDisplayAddTravelCard(!displayAddTravelCard)
}

//new card changes
const submitNewImage = (event) => {
  setNewImage(event.target.value)
}
const submitNewPlace = (event) => {
  setNewPlace(event.target.value)
}
const submitNewStay = (event) => {
  setNewStay(event.target.value)
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
              <label>Rating:</label><input type='text' onChange={submitNewRating}/><br/>
              <label>Username:</label><input type='text' onChange={submitNewUsername}/><br/>

              <input className='inputbutton' type='submit' value='Post New Travel Card'/>
            </form>
          </div>
          : null }
      </section>
      

      <div className='travelCards'>
        {travelCard.map((tc) => {
          return (
            <div key={tc._id}>
            <img src={tc.image}/>
            <h5>What's this place? {tc.place}</h5>
            <h5>Where'd you stay? {tc.stay}</h5>
            <h5>{tc.link}</h5>
            <h5>My thoughts and tips: <br/>{tc.notes}</h5>
            <h5>Rating: {tc.rating}</h5>
            <h5>Username: {tc.username}</h5>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
