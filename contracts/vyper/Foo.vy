# @version ^0.3.9
"""
@custom:contract-name Foo
@license Do What The F*ck You Want To Public License
@author pcaversaccio
"""


IMMUTABLE_1: public(immutable(String[4]))


@external
@payable
def __init__():
    IMMUTABLE_1 = "Test"
