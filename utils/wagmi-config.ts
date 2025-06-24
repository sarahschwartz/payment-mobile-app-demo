import { http, createConfig } from '@wagmi/core';
import { zksyncInMemoryNode } from '@wagmi/core/chains';

export const config = createConfig({
  chains: [zksyncInMemoryNode],
  transports: {
    [zksyncInMemoryNode.id]: http(),
  },
});
