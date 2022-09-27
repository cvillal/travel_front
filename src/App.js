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
  axios.post('http://localhost:3000/tc',
    {
      image: newImage,
      place: newPlace,
      stay: newStay,
      link: newLink,
      notes:newNotes,
      rating:newRating,
      username:newUsername,
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





  return (
    <div className="App">
      <h1>Lets travel</h1>
      <section>
        <button className='addButton' onClick={showAddTravelCard}>
          Add Travel Spot Here
        </button>
        {displayAddTravelCard?
          <div className='addformbox'>
            <form onSubmit = {handleCreate}>
              <label> </label><input type='text' onChange={handleNew}
            </form>
          </div>}
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
