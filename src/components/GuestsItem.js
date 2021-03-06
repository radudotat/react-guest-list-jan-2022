import { useEffect, useRef, useState } from 'react';

export default function GuestsItem(props) {
  console.log('export default function GuestsItem', props);
  const itemRef = useRef(props.item.id);
  const [isAttending, setIsAttending] = useState(false);

  async function removeGuest(item, ref) {
    props.setIsLoading(true);

    const itemId = ref.current.getAttribute('data-item-id');
    // console.log('removeGuest', itemId, ref);
    const response = await fetch(`${props.apiUrl}/guests/${itemId}`, {
      method: 'DELETE',
    });

    const deletedGuest = await response.json();

    if (!deletedGuest.error) {
      // console.log('deletedGuest', deletedGuest);
      if (itemId === deletedGuest.id) {
        ref.current.remove();
      }
    }
  }

  async function updateGuest(item, ref) {
    props.setIsLoading(true);

    // console.log('updateGuest', item, ref);
    const itemId = ref.current.getAttribute('data-item-id');
    const attendingStatus = item.checked;

    // console.log('~~~updateGuest', item, attendingStatus);

    const response = await fetch(`${props.apiUrl}/guests/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: attendingStatus }),
    });

    const updatedGuest = await response.json();

    if (!updatedGuest.error) {
      if (itemId === updatedGuest.id) {
        setIsAttending(updatedGuest.attending);
        // console.log('++++updatedGuest', props, item, updatedGuest);
      }
    }
  }

  useEffect(() => {
    setIsAttending(props.item.attending);
  }, [props.item.attending]);

  return (
    <li
      key={`item-${props.item.id}`}
      data-item-id={props.item.id}
      data-test-id="guest"
      ref={itemRef}
    >
      <input
        type="checkbox"
        name="attending"
        disabled={props.isLoading}
        aria-label={`${props.item.firstName} ${props.item.lastName} attending ${props.item.attending}`}
        checked={isAttending}
        onChange={(e) => {
          // console.log('checked', e.target, e.target.checked);
          e.preventDefault();
          updateGuest(e.target, itemRef)
            .then(() => {
              props.setIsLoading(false);
            })
            .catch((err) => {
              console.error(err);
              props.setIsLoading(false);
            });
        }}
      />
      <div>
        {props.item.id}. {props.item.firstName} {props.item.lastName}
      </div>
      <button
        // data-item-id={props.item.id}
        aria-label={`Remove ${props.item.firstName} ${props.item.lastName}`}
        disabled={props.isLoading}
        onClick={(e) => {
          e.preventDefault();
          removeGuest(e.target, itemRef)
            .then(() => {
              props.setIsLoading(false);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        Remove
      </button>
      {/* {JSON.stringify(item)}*/}
    </li>
  );
}
