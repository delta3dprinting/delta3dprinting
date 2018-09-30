// Create Tabs for Each Service
class serviceObject {
  constructor(id, tabName, content) {
    this.id = id;
    this.tabName = tabName;
    this.content = content;
  }
}

// Create the Services Object
const createServicesObject = () => {
  return [printingServiceObject, modellingServiceObject, marketplaceObject];
};
