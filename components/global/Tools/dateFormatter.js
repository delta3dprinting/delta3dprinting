/* ======================================== DATE OBJECT ========================================= */

const dateFormatter = defaultDate => {
  const defaultDateString = defaultDate + "";
  const dateArray = defaultDateString.split(" ");
  let day;
  let month = [];
  const date = dateArray[2];
  const year = dateArray[3];
  const timeArray = dateArray[4].split(":");
  let hour = [];
  const minute = timeArray[1];
  const second = timeArray[2];
  let period;

  switch (dateArray[0]) {
    case "Sun":
      day = "Sunday";
      break;
    case "Mon":
      day = "Monday";
      break;
    case "Tue":
      day = "Tuesday";
      break;
    case "Wed":
      day = "Wednesday";
      break;
    case "Thu":
      day = "Thursday";
      break;
    case "Fri":
      day = "Friday";
      break;
    case "Sat":
      day = "Saturday";
  }

  switch (dateArray[1]) {
    case "Jan":
      month[0] = "January";
      month[1] = "01";
      break;
    case "Feb":
      month[0] = "February";
      month[1] = "02";
      break;
    case "Mar":
      month[0] = "March";
      month[1] = "03";
      break;
    case "Apr":
      month[0] = "April";
      month[1] = "04";
      break;
    case "May":
      month[0] = "May";
      month[1] = "05";
      break;
    case "Jun":
      month[0] = "June";
      month[1] = "06";
      break;
    case "Jul":
      month[0] = "July";
      month[1] = "07";
      break;
    case "Aug":
      month[0] = "August";
      month[1] = "08";
      break;
    case "Sep":
      month[0] = "September";
      month[1] = "09";
      break;
    case "Oct":
      month[0] = "October";
      month[1] = "10";
      break;
    case "Nov":
      month[0] = "November";
      month[1] = "11";
      break;
    case "Dec":
      month[0] = "December";
      month[1] = "12";
  }

  if (timeArray[0] >= "12") {
    if (timeArray[0] == "12") {
      hour[0] = timeArray[0];
    } else {
      hour[0] = Number(timeArray[0]) - 12 + "";
    }
    period = "PM";
  } else {
    hour[0] = timeArray[0];
    period = "AM";
  }

  hour[1] = timeArray[0];

  const dateObject = {
    day: day,
    month: month,
    date: date,
    year: year,
    hour: hour,
    minute: minute,
    second: second,
    period: period,
    fromNow: moment(
      year +
        "-" +
        month[1] +
        "-" +
        date +
        " " +
        timeArray[0] +
        ":" +
        minute +
        ":" +
        second
    ).fromNow()
  };

  return dateObject;
};

/* =================================== DAY DATE MONTH YEAR FORMAT ==================================== */

const dayDateMonthYearFormat = defaultDate => {
  const dateObject = dateFormatter(defaultDate);
  const day = dateObject.day.slice(0, 3);
  const date = dateObject.date;
  const month = dateObject.month[0].slice(0, 3);
  const year = dateObject.year;
  const dayDateMonthYearString = day + ", " + date + " " + month + " " + year;

  return dayDateMonthYearString;
};

/* ============================================================================================== */
