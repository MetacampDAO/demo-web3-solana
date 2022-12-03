import {
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey, Connection, Transaction } from "@solana/web3.js";

export const createAtaTx = async (
  wallet: WalletContextState,
  mint: PublicKey,
  connection: Connection
) => {
  if (!connection || !wallet.publicKey) {
    return;
  }

  const transaction = new Transaction();

  const associatedToken = await getAssociatedTokenAddress(
    mint,
    wallet.publicKey
  );

  const ix = createAssociatedTokenAccountInstruction(
    wallet.publicKey,
    associatedToken,
    wallet.publicKey,
    mint
  );

  transaction.add(ix);
  const sig = await wallet.sendTransaction(transaction, connection);

  const latestBlockHash = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: sig,
  });
};

export const createMintToTx = async (
  wallet: WalletContextState,
  mint: PublicKey,
  amount: number,
  connection: Connection
) => {
  if (!connection || !wallet.publicKey) {
    return;
  }
  const transaction = new Transaction();

  const associatedToken = await getAssociatedTokenAddress(
    mint,
    wallet.publicKey
  );
  const ix = createMintToInstruction(
    mint,
    associatedToken,
    wallet.publicKey,
    amount
  );

  transaction.add(ix);
  const sig = await wallet.sendTransaction(transaction, connection);

  const latestBlockHash = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: sig,
  });
};
