import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


const today = dayjs();
console.log(today.add(5, 'days').format('MMMM, dddd'));
console.log(today.add(1, "month").format("MMMM, dddd"));
console.log(today.subtract(1, "month").format("MMMM, dddd"));
console.log(today.add(1, 'day').format('dddd'));

function isWeekend(date) {
  return date === 'Saturday' || date === 'Sunday';
}

console.log(isWeekend(today.add(4, "day").format("dddd")));
