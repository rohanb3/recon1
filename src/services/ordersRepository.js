// eslint-disable-next-line import/prefer-default-export
export const getOrders = () => {
  return Promise.resolve({
    result: [
      {
        ordersNumber: "#0001",
        accountNumber: "84483000000354",
        serviceName: "Double Play — Video + Internet",
        orderedUnits: 2,
        installedUnits: 1,
        orderStatus: "Not Installed",
        ageAfterOrder: 10,
        ageAfterInstallation: 0,
        expectedComission: 0.75,
        recievedComisson: 0.25,
        difference: 0.5
      },
      {
        ordersNumber: "#0002",
        accountNumber: "84483000000354",
        serviceName: "Triple Play",
        orderedUnits: 3,
        installedUnits: 3,
        orderStatus: "Installed",
        ageAfterOrder: 14,
        ageAfterInstallation: 10,
        expectedComission: 2,
        recievedComisson: 2,
        difference: 0
      }
    ]
  });
};
