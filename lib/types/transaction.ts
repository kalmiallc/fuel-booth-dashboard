export {};

declare global {
  /**
   * Transaction
   */

  type TransactionInput = {
    amount: String;
    assetId: String;
    owner: String;
    utxoId: String;
    __typename: String;
  };
  type TransactionOutput = {
    amount: String;
    assetId: String;
    to: String;
    __typename: String;
  };
  type Transaction = {
    id: String;
    gasPrice: String;
    isCreate: Boolean;
    isMint: Boolean;
    isScript: Boolean;
    inputs: TransactionInput[] | null;
    outputs: TransactionOutput[];
    status: {
      __typename: String;
    };
  };
}
