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
const address = '0xeeff1c9a4d500e3af174d0db0115ef2917d9e804e68009b5c1e12aeaffb1323c';

export async function read_address_events() {
  // READS the last transactions of an address (that triggered the event - The System Wallet)
  try {
    const req = await fetch('https://beta-5.fuel.network/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: TRANS_V_1_QUERY,
        variables: {
          address: address,
        },
      }),
    });
    const res = await req.json();
    return res.data.transactionsByOwner.nodes;
  } catch (error) {
    console.error('Failed to fetch time data:', error);
    return [];
  }
}

export async function read_last_events() {
  // reads all last events from chain
  try {
    let req = await fetch('https://beta-5.fuel.network/graphql', {
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
