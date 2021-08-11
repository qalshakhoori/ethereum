pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimumContribution) public {
        address newCampaign = new Campaign(minimumContribution, msg.sender); // Creates a new contract that gets deployed to the blockchain
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier requireManager() {
        require(msg.sender == manager);
        _;
    }
    
    constructor (uint minContribution, address contractManager) public {
        manager = contractManager;
        minimumContribution = minContribution;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) 
        public requireManager 
    {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]); // ensure person who called is a donator
        require(!request.approvals[msg.sender]); // ensure person did not approved this request yet
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public requireManager {
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount / 2)); // at least half have approved
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}