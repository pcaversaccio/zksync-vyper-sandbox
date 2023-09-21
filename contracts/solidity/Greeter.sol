// SPDX-License-Identifier: WTFPL
pragma solidity ^0.8.19;

contract Greeter {
    string private _greeting;

    constructor(string memory greeting_) {
        _greeting = greeting_;
    }

    function greet() public view returns (string memory) {
        return _greeting;
    }

    function setGreeting(string memory newGreeting) public {
        _greeting = newGreeting;
    }
}
