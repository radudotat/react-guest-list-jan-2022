import './App.css';
import { useEffect, useState } from 'react';
import AddGuestForm from './components/forms/AddGuestForm';
import GuestsList from './components/GuestsList';

const apiUrl = 'http://localhost:4000';

function App() {
  // console.clear();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [guestsList, setGuestsList] = useState([]);
  const [guest, setGuest] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getGuests(url, callback) {
    const response = await fetch(`${url}/guests`);
    const guests = await response.json();
    // console.log('1. fetched guests', guests);
    callback(guests);
  }

  // https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // correct way to update title on useEffect
    document.title = 'Guests List';

    getGuests(apiUrl, setGuestsList)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

    // this empty array means this code is going to run only at first render
  }, []);

  return (
    <div data-test-id="guest" className="App">
      <div>
        <h1>Guests</h1>
      </div>
      <div className={isLoading ? 'loading' : 'loaded'}>Loading...</div>
      <ul>
        <GuestsList
          apiUrl={apiUrl}
          guestsList={guestsList}
          isAttending={isAttending}
          setIsAttending={setIsAttending}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </ul>
      <AddGuestForm
        className="add-guest-form"
        isAttending={isAttending}
        setIsAttending={setIsAttending}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        guest={guest}
        setGuest={setGuest}
        setGuestsList={setGuestsList}
        guestsList={guestsList}
        apiUrl={apiUrl}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
