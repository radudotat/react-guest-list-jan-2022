import { useEffect, useState } from 'react';

export default function AddGuestForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending] = useState(false);
  const [guestsList, setGuestsList] = useState([]);
  const [guest, setGuest] = useState({});
  useEffect(() => {
    if (!guest.firstName || !guest.lastName) {
      return null;
    }
    // correct way to update title on useEffect
    // document.title = 'Guests List';

    async function addNewGuest(apiUrl, theGuest) {
      const response = await fetch(`${apiUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: theGuest.firstName,
          lastName: theGuest.lastName,
          attending: theGuest.isAttending,
        }),
      });

      const addedGuest = await response.json();

      if (addedGuest) {
        const newGuestsList = guestsList.concat(guest);
        // console.log('addedGuest', newGuestsList);
        setGuestsList(newGuestsList);
        // clear current state
        setFirstName('');
        setLastName('');
      }

      // console.log('guest state changed', guest);
    }

    // check if guest Object is not empty
    if (guest.firstName !== '' && guest.lastName !== '') {
      // console.log('useEffect guest ', props, guest)
      addNewGuest(props.apiUrl, guest).catch((err) => {
        console.error(err);
      });
    }
    // this empty array means this code is going to run only at first render
  }, [guest, guestsList, props.apiUrl]);

  /*    useEffect(() => {
            // check if guest Object is not empty
            if (guest.firstName !== '' && guest.lastName !== '') {
                // correct way to update title on useEffect
                //document.title = 'Guests List';
                console.log('useEffect guestsList ', props, guest)
            }

        }, [guestsList]);*/

  return (
    <>
      <pre> {JSON.stringify(guest)} </pre>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setGuest({
            firstName: firstName,
            lastName: lastName,
            isAttending: isAttending,
          });

          // const guests = [...guestsList, guest];
          // etGuestsList(guests);
          // console.log(props, guests, guest)
        }}
      >
        <label>
          First Name:
          <input
            name="firstName"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Last Name:
          <input
            name="lastName"
            value={lastName}
            onChange={(event) => {
              setLastName(event.currentTarget.value);
            }}
          />
        </label>
        <input type="submit" value="Add Guest" />
      </form>
    </>
  );
}
