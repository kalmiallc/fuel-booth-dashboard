enum ReceiptType {
  Call = 0,
  Return = 1,
  ReturnData = 2,
  Panic = 3,
  Revert = 4,
  Log = 5,
  LogData = 6,
  Transfer = 7,
  TransferOut = 8,
  ScriptResult = 9,
  MessageOut = 10,
  Mint = 11,
  Burn = 12,
}

const LATEST_TRANSACTIONS_QUERY = `
  query LatestTransactions {
    transactions(last: 15) {
      nodes {
        id
        gasPrice
        isScript
        isCreate
        isMint
        inputs {
          __typename
          ... on InputCoin {
            owner
            utxoId
            amount
            assetId
          }
          ... on InputContract {
            utxoId
            contract {
              id
            }
          }
          ... on InputMessage {
            sender
            recipient
            amount
            data
          }
        }
        outputs {
          __typename
          ... on CoinOutput {
            to
            amount
            assetId
          }
          ... on ContractOutput {
            inputIndex
            balanceRoot
            stateRoot
          }
          ... on ChangeOutput {
            to
            amount
            assetId
          }
          ... on VariableOutput {
            to
            amount
            assetId
          }
          ... on ContractCreated {
            contract {
              id
            }
            stateRoot
          }
        }
        status {
          __typename
          ... on FailureStatus {
            reason
            programState {
              returnType
            }
          }
        }
      }
    }
  }`;

const TRANS_V_1_QUERY = `
  query Transactions($address: Address) {
    transactionsByOwner(owner: $address, first: 300) {
      nodes {
        id,
        gasPrice
        isScript
        isCreate
        isMint
        status {
          __typename
          ... on FailureStatus {
            reason
            programState {
              returnType
            }
          }
        }
      }
    }
  }
  `;
const TRANS_V_2_QUERY = `
  query Transactions($address: Address) {
    transactionsByOwner(owner: $address, first: 300) {
      nodes {
        id
        isScript
        rawPayload
        receipts {
          __typename
          ... on Receipt {
            receiptType
            data
          }
        }
      }
    }
  }
  `;
const TRANS_TRACK_EVENT_QUERY = `
  query Transactions($address: Address) {
    transactionsByOwner(owner: $address, first: 100000) {
      nodes {
        id
        isScript
        receiptsRoot
        status {
          __typename
          ... on SuccessStatus {            
            receipts {
              __typename
              ... on Receipt {
                receiptType
                data
              }
            }
          }
          ... on FailureStatus {
            reason
            programState {
              returnType
            }
          }
        }
      }
    }
  }
  `;

export async function read_address_events_receipts(address: string) {
  const extractAndConvertValuesFromHex = hexString => {
    // Remove the '0x' prefix if present
    const cleanHex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
    // Define the positions and lengths of the values to extract
    const positions = [
      { start: 0, length: 16 },
      { start: 16, length: 16 },
      { start: 32, length: 16 },
      { start: 48, length: 16 },
      { start: 64, length: 16 },
      { start: 80, length: 64 }, // This position (username-hash) will be skipped for number conversion
    ];
    // Extract values based on defined positions
    const hexValues = positions.map(pos => cleanHex.slice(pos.start, pos.start + pos.length));
    // Convert hex values to decimal, except for the last one (username-hash) which remains in hex
    const decimalValues = hexValues.slice(0, -1).map(value => parseInt(value, 16));
    const lastValue = hexValues[hexValues.length - 1];
    return [...decimalValues, `0x${lastValue}`];
  };
  // Function to filter and log track events
  const logTrackEvents = logDataFields => {
    logDataFields.forEach(hexString => {
      const values = extractAndConvertValuesFromHex(hexString);
      // Check if the value at position [2] is 0 (position 2 is status)
      // 0 = track -> we use this event in the list of transactions
      // 1 = final -> we skip using this data in the list of transactions
      if (values[2] === 0) {
        console.log('Track Event:');
        console.log('Time:', values[0]);
        console.log('Speed:', values[1]);
        console.log('Damage:', values[3]);
        console.log('Distance:', values[4]);
        console.log('Identifier:', values[5]);
      }
    });
  };
  // Function to filter and log track events
  const parseValuesToObject = values => {
    return {
      time: values[0],
      speed: values[1],
      score_type: values[2],
      damage: values[3],
      distance: values[4],
      id: values[5],
    };
  };

  try {
    let response = await fetch('https://testnet.fuel.network/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: TRANS_TRACK_EVENT_QUERY,
        variables: { address },
      }),
    });
    let data = await response.json();

    const transactions = data['data']['transactionsByOwner']['nodes'];
    // Flatten the array of receipts
    const allReceipts = transactions.flatMap(tx => tx.status.receipts);
    // Filter receipts by type 'LOG_DATA'
    const logDataReceipts = allReceipts.filter(receipt => receipt.receiptType === 'LOG_DATA');
    const logDataFields = logDataReceipts.map(receipt => receipt.data);

    return logDataFields
      .reduce((accumulator, hexString) => {
        const convertedValues = extractAndConvertValuesFromHex(hexString);
        return convertedValues[1] === 0
          ? [...accumulator, parseValuesToObject(convertedValues)]
          : accumulator;
      }, [])
      .reverse();
  } catch (error) {
    console.error('Failed to fetch receipts data:', error);
    return [];
  }
}

export async function read_address_events(address: string) {
  // READS the last transactions of an address (that triggered the event - The System Wallet)
  try {
    const req = await fetch('https://devnet.fuel.network/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: TRANS_V_1_QUERY,
        variables: { address },
      }),
    });

    const res = await req.json();
    console.log(res);
    return res.data?.transactionsByOwner?.nodes;
  } catch (error) {
    console.error('Failed to fetch time data:', error);
    return [];
  }
}

export async function read_last_events() {
  // reads all last events from chain
  try {
    let req = await fetch('https://devnet.fuel.network/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: LATEST_TRANSACTIONS_QUERY,
      }),
    });

    const res = await req.json();
    return res.data.transactions.nodes;
  } catch (error) {
    console.error('Failed to fetch time data:', error);
    return [];
  }
}
