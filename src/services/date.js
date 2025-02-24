import { format, parseISO, differenceInHours, differenceInMinutes, } from "date-fns";

export const convertISOToLocal = (utcDateString) => {

    if(!utcDateString) return null;
    
    const formattedUtcDate = utcDateString.replace("+0000", "Z");

    const localFormattedDate = format(new Date(formattedUtcDate), "yyyy-MM-dd hh:mm:ss a");

    return localFormattedDate;
}


export const getDiffInHours = (deviceTime, now = new Date()) => {
    const parsedDeviceTime = parseISO(deviceTime);

    const hours = differenceInHours(now, parsedDeviceTime);
    const minutes = differenceInMinutes(now, parsedDeviceTime) % 60;

    return { hours, minutes }

}


export const formatDate = (date, dateFormat  = "dd-MM-yyyy HH:mm:ss") => format(date, dateFormat )