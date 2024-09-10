import './App.css'
import WebApp from '@twa-dev/sdk'
import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import events from "./events"
import "react-big-calendar/lib/css/react-big-calendar.css"

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title
        }
      ]);
  };
  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh", width: "100vw" }}
        onSelectEvent={(event) => WebApp.showAlert([event.title].toString())}
        onSelectSlot={handleSelect}
      />
    {/* <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
    Show Alert
    </button> */}
    </div>
  );
}


