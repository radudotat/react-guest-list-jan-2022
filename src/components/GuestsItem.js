import { useRef } from 'react';

export default function GuestsItem(props) {
  console.log('export default function GuestsList', props.children);
  const itemRef = useRef(props.item.id);

  async function removeGuest(item, ref) {
    const itemId = item.getAttribute('data-item-id');
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

  return (
    <li key={`item-${props.item.id}`} data-remove={props.item.id} ref={itemRef}>
      <div>
        {props.item.firstName} {props.item.lastName}
      </div>
      <button
        data-item-id={props.item.id}
        aria-label={`Remove ${props.item.firstName} ${props.item.lastName}`}
        onClick={(e) => {
          e.preventDefault();
          removeGuest(e.target, itemRef).catch((err) => {
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
