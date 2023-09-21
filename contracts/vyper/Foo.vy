# @version ^0.3.9
"""
@custom:contract-name Foo
@license Do What The F*ck You Want To Public License
@author pcaversaccio
"""

IMMUTABLE_1: public(immutable(bytes32))
IMMUTABLE_2: public(immutable(String[64]))

@external
@payable
def __init__():
    IMMUTABLE_1 = keccak256(_abi_encode(msg.sender))
    IMMUTABLE_2 = "Test"
