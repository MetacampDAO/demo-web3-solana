import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import React, { useState } from "react";
import { createSendTransferIx, getBalanceUsingWeb3 } from "../../utils";

const TransferLamports = () => {
  const [sendToAddress, setSendToAddress] = useState("");
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const handleTransfer = async () => {
    if (publicKey && sendToAddress) {
      const sendToAddressPub = new PublicKey(sendToAddress);

      const tx = new Transaction();

      const ix = createSendTransferIx(
        publicKey,
        sendToAddressPub,
        LAMPORTS_PER_SOL * 0.01
      );

      tx.add(ix);

      const sig = await sendTransaction(tx, connection);

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: sig,
      });
    }
  };

  return (
    <div>
      <input type="text" onChange={(e) => setSendToAddress(e.target.value)} />
      <button onClick={handleTransfer}>Send 0.01 SOL</button>
    </div>
  );
};

export default TransferLamports;
