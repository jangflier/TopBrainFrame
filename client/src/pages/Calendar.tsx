import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import { Page } from "../components/layout/Page";
import { homeMenu } from "../menu";
import { Card } from "../components/elements/Card/Card";

const localizer = momentLocalizer(moment);

const Calendar = () => {
	return (
		<Page title={homeMenu.calendar.title} className='h-100'>
			<Card className="h-100">
				<BigCalendar localizer={localizer} />
			</Card>
		</Page>
	);
};

export default Calendar;
