// Create Class Object for a Material Options
class NewPrintOrderMaterialOptionsObject {
  constructor(
    id,
    name,
    qualityDefaultValuesArray,
    defaultQualityValue,
    strengthDefaultValuesArray,
    defaultStrengthValue,
    colorsArray,
    defaultColorValue
  ) {
    this.id = id;
    this.name = name;
    this.qualityDefaultValuesArray = qualityDefaultValuesArray;
    this.defaultQualityValue = defaultQualityValue;
    this.strengthDefaultValuesArray = strengthDefaultValuesArray;
    this.defaultStrengthValue = defaultStrengthValue;
    this.colorsArray = colorsArray;
    this.defaultColorValue = defaultColorValue;
  }
}

// Create a Class Object for a Material Colors
class NewPrintOrderMaterialOptionsColorObject {
  constructor(colorId, colorName, colorStyle) {
    this.colorId = colorId;
    this.colorName = colorName;
    this.colorStyle = colorStyle;
  }
}

// Create Class Object for a Material Options Quality Default Values
class NewPrintOrderMaterialOptionsQualityDefaultValuesObject {
  constructor(qualityId, qualityName, zResolution) {
    this.qualityId = qualityId;
    this.qualityName = qualityName;
    this.zResolution = zResolution;
  }
}

// Create Class Object for a Material Options Strength Default Values
class NewPrintOrderMaterialOptionsStrengthDefaultValuesObject {
  constructor(strengthId, strengthName, infill, wallThickness) {
    this.strengthId = strengthId;
    this.strengthName = strengthName;
    this.infill = infill;
    this.wallThickness = wallThickness;
  }
}
