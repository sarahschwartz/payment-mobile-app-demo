# Paymnet Mobile App Demo

Demo template app for ZKsync SSO React Native SDK.

## Running Locally

1. Start a local node with `anvil-zksync` or `zksync-cli`:

    ```bash
    anvil-zksync
    # OR
    npx zksync-cli dev start
    ```

2. Create a `.env` file and add the private key below:

    ```txt
    WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110
    ```

3. Send some test txns:

    ```bash
    cd scripts
    bun install
    bun setup
    ```

4. Run the app:

    ```bash
    bun install
    bun dev
    ```

It will run for the web version on [`http://localhost:8081/`](http://localhost:8081/).
