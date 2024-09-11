// src/App.tsx

import './App.css';
import WebApp from '@twa-dev/sdk';
import { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

type Event = {
    id: number;
    title?: string;
    allDay?: boolean;
    start: Date;
    end: Date;
    desc?: string;
};

type CalendarView = "day" | "agenda" | "work_week" | "month";

export default function ReactBigCalendar() {
    // Fixed: Correct useState type
    const [eventsData, setEventsData] = useState<Event[]>(events);

    // Fixed: Adjusted handleSelect to match SlotInfo type
    const handleSelect = ({ start, end }: SlotInfo) => {
        console.log(start);
        console.log(end);
        const title = window.prompt("New Event name");
        if (title) {
            const generateId = () => new Date().getTime();
            setEventsData([
                ...eventsData,
                {
                    id: generateId(),
                    title,
                    start,
                    end,
                    allDay: false // Default value
                }
            ]);
        }
    };

    return (
        <div className="App">
            <Calendar
                views={["day", "agenda", "work_week", "month"] as CalendarView[]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={eventsData}
                style={{ height: "100vh", width: "100vw" }}
                onSelectEvent={(event) => WebApp.showAlert([event.title].toString())}
                onSelectSlot={handleSelect} // Fixed: Use correct function type
            />
        </div>
    );
}
