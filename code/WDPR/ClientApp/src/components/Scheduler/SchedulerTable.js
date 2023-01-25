import { appendZero } from './SchedulerUtil';

function SchedulerTable(props) {
    const date = props.date;
    const createFunc = props.createFunc;

    let table = []
    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    // Outer loop to create rows
    for (let i = 0; i < 48; i++) {
        let children = []
        // Inner loop to create columns
        for (let j = 0; j < 1; j++) {
            // Create cell
            if (Math.floor(i % 2) < 1) {
                children.push(
                    <td className="scheduler-row-label" rowSpan={2}>
                        {`${formatHour(Math.floor(i / 2))}:${halfHourTern(i)}`}
                    </td >
                );
            }
            children.push(
                <td key={j * i}>
                    <button id={`scheduler-row-button-${i}`} className="scheduler-row" style={{ height: "10vh", top: `${i * 10 + 2}vh`, position: "absolute" }} type="button" onClick={() => createFunc(`${dateString} ${calcTime(i)}`, `${dateString} ${calcTime(i + 1)}`)}>
                        <div htmlFor={`scheduler-row-button-${i}`} style={{ display: "none" }}>
                            {`maak een reservering van ${appendZero(Math.floor(i / 2))}:${appendZero((i * 30) % 60)} tot ${appendZero(Math.floor((i + 1) / 2))}:${appendZero(((i + 1) * 30) % 60)}`}
                        </div>
                    </button>
                </td>
            )
        }
        //Create the parent and add the children
        table.push(<tr key={i}>{children}</tr>)
    }
    return table
}

function calcTime(i) {
    return `${formatHour(Math.floor((i * 30) / 60))}:${halfHourTern(i)}`;
}


function formatHour(i) {
    return i < 10 ? (`0${i}`) : (`${i}`)
}

function halfHourTern(i) {
    return i % 2 == 1 ? ("30") : ("00");
}

export default SchedulerTable;