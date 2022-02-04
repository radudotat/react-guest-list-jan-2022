import { useRef } from 'react';

export default function AddGuestForm(props) {
  const itemForm = useRef();
  const itemFirstName = useRef(props.firstName);
  const itemLastName = useRef(props.lastName);

  async function addNewGuest() {
    // console.log('addNewGuest', props, itemForm);

    if (props.firstName === '' || props.lastName === '') {
      return null;
    }

    const response = await fetch(`${props.apiUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: props.firstName,
        lastName: props.lastName,
        attending: props.isAttending,
      }),
    });

    const addedGuest = await response.json();

    if (addedGuest) {
      const newGuestsList = [...props.guestsList, addedGuest];
      // console.log('addedGuest', newGuestsList);
      props.setGuestsList(newGuestsList);
      // clear current state
      props.setFirstName('');
      props.setLastName('');
      itemFirstName.current.value = '';
      itemLastName.current.value = '';
    }

    // console.log('guest state changed', guest);
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // console.log('handleInputChange', target, value, name, itemForm);

    switch (name) {
      case 'firstName':
        props.setFirstName(value);
        break;

      case 'lastName':
        props.setLastName(value);
        if (event.key === 'Enter') {
          addNewGuest().catch(() => {});
          // itemForm.current.submit();
        }
        break;

      default:
        return null;
    }
  }

  return (
    <>
      {/* <pre> {JSON.stringify(props.guest)} </pre> */}
      <form
        ref={itemForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          First Name:
          <input
            name="firstName"
            ref={itemFirstName}
            disabled={props.isLoading}
            // value={props.firstName}
            onChange={(event) => {
              handleInputChange(event);
              // props.setFirstName(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Last Name:
          <input
            name="lastName"
            ref={itemLastName}
            disabled={props.isLoading}
            // value={props.lastName}
            onChange={(event) => {
              handleInputChange(event);
              // props.setLastName(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              handleInputChange(event);
              // props.setLastName(event.currentTarget.value);
            }}
          />
        </label>
        {/* <input type="submit" value="Add Guest" /> */}
      </form>
    </>
  );
}
