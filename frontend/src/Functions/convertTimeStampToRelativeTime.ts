import exp from "constants";

function convertTimestampToRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const elapsedMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (elapsedMinutes < 60) {
        return `${elapsedMinutes} minute${elapsedMinutes !== 1 ? 's' : ''} ago`;
    } else if (elapsedMinutes < 24 * 60) {
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        return `${elapsedHours} hour${elapsedHours !== 1 ? 's' : ''} ago`;
    } else if (elapsedMinutes < 7 * 24 * 60) {
        const elapsedDays = Math.floor(elapsedMinutes / (24 * 60));
        return `${elapsedDays} day${elapsedDays !== 1 ? 's' : ''} ago`;
    } else {
        const elapsedWeeks = Math.floor(elapsedMinutes / (7 * 24 * 60));
        return `${elapsedWeeks} week${elapsedWeeks !== 1 ? 's' : ''} ago`;
    }
}

export default convertTimestampToRelativeTime;