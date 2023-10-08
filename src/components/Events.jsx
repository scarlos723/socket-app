const Events = (props) => {
  const { events } = props
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>
  )
}

export default Events
