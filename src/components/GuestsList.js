import GuestsItem from './GuestsItem';

export default function GuestsList(props) {
  // console.log('export default function GuestsList', props);

  const guestsList = props.guestsList.map((item) => {
    // console.log('map', item);
    return (
      <GuestsItem
        data-test-id="guest"
        key={`item-${item.id}`}
        apiUrl={props.apiUrl}
        item={item}
        isLoading={props.isLoading}
        setIsLoading={props.setIsLoading}
        // isAttending={props.isAttending}
        // setIsAttending={props.setIsAttending}
      />
    );
  });

  return guestsList;
}
