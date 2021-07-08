pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether); // msg.value: amount of ether (in Wei) was send along with the request

        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(block.difficulty, now, players)); // keccak256 for getting sha
    }

    // requires that only the contract manager (person who created the contract) to call this function
    function pickWinner() public restricted {
        uint256 index = random() % players.length;
        players[index].transfer(this.balance); // send all ether on the contract to the winner  address
        // reset players array to start a new Lottery
        players = new address[](0); // initialize a dynamic array
    }

    modifier restricted() {
        require(msg.sender == manager);
        _; // run all the code on the function having restricted modifier
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
