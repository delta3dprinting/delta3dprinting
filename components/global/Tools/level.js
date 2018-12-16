/* =================================== USER LEVEL CALCULATION =================================== */

const calculateLevel = promise => {
  if (promise != false) {
    /* ------------------------------- RUN FUNCTION AS A PROMISE -------------------------------- */
    return new Promise((resolve, reject) => {
      // DECLARE REQUIRED VARIABLES
      let level;
      let minPoints;
      let maxPoints;
      let benefits = [];
      let points;
      let cumulativeOrderValue;

      // ASSIGN VALUE OF THE VARIABLES
      // Cumulative Order Value
      cumulativeOrderValue = cumulativeOrderValueByOrderStatus(
        "Order Completed"
      ).cumulativeOrderValue;
      // Points - Calculate Account Points
      points = cumulativeOrderValue;

      // DETERMINE USER'S LEVEL OBJECT
      // Fetch the Level Object Array
      getLevelObjectArray().then(levelObjectArray => {
        // Sort the Level Object Array by Ascending Level
        sortLevelObjectArray(
          levelObjectArray,
          sortLevelObjectArrayByAscendingLevel
        );
        // Using for loop, determine the account level based on the total points
        for (let i = 0; i < levelObjectArray.length; i++) {
          // Minimum and MAximum Points Assoiciated with the Level
          minPoints = levelObjectArray[i].minPoints;
          maxPoints = levelObjectArray[i].maxPoints;
          // Create a list of benefits whenever the points exceed or is within the range of points
          benefits = [...benefits, ...levelObjectArray[i].benefits];
          // If the total points is within the range, execute the code in the if statement
          if (minPoints <= points && maxPoints > points) {
            // Assign the value for the 'level' variable
            level = levelObjectArray[i].level;
            // Resolve the promise with the Level Object
            resolve({
              level,
              minPoints,
              maxPoints,
              benefits,
              points
            });
          }
        }
      });
    });
  } else {
    /* ------------------------------- RUN FUNCTION SYNCHRONOUSLY ------------------------------- */
    // DECLARE REQUIRED VARIABLES
    let level;
    let minPoints;
    let maxPoints;
    let benefits = [];
    let points;
    let cumulativeOrderValue;

    // ASSIGN VALUE OF THE VARIABLES
    // Cumulative Order Value
    cumulativeOrderValue = cumulativeOrderValueByOrderStatus("Order Completed")
      .cumulativeOrderValue;
    // Points - Calculate Account Points
    points = cumulativeOrderValue;

    // DETERMINE USER'S LEVEL OBJECT
    // Fetch the Level Object Array
    getLevelObjectArray().then(levelObjectArray => {
      // Sort the Level Object Array by Ascending Level
      sortLevelObjectArray(
        levelObjectArray,
        sortLevelObjectArrayByAscendingLevel
      );
      // Using for loop, determine the account level based on the total points
      for (let i = 0; i < levelObjectArray.length; i++) {
        // Minimum and MAximum Points Assoiciated with the Level
        minPoints = levelObjectArray[i].minPoints;
        maxPoints = levelObjectArray[i].maxPoints;
        // Create a list of benefits whenever the points exceed or is within the range of points
        benefits = [...benefits, ...levelObjectArray[i].benefits];
        // If the total points is within the range, execute the code in the if statement
        if (minPoints <= points && maxPoints > points) {
          // Assign the value for the 'level' variable
          level = levelObjectArray[i].level;
          // End the function execution by returning the Level Object
          return {
            level,
            minPoints,
            maxPoints,
            benefits,
            points
          };
        }
      }
    });
  }
};

/* ================================== SORT LEVEL OBJECT ARRAY =================================== */

const sortLevelObjectArray = (levelObjectArray, compareFunction) => {
  levelObjectArray.sort(compareFunction);
};

/* ========================= SORT LEVEL OBJECT ARRAY BY ASCENDING LEVEL ========================= */

const sortLevelObjectArrayByAscendingLevel = (levelObjectA, levelObjectB) => {
  return Number(levelObjectA.level) - Number(levelObjectB.level);
};

/* ============================================================================================== */
