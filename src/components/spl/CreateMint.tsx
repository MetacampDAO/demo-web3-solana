import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

const CreateMint = ({ setMint, mint }: any) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const handleCreateMint = async () => {
    if (publicKey) {
      const mint = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const transaction = new Transaction();

      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mint.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(mint.publicKey, 0, publicKey, publicKey)
      );

      const sig = await sendTransaction(transaction, connection, {
        signers: [mint],
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: sig,
      });

      const mintAccountInfo = await getMint(connection, mint.publicKey);
      console.log("mintAccountInfo", mintAccountInfo);
      setMint(mint.publicKey.toString());
    }
  };

  return (
    <div>
      <div>Initalize New Mint: {mint}</div>
      <button onClick={handleCreateMint}>Create Mint</button>
    </div>
  );
};

export default CreateMint;
