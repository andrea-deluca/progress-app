import dayjs, { Dayjs } from "dayjs";

const FULL_TIMESTAMP_FORMAT = "dddd DD MMMM YYYY, HH:mm" as const;
const MONTH_DAY_FORMAT = "MMM DD" as const;

export const now = () => dayjs()
export const tomorrow = () => now().add(1, "day")
export const yesterday = () => now().subtract(1, "day")

export const getFullTimestamp = (timestamp: Dayjs) => timestamp.format(FULL_TIMESTAMP_FORMAT);
export const getMonthAndDay = (timestamp: Dayjs) => timestamp.format(MONTH_DAY_FORMAT)