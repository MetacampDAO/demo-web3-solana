import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  PublicKey,
  Connection,
  clusterApiUrl,
  SystemProgram,
  TransactionInstruction,
  AccountInfo,
} from "@solana/web3.js";

export const getBalanceUsingJSONRPC = async (
  address: string
): Promise<number> => {
  const url = clusterApiUrl("devnet");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", // version number
      id: 1, // identifier
      method: "getBalance", // name of method
      params: [address], // parameters to use
    }),
  });
  const data = await response.json();
  if (data.error) throw data.error;

  return data["result"]["value"] as number;
};

export const getBalanceUsingWeb3 = (address: PublicKey): Promise<number> => {
  const connection = new Connection(clusterApiUrl("devnet"));
  return connection.getBalance(address);
};

export const getAccountInfoByWeb3 = async (
  address: PublicKey,
  connection: Connection
): Promise<AccountInfo<Buffer> | null> => {
  const accountInfo = await connection.getAccountInfo(address);

  return accountInfo;
};

export const getParsedTokenAccountByWeb3 = async (
  address: PublicKey,
  connection: Connection
) => {
  const tokenAccountsInfo = await connection.getParsedTokenAccountsByOwner(
    address,
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  return tokenAccountsInfo.value;
};

export const getTokenAccountBalanceByWeb3 = async (
  address: PublicKey,
  connection: Connection
) => {
  const tokenAmount = await connection.getTokenAccountBalance(address);

  return tokenAmount.value;
};

export const createSendTransferIx = (
  transferFromAddress: PublicKey,
  transferToAddress: PublicKey,
  lamportAmount: number
): TransactionInstruction => {
  const ix = SystemProgram.transfer({
    fromPubkey: transferFromAddress,
    toPubkey: transferToAddress,
    lamports: lamportAmount,
  });

  return ix;
};
