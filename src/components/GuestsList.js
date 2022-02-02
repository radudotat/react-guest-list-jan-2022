// import { useEffect, useRef, useState } from 'react';
import GuestsItem from './GuestsItem';

export default function GuestsList(props) {
  // console.log('export default function GuestsList', props);

  const guestsList = props.guestsList.map((item) => {
    // console.log('map', item);
    return (
      <GuestsItem key={`item-${item.id}`} apiUrl={props.apiUrl} item={item} />
    );
  });

  return guestsList;
}
