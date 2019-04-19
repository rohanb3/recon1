// eslint-disable-next-line import/prefer-default-export
export const getOrders = () => {
  return Promise.resolve({
    data: [
      {
        orderId: "ff9f2e2f-e4cc-4c10-a279-12d68cdb45ce",
        orderNumber: 1,
        accountNumber: "84483000000354",
        sevice: {
          id: "928a971b-1f70-4138-96e3-c7fdb8534e4f",
          name: "Double Play — Video + Internet"
        },
        expectedComission: 0.75,
        recevedComission: 0.25,
        createdOn: "2019-04-19T15:07:52.926Z",
        installationDate: "2019-04-19T15:07:52.926Z",
        orderStatus: "Installed",
        creationAge: 10,
        installationAge: 10,
        orderedUnits: 2,
        installedUnits: 1,
        disputeId: "string"
      },
      {
        orderId: "2a3f65cb-02b8-4235-b9c2-605d50391f4b",
        orderNumber: 2,
        accountNumber: "74483000000354",
        sevice: {
          id: "8e517e9b-2ef7-406b-9b02-4885bbc3f339",
          name: "Triple Play"
        },
        expectedComission: 2,
        recevedComission: 2,
        createdOn: "2019-04-19T15:07:52.926Z",
        installationDate: "2019-04-19T15:07:52.926Z",
        orderStatus: "Not Installed",
        creationAge: 14,
        installationAge: 0,
        orderedUnits: 3,
        installedUnits: 3,
        disputeId: "string"
      },
      {
        orderId: "2a3f65cb-02b8-4235-b9c2-605d50391f4b",
        orderNumber: 2,
        accountNumber: "74483000000354",
        sevice: {
          id: "8e517e9b-2ef7-406b-9b02-4885bbc3f339",
          name: "Triple Play"
        },
        expectedComission: 2,
        recevedComission: 2,
        createdOn: "2019-04-19T15:07:52.926Z",
        installationDate: "2019-04-19T15:07:52.926Z",
        orderStatus: "Not Installed",
        creationAge: 14,
        installationAge: 0,
        orderedUnits: 3,
        installedUnits: 3,
        disputeId: "string"
      },
      {
        orderId: "2a3f65cb-02b8-4235-b9c2-605d50391f4b",
        orderNumber: 2,
        accountNumber: "74483000000354",
        sevice: {
          id: "8e517e9b-2ef7-406b-9b02-4885bbc3f339",
          name: "Triple Play"
        },
        expectedComission: 2,
        recevedComission: 2,
        createdOn: "2019-04-19T15:07:52.926Z",
        installationDate: "2019-04-19T15:07:52.926Z",
        orderStatus: "Not Installed",
        creationAge: 14,
        installationAge: 0,
        orderedUnits: 3,
        installedUnits: 3,
        disputeId: "string"
      }
    ],
    returnedRow: 0,
    total: 2,
    itemsPerPage: 0
  });
};
