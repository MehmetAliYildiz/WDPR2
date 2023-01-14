import { appendZero } from './SchedulerUtil';

function SimpleTimePicker(props) {
    const date = props.date;

    let selectHours = [];
    let selectMinutes = [];
    for (let i = 0; i < 24; i++) {
        selectHours.push(
            <option value={i}>
                {appendZero(i)}
            </option>
        );
    }
    for (let i = 0; i < 4; i++) {
        selectMinutes.push(
            <option value={i * 15}>
                {appendZero(i * 15)}
            </option>
        );
    }

    return (
        <div className="time-picker">
            <select defaultValue={date.getHours()} onChange={(event) => this.handleAppointmentHourChange(event, date)}>
                {selectHours}
            </select>
            <label style={{ display: "inline" }}> : </label>
            <select defaultValue={date.getMinutes()} onChange={(event) => this.handleAppointmentMinuteChange(event, date)}>
                {selectMinutes}
            </select>
        </div>
    );
}

export default SimpleTimePicker;