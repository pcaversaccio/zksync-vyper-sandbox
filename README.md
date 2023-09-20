# zkSync Era Vyper Compiler Sandbox Environment

We cannot trust in what we do not understand. The source code of the compiler can be found [here](https://github.com/matter-labs/era-compiler-vyper).

## Get Started

```console
cd local-setup
.\start.sh
```

## Reset Local Node

```console
cd local-setup
.\clear.sh
```

## Retrieve Values

Local node:

```console
cast call --rpc-url http://localhost:3050 <contract-address> "var()"
```

Testnet:

```console
cast call --rpc-url https://testnet.era.zksync.dev <contract-address> "var()"
```
