let slaPricingObject;

const createSLAPricingObject = () => {
  const materialTypePricingObjectArray = [];
  slaPricingObject = new ManufacturingMethod(
    "SLA",
    "sla",
    materialTypePricingObjectArray
  );
};
