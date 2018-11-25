/* ======================== POPULATE DATE, MONTH AND YEAR SELECT FIELDS ========================= */

const populateDateMonthYearSelectFields = (dateId, monthId, yearId) => {
  const date = document.getElementById(dateId);
  const month = document.getElementById(monthId);
  const year = document.getElementById(yearId);
  date.insertAdjacentHTML(
    "beforeend",
    '<option id="day_empty" value="empty"></option>'
  );
  month.insertAdjacentHTML(
    "beforeend",
    '<option id="month_empty" value="empty"></option>'
  );
  year.insertAdjacentHTML(
    "beforeend",
    '<option id="year_empty" value="empty"></option>'
  );
  for (let i = 1; i <= 31; i++) {
    dayOptionHTML =
      '<option id="day_' + i + '" value="' + i + '">' + i + "</option>";
    date.insertAdjacentHTML("beforeend", dayOptionHTML);
  }
  monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  for (let i = 0; i < monthArray.length; i++) {
    monthOptionHTML =
      '<option id="month_' +
      monthArray[i] +
      '" value="' +
      monthArray[i] +
      '">' +
      monthArray[i] +
      "</option>";
    month.insertAdjacentHTML("beforeend", monthOptionHTML);
  }
  for (let i = 2000; i <= 2050; i++) {
    yearOptionHTML =
      '<option id="year_' + i + '" value="' + i + '">' + i + "</option>";
    year.insertAdjacentHTML("beforeend", yearOptionHTML);
  }
};

/* ====================================== MONTH CONVERTION ====================================== */

const monthNameToNumberConversion = monthName => {
  monthName = monthName.toLowerCase();

  let monthNumber;

  switch (monthName) {
    case "january":
      monthNumber = 1;
      break;
    case "february":
      monthNumber = 2;
      break;
    case "march":
      monthNumber = 3;
      break;
    case "april":
      monthNumber = 4;
      break;
    case "may":
      monthNumber = 5;
      break;
    case "june":
      monthNumber = 6;
      break;
    case "july":
      monthNumber = 7;
      break;
    case "august":
      monthNumber = 8;
      break;
    case "september":
      monthNumber = 9;
      break;
    case "october":
      monthNumber = 10;
      break;
    case "november":
      monthNumber = 11;
      break;
    case "december":
      monthNumber = 12;
  }

  return monthNumber;
};

/* ============================================================================================== */
