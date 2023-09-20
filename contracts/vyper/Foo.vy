# @version 0.3.9

IMMUTABLE_1: public(immutable(bytes32))
IMMUTABLE_2: public(immutable(String[64]))

@external
def __init__():
    IMMUTABLE_1 = keccak256(_abi_encode(msg.sender))
    IMMUTABLE_2 = "Test"
