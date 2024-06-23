# ZKsync Era Vyper Compiler Sandbox Environment

We cannot trust in what we do not understand. The source code of the compiler can be found [here](https://github.com/matter-labs/era-compiler-vyper).

## Installation

Invoke

```console
pnpm install
```

and

```console
git submodule update --init --recursive
```

## Get Local Node Started

```console
cd local-setup
./start.sh
```

## Reset Local Node

```console
cd local-setup
./clear.sh
```

## Retrieve Values

#### Local Node

```console
cast call --rpc-url http://localhost:3050 <contract-address> "var()"
```

#### Testnet

```console
cast call --rpc-url https://testnet.era.zksync.dev <contract-address> "var()"
```

## Further References

- https://github.com/matter-labs/era-compiler-vyper
- https://github.com/matter-labs/hardhat-zksync
- https://github.com/matter-labs/era-contracts
- https://github.com/matter-labs/era-system-contracts
- https://github.com/matter-labs/zkvyper-bin
- https://github.com/matter-labs/zksync-hardhat-vyper-template
- https://github.com/matter-labs/zksync-contract-templates
- https://github.com/matter-labs/local-setup
