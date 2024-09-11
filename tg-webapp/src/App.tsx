import './App.css';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
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

function transformDataToEvents(data: any): Event[] {
    const events: Event[] = [];

    if (data && typeof data === 'object') {
        Object.keys(data).forEach((date, idx) => {
            const dayInfo = data[date];
            if (dayInfo && dayInfo.pairs) {
                const pairs = dayInfo.pairs;
                Object.keys(pairs).forEach(time => {
                    const lessonInfo = pairs[time];
                    const lessonName = Object.keys(lessonInfo)[0];
                    const lessonDetails = lessonInfo[lessonName];

                    const [day, month, year] = date.split('.').map(Number);

                    const start = new Date(year, month - 1, day, ...lessonDetails.time_start.split(':').map(Number));
                    const end = new Date(year, month - 1, day, ...lessonDetails.time_end.split(':').map(Number));

                    events.push({
                        id: idx,
                        title: lessonName,
                        start: start,
                        end: end,
                        desc: lessonDetails.lector ? Object.values(lessonDetails.lector)[0] : ""
                    });
                });
            }
        });
    }

    return events;
}

export default function ReactBigCalendar() {
    const [eventsData, setEventsData] = useState<Event[]>();
    useEffect(() => {
        fetch('./mock.json')
            .then(response => {
                return response.json()
            })
            .then((data) => {
                const transformedEvents = transformDataToEvents(data);
                setEventsData(transformedEvents);
            })
            .catch((error)=> console.log('Error: ', error))
    }, []);

    useEffect(() => {
        console.log("Events Data:", eventsData);
    }, [eventsData]);

    return (
        <div className="App">

            <Calendar
                views={["day", "agenda", "week", "month"] as CalendarView[]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={eventsData}
                style={{height: "100vh", width: "100%", padding: "1rem"}}
            />
        </div>
    );
}