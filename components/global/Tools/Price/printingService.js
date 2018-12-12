/* =================================== PART PRICE CALCULATION =================================== */

const partPriceCalculation = orderNumber => {
  return new Promise((resolve, reject) => {
    /* -------------------------------- DECLARE LOCAL VARIABLES --------------------------------- */
    let partPriceObjectArray = [];
    let totalPrice = 0;
    let calculation = "";
    /* --------------------------- GET ORDER DETAILS BY ORDER NUMBER ---------------------------- */
    getOrderDetailsByOrderNumber(orderNumber)
      // Execute 'then' if order details was successfully fetched
      .then(orderDetails => {
        // Simplify parts variable
        const parts = orderDetails.parts;

        // Create the Part Price Object for each Part
        for (let i = 0; i < parts.length; i++) {
          // Get File Details of the Part
          const fileDetails = getFileDetails(parts[i].fileId);
          // Construct Part Price Object
          const partPriceObject = new PartPriceObject(
            parts[i].fileName,
            parts[i].orderQuantity,
            fileDetails.fileDetail.price
          );
          // Add the Part Price Object to the an Array
          partPriceObjectArray.push(partPriceObject);
          // Calculate the collective price of all the parts
          totalPrice = totalPrice + Number(partPriceObject.totalPrice);
          // Construct the calculation string to show how the total price is calculated
          if (i == 0) {
            calculation +=
              "$" +
              numberToTwoDecimalStringConverter(
                Number(partPriceObject.totalPrice)
              );
          } else if (i == parts.length - 1) {
            calculation +=
              " + $" +
              numberToTwoDecimalStringConverter(
                Number(partPriceObject.totalPrice)
              ) +
              " = " +
              numberToTwoDecimalStringConverter(Number(totalPrice));
          } else {
            calculation +=
              " + $" +
              numberToTwoDecimalStringConverter(
                Number(partPriceObject.totalPrice)
              );
          }
        }
        // Construct the Parts Price Object
        const partsPriceObject = new PartsPriceObject(
          partPriceObjectArray,
          totalPrice,
          calculation
        );

        // Resolve the promise by returning the
        resolve(partsPriceObject);
      })
      // Execute 'catch' if an error occurs while fetching order details
      .catch(error => {
        reject(error);
      });
  });
};

/* ------------------------------- PART PRICE OBJECT CONSTRUCTOR -------------------------------- */

class PartPriceObject {
  constructor(name, unitPrice, quantity) {
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.totalPrice = Number(unitPrice) * Number(quantity);
    this.calculation =
      quantity +
      " x $" +
      numberToTwoDecimalStringConverter(unitPrice) +
      " = $" +
      numberToTwoDecimalStringConverter(Number(unitPrice) * Number(quantity));
  }
}

/* ------------------------------- PARTS PRICE OBJECT CONSTRUCTOR ------------------------------- */

class PartsPriceObject {
  constructor(partPriceObjectArray, totalPrice, calculation) {
    this.partPriceObjectArray = partPriceObjectArray;
    this.totalPrice = totalPrice;
    this.calculation = calculation;
  }
}

/* ================================= PRICING PRICE CALCULATION ================================== */

const pricingPriceCalculation = orderNumber => {
  return new Promise((resolve, reject) => {
    /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
    partPriceCalculation(orderNumber)
      .then(partsPriceObject => {
        /* --------------------------- GET THE DELIVERY PRICE DETAILS --------------------------- */
        getOrderDetailsByOrderNumber(orderNumber)
          .then(orderDetails => {
            /* ---------------------------- DECLARE LOCAL VARIABLES ----------------------------- */
            let pricing;
            let pricingMultiplier;
            let pricingPrice;
            let calculation;
            /* ---------------------------- DEFINE VARIABLE: PRICING ---------------------------- */
            pricing = orderDetails.pricing;
            /* ---------------------- DEFINE VARIABLE: PRICING MULTIPLIER ----------------------- */
            if (orderDetails.pricing == "Basic") {
              pricingMultiplier = 0;
            } else if (orderDetails.pricing == "Priority") {
              pricingMultiplier = 0.25;
            } else if (orderDetails.pricing == "Urgent") {
              pricingMultiplier = 0.5;
            }
            /* ------------------------- DEFINE VARIABLE: PRICING PRICE ------------------------- */
            pricingPrice =
              Number(partsPriceObject.totalPrice) * pricingMultiplier;
            /* -------------------------- DEFINE VARIABLE: CALCULATION -------------------------- */
            calculation =
              "$" +
              numberToTwoDecimalStringConverter(
                Number(partsPriceObject.totalPrice)
              ) +
              " x " +
              pricingMultiplier +
              " = $" +
              numberToTwoDecimalStringConverter(pricingPrice);
            /* --------------------- DEFINE VARIABLE: PRICING PRICE OBJECT ---------------------- */
            const pricingPriceObject = new PricingPriceObject(
              orderDetails.pricing,
              pricingPrice,
              calculation
            );

            resolve(pricingPriceObject);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

/* ------------------------------ PRICING PRICE OBJECT CONSTRUCTOR ------------------------------ */

class PricingPriceObject {
  constructor(pricing, pricingPrice, calculation) {
    this.pricing = pricing;
    this.pricingPrice = pricingPrice;
    this.calculation = calculation;
  }
}

/* ================================= DISCOUNT PRICE CALCULATION ================================= */

const discountPriceCalculation = orderNumber => {
  return new Promise((resolve, reject) => {
    /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
    partPriceCalculation(orderNumber)
      .then(partsPriceObject => {
        /* --------------------------- GET THE PRICING PRICE DETAILS ---------------------------- */
        pricingPriceCalculation(orderNumber)
          .then(pricingPriceObject => {
            /* ------------------------- GET THE DELIVERY PRICE DETAILS ------------------------- */
            getOrderDetailsByOrderNumber(orderNumber)
              .then(orderDetails => {
                /* -------------------------- DECLARE LOCAL VARIABLES --------------------------- */
                const totalPreDiscountPrice =
                  Number(partsPriceObject.totalPrice) +
                  Number(pricingPriceObject.pricingPrice);
                let discountPriceObjectArray = [];
                let totalDiscount = 0;
                let totalCalculation = "";
                /* ------------------------------ DEFINE VARIABLES ------------------------------ */
                for (let i = 0; i < orderDetails.discounts.length; i++) {
                  /* ---------- DEFINE AND DECLARE VARIABLES FOR DISCOUNT PRICE OBJECT ---------- */
                  const rate = Number(orderDetails.discounts[i].rate);
                  const minOrderValue = Number(
                    orderDetails.discounts[i].minOrderValue
                  );
                  const maxOrderValue = Number(
                    orderDetails.discounts[i].maxOrderValue
                  );
                  let discountableValue = 0;
                  let calculation = "";
                  /* ----------- DEFINE VARIABLE: DISCOUNTABLE VALUE AND CALCULATION ------------ */
                  if (
                    maxOrderValue > 0 &&
                    minOrderValue < totalPreDiscountPrice
                  ) {
                    if (minOrderValue > 0) {
                      if (maxOrderValue < totalPreDiscountPrice) {
                        discountableValue = maxOrderValue - minOrderValue;

                        calculation =
                          "($" +
                          numberToTwoDecimalStringConverter(maxOrderValue) +
                          " - $" +
                          numberToTwoDecimalStringConverter(minOrderValue) +
                          ")";
                      } else if (maxOrderValue > totalPreDiscountPrice) {
                        discountableValue =
                          totalPreDiscountPrice - minOrderValue;

                        calculation =
                          "($" +
                          numberToTwoDecimalStringConverter(
                            totalPreDiscountPrice
                          ) +
                          " - $" +
                          numberToTwoDecimalStringConverter(minOrderValue) +
                          ")";
                      }
                    }
                  } else if (
                    minOrderValue > 0 &&
                    minOrderValue < totalPreDiscountPrice
                  ) {
                    discountableValue = totalPreDiscountPrice - minOrderValue;

                    calculation =
                      "($" +
                      numberToTwoDecimalStringConverter(totalPreDiscountPrice) +
                      " - $" +
                      numberToTwoDecimalStringConverter(minOrderValue) +
                      ")";
                  } else if (minOrderValue == 0) {
                    discountableValue = totalPreDiscountPrice;

                    calculation =
                      "$" +
                      numberToTwoDecimalStringConverter(totalPreDiscountPrice);
                  } else {
                    discountableValue = 0;

                    calculation = "$" + numberToTwoDecimalStringConverter(0);
                  }
                  /* ------------------------ DEFINE VARIABLE: DISCOUNT ------------------------- */
                  const discount = Number(discountableValue) * rate;
                  /* ------------------ UPDATE VARIABLE: DISCOUNT CALCULATION ------------------- */
                  calculation =
                    calculation +
                    " x " +
                    rate +
                    " = $" +
                    numberToTwoDecimalStringConverter(
                      Number(discountableValue) * rate
                    );
                  /* --------------------- UPDATE VARIABLE: TOTAL DISCOUNT ---------------------- */
                  totalDiscount = totalDiscount + discount;
                  /* --------------- UPDATE VARIABLE: TOTAL DISCOUNT CALCULATION ---------------- */
                  if (totalCalculation) {
                    if (i == orderDetails.discounts.length - 1) {
                      totalCalculation =
                        totalCalculation +
                        " + $" +
                        numberToTwoDecimalStringConverter(
                          Number(discountableValue) * rate
                        ) +
                        " = $" +
                        numberToTwoDecimalStringConverter(totalDiscount);
                    } else {
                      totalCalculation =
                        totalCalculation +
                        " + $" +
                        numberToTwoDecimalStringConverter(
                          Number(discountableValue) * rate
                        );
                    }
                  } else {
                    if (i == orderDetails.discounts.length - 1) {
                      totalCalculation =
                        "$" +
                        numberToTwoDecimalStringConverter(
                          Number(discountableValue) * rate
                        ) +
                        " = $" +
                        numberToTwoDecimalStringConverter(totalDiscount);
                    } else {
                      totalCalculation =
                        "$" +
                        numberToTwoDecimalStringConverter(
                          Number(discountableValue) * rate
                        );
                    }
                  }
                  /* --------------- UPDATE VARIABLE: DISCOUNT PRICE OBJECT ARRAY --------------- */
                  discountPriceObjectArray.push(
                    new DiscountPriceObject(
                      orderDetails.discounts[i].name,
                      rate,
                      minOrderValue,
                      maxOrderValue,
                      discount,
                      calculation
                    )
                  );
                }
                /* ------------------ DEFINE VARIABLE: DISCOUNTS PRICE OBJECT ------------------- */
                const discountsPriceObject = new DiscountsPriceObject(
                  discountPriceObjectArray,
                  totalDiscount,
                  totalCalculation
                );

                resolve(discountsPriceObject);
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

/* ----------------------------- DISCOUNT PRICE OBJECT CONSTRUCTOR ------------------------------ */

class DiscountPriceObject {
  constructor(name, rate, minOrderValue, maxOrderValue, discount, calculation) {
    this.name = name;
    this.rate = rate;
    this.minOrderValue = minOrderValue;
    this.maxOrderValue = maxOrderValue;
    this.discount = discount;
    this.calculation = calculation;
  }
}

/* ----------------------------- DISCOUNTS PRICE OBJECT CONSTRUCTOR ----------------------------- */

class DiscountsPriceObject {
  constructor(discountPriceObjectArray, totalDiscount, calculation) {
    this.discountPriceObjectArray = discountPriceObjectArray;
    this.totalDiscount = totalDiscount;
    this.calculation = calculation;
  }
}

/* ================================= DELIVERY PRICE CALCULATION ================================= */

const deliveryPriceCalculation = orderNumber => {
  return new Promise((resolve, reject) => {
    /* ------------------------ GET ORDER DETAILS BASED ON ORDER NUMBER ------------------------- */
    getOrderDetailsByOrderNumber(orderNumber)
      .then(orderDetails => {
        /* ------------------------------ DECLARE LOCAL VARIABLES ------------------------------- */
        let delivery;
        let details;
        let price;
        /* ----------------------------- DEFINE VARIABLES: DELIVERY ----------------------------- */
        delivery = orderDetails.delivery;
        /* ------------------------ DEFINE VARIABLES: DETAILS AND PRICE ------------------------- */
        if (delivery == "Pickup") {
          details =
            "Pickup is available 24/7. This means that customers can arrange a pickup time that suits them the most.";
          price = 0;
        } else if (delivery == "Tracking") {
          details =
            "Tracking takes up to 3 working days nationwide. You will be given a tracking number to track parcel.";
          price = 7;
        } else if (delivery == "Courier") {
          details =
            "Parcels shipped using the Courier service usually arrive the next working day between major towns and cities.";
          price = 8.5;
        }
        /* -------------------------- CREATE THE DELIVERY PRICE OBJECT -------------------------- */
        const deliveryPriceObject = new DeliveryPriceObject(
          delivery,
          details,
          price
        );

        resolve(deliveryPriceObject);
      })
      /* ------------------------------ CATCH ANY INCOMING ERRORS ------------------------------- */
      .catch(error => {
        reject(error);
      });
  });
};

/* ----------------------------- DELIVERY PRICE OBJECT CONSTRUCTOR ------------------------------ */

class DeliveryPriceObject {
  constructor(delivery, details, price) {
    this.delivery = delivery;
    this.details = details;
    this.price = price;
  }
}

/* ================================== ORDER PRICE CALCULATION =================================== */

const orderPriceCalculation = orderNumber => {
  return new Promise((resolve, reject) => {
    /* ----------------------------- GET THE PARTS PRICING DETAILS ------------------------------ */
    partPriceCalculation(orderNumber)
      .then(partsPriceObject => {
        /* --------------------------- GET THE PRICING PRICE DETAILS ---------------------------- */
        pricingPriceCalculation(orderNumber)
          .then(pricingPriceObject => {
            /* ------------------------ GET THE DISCOUNTS PRICE DETAILS ------------------------- */
            discountPriceCalculation(orderNumber)
              .then(discountsPriceObject => {
                /* ----------------------- GET THE DELIVERY PRICE DETAILS ----------------------- */
                deliveryPriceCalculation(orderNumber)
                  .then(deliveryPriceObject => {
                    /* ------------------------ DECLARE LOCAL VARIABLES ------------------------- */
                    let orderPrice;
                    let calculation;
                    /* --------------------- DEFINE VARIABLES: ORDER PRICE ---------------------- */
                    orderPrice =
                      partsPriceObject.totalPrice +
                      pricingPriceObject.pricingPrice -
                      discountsPriceObject.totalDiscount +
                      deliveryPriceObject.price;
                    /* --------------------- DEFINE VARIABLES: CALCULATION ---------------------- */
                    calculation =
                      "$" +
                      numberToTwoDecimalStringConverter(
                        partsPriceObject.totalPrice
                      ) +
                      " + $" +
                      numberToTwoDecimalStringConverter(
                        pricingPriceObject.pricingPrice
                      ) +
                      " - $" +
                      numberToTwoDecimalStringConverter(
                        discountsPriceObject.totalDiscount
                      ) +
                      " + $" +
                      numberToTwoDecimalStringConverter(
                        deliveryPriceObject.price
                      ) +
                      " = $" +
                      numberToTwoDecimalStringConverter(orderPrice);
                    /* ----------------------- CREATE ORDER PRICE OBJECT ------------------------ */
                    const orderPriceObject = new OrderPriceObject(
                      orderPrice,
                      calculation
                    );

                    resolve(orderPriceObject);
                  })
                  .catch(error => {
                    reject(error);
                  });
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(error => {
            resolve(error);
          });
      })
      .catch(error => {
        resolve(error);
      });
  });
};

/* ------------------------------- ORDER PRICE OBJECT CONSTRUCTOR ------------------------------- */

class OrderPriceObject {
  constructor(orderPrice, calculation) {
    this.orderPrice = orderPrice;
    this.calculation = calculation;
  }
}

/* ============================================================================================== */
