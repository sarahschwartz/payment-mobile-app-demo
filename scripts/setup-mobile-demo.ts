import { ethers } from "hardhat";

const richWalletPks = [
  "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110",
  "0xac1e735be8536c6534bb4f17f06f6afc73b2b5ba84ac2cfb12f7461b20c0bbe3",
  "0xd293c684d884d56f8d6abd64fc76757d3664904e309a0645baf8522ab6366d9e",
  "0x850683b40d4a740aa6e745f889a6fdc8327be76e122f5aba645a5b02d0248db8",
  "0xf12e28c0eb1ef4ff90478f6805b68d63737b7f33abfa091601140805da450d93",
  "0xe667e57a9b8aaa6709e51ff7d093f1c5b73b63f9987e4ab4aa9a5c699e024ee8",
  "0x28a574ab2de8a00364d5dd4b07c4f2f574ef7fcc2a86a197f65abaec836d1959",
  // "0x74d8b3a188f7260f67698eb44da07397a298df5427df681ef68c45b34b61f998",
  // "0xbe79721778b48bcc679b78edac0ce48306a8578186ffcb9f2ee455ae6efeace1",
  // "0x3eb15da85647edd9a1159a4a13b9e7c56877c4eb33f614546d4db06a51868b1c",
];

async function main() {
  console.log(`Running script to populate mobile demo`);

  const [owner] = await ethers.getWallets();

  const richWallets = richWalletPks.map(
    (pk) => new ethers.Wallet(pk, owner.provider)
  );

  const wallets = [owner, ...richWallets];

  function randomAmount(): string {
    const min = 0.001; // ETH
    const max = 0.01; // ETH
    const amount = (Math.random() * (max - min) + min).toFixed(6);
    return ethers.parseEther(amount).toString();
  }

  async function sendRandomTransfers(count: number) {
    for (let i = 0; i < count; i++) {
      const senderIndex = Math.floor(Math.random() * wallets.length);
      let receiverIndex;
      do {
        receiverIndex = Math.floor(Math.random() * wallets.length);
      } while (receiverIndex === senderIndex);

      const sender = wallets[senderIndex];
      const receiver = wallets[receiverIndex];
      const amount = randomAmount();

      try {
        const tx = await sender.sendTransaction({
          to: receiver.address,
          value: amount,
        });
        console.log(
          `TX ${i + 1}: ${sender.address} -> ${
            receiver.address
          } | ${ethers.formatEther(amount)} ETH`
        );
        await tx.wait();
      } catch (err) {
        console.error(`Failed TX ${i + 1}:`, err);
      }
    }
  }

  await sendRandomTransfers(5);
  console.log("Random transfers completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
