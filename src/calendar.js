"use strict"

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
    { label :'January', length : 31},
    { label :'February', length : 28},
    { label :'March', length : 31},
    { label :'April', length : 30},
    { label :'May', length : 31},
    { label :'June', length : 30},
    { label :'July', length : 31},
    { label :'August', length : 31},
    { label :'September', length : 30},
    { label :'October', length : 31},
    { label :'Novever', length : 30},  
    { label :'December', length : 31},
];

function create ({ month, year }) {  

  const result = [];
  
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay === -1 ) { startDay = 6; }

  let monthLength = months[month].length;
  // process for leap year
  if (month === 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      monthLength = 29;
    }
  }

  /* generate week */
  let index = startDay;
  let daysOfMonth = 1;
  const firstWeek = [];
  const previousMonth = month === 0 ? 11 : month - 1;
  const yearOfPreviousMonth = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const yearOfNextMonth = month === 11 ? year + 1 : year;
  let lastDaysOfLastMonth = months[previousMonth].length - index + 1;    
  let firstDaysOfNextMonth = 1;

  if (index > 0) {
    // fill in day of last month to first week    
    for (let i = 0; i < index; i++ ) {
      const day = lastDaysOfLastMonth;
      const month = previousMonth;
      const year = yearOfPreviousMonth;

      const d = new Date(year, month, day);
      const timestamp = d.getTime();

      const events = {};

      firstWeek.push({ day, month, year, timestamp, events });

      lastDaysOfLastMonth++;
    }       
  }
  // continue to fill in first week  
  for (let i = index; i < 7; i++ ) {
    const day = daysOfMonth;
    const d = new Date(year, month, day);
    const timestamp = d.getTime();
    const events = {};

    firstWeek.push({ day, month, year, timestamp, events });

    daysOfMonth++;
  } 
  result.push(firstWeek);

  // fill next weeks
  do {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (daysOfMonth <= monthLength) {
        const day = daysOfMonth;
        const d = new Date(year, month, day);
        const timestamp = d.getTime();
        const events = {};

        week.push({day, month, year, timestamp, events});
        daysOfMonth++;                   
      } else {
        const day = firstDaysOfNextMonth;
        const month = nextMonth;
        const year = yearOfNextMonth;
        const d = new Date(year, month, day);
        const timestamp = d.getTime();
        const events = {};
        week.push({day, month, year, timestamp, events});
        firstDaysOfNextMonth++; 
      }
    }
    result.push(week);
  } while ( daysOfMonth < monthLength);

  return result;

 }

 function mapMonth (month, format = 'long') {
   const dict = {
     long : [
      'January','February','March',
      'April','May','June',
      'July','August','September',
      'October','Novever', 'December'
    ],
    short : [
      'Jan','Feb','Mar',
      'Apr','May','Jun',
      'Jul','Aug','Sep',
      'Oct','Nov', 'Dec'
    ]
   };
   format = format.toLowerCase();
   return dict[format][month];
 }

 export default {
   create,
   month : {
     map : mapMonth
   }
 }
