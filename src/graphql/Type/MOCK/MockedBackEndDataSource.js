const MockedBackEndDataSource = {

  // Filter yourMockedDataset based upon mockAttribute01.
  yourMockedDataset: (parent, { mockAttribute01 }) => {
    const result = mockAttribute01
      ? parent.yourMockedDataset.filter((item) => item.mockAttribute01 === mockAttribute01)
      : parent.yourMockedDataset

    return result
  },
}

module.exports = MockedBackEndDataSource
