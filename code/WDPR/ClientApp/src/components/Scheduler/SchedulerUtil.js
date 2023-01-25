export function appendZero(val) {
    return val < 10 ? `0${val}` : `${val}`;
}

export function calcMinutes(date) {
    return (date.getHours() * 60 + date.getMinutes());
}

export function validate(appointment, ypos, height, minuteDenom, offset) {
    let apStartPos = (appointment.startTime.getHours() * 60 + appointment.startTime.getMinutes()) / minuteDenom;
    let apEndPos = appointment.duration / minuteDenom + apStartPos;
    let endPos = ypos + height;
    if ((ypos > apStartPos && ypos < apEndPos) || (apStartPos > ypos && apStartPos < endPos)) return false;
    if ((endPos > apStartPos && endPos < apEndPos) || (apEndPos > ypos && apEndPos < endPos)) return false;
    if (ypos == apStartPos || endPos == apEndPos) return false;

    return true;
}

export function validateBoundary(ypos, height, minuteDenom) {
    if (ypos < 0) return false;
    if (height * minuteDenom < 30) return false;

    return true;
}