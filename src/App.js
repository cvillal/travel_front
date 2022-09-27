import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {

const [travelCard, setNewTravelCard] = useState([]);

const [newImage, setNewImage] = useState();
const [newPlace, setNewPlace] = useState();
const [newStay, setNewStay] = useState(false)
const [newLink, setNewLink] = useState()
const [newNotes, setNewNotes] = useState()
const [newRating, setNewRating] = useState()
const [newUsername, setNewUsername] = useState()

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
}










  return (
    <div className="App">
      <h1>Lets travel</h1>
      
      <div className='travelCards'>
        {travelCard.map((tc) => {
          return (
            <div key={tc._id}>
            <img src={tc.image}/>
            <h5>{tc.place}</h5>
            <h5>{tc.stay}</h5>
            <h5>{tc.link}</h5>
            <h5>{tc.notes}</h5>
            <h5>{tc.rating}</h5>
            <h5>{tc.username}</h5>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
