import './App.css';
import {useEffect, useState} from 'react';
import AddGuestForm from './components/forms/AddGuestForm';
import GuestsList from './components/GuestsList';

const apiUrl = 'http://localhost:4000';

function App() {
    console.clear();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isAttending] = useState(false);
    const [guestsList, setGuestsList] = useState([]);
    const [guest, setGuest] = useState({});

    useEffect(() => {
        // correct way to update title on useEffect
        document.title = 'Guests List';

        async function getGuests(url, callback) {
            const response = await fetch(`${url}/guests`);
            const guests = await response.json();
            console.log('fetched guests', guests);
            callback(guests);
        }

        getGuests(apiUrl, setGuestsList).catch((err) => {
            console.error(err);
        });

        // this empty array means this code is going to run only at first render
    }, []);

    /*    useEffect(() => {
            console.log('useEffect guest, guestsList', guest, guestsList);


        }, [guest, guestsList]);*/

    return (
        <div data-test-id="guest" className="App">
            <div>
                <h1>Guests</h1>
            </div>
            <ul>
                <GuestsList
                    apiUrl={apiUrl}
                    guestsList={guestsList}/>
            </ul>
            <AddGuestForm
                className="add-guest-form"
                apiUrl={apiUrl}
            />
        </div>
    );
}

export default App;
