// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

contract EnerPay {
    address public owner;
    IERC20 public mxnbToken;
    address public treasury;

    struct Payment {
        address payer;
        string rpu;
        string serviceType;
        uint256 amount;
        uint256 timestamp;
        string company;
    }

    Payment[] public payments;

    event PaymentMade(address indexed payer, string rpu, string serviceType, uint256 amount, string company);

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el owner puede ejecutar esto");
        _;
    }

    constructor(address _mxnbToken, address _treasury) {
        require(_mxnbToken != address(0), "Dirección de MXNB inválida");
        require(_treasury != address(0), "Dirección de tesorería inválida");
        owner = msg.sender;
        mxnbToken = IERC20(_mxnbToken);
        treasury = _treasury;
    }

    function payService(string memory rpu, string memory serviceType, uint256 amount, string memory company) external {
        require(mxnbToken.allowance(msg.sender, address(this)) >= amount, "Aprobación insuficiente");
        require(mxnbToken.balanceOf(msg.sender) >= amount, "Saldo insuficiente");
        require(mxnbToken.transferFrom(msg.sender, treasury, amount), "Transferencia fallida");
        payments.push(Payment(msg.sender, rpu, serviceType, amount, block.timestamp, company));
        emit PaymentMade(msg.sender, rpu, serviceType, amount, company);
    }

    function payMultipleServices(
        string[] memory rpus,
        string[] memory serviceTypes,
        uint256[] memory amounts,
        string memory company
    ) external {
        require(rpus.length == amounts.length && rpus.length == serviceTypes.length, "Array length mismatch");
        uint256 total = 0;
        for (uint i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }
        require(mxnbToken.allowance(msg.sender, address(this)) >= total, "Aprobación insuficiente");
        require(mxnbToken.balanceOf(msg.sender) >= total, "Saldo insuficiente");
        require(mxnbToken.transferFrom(msg.sender, treasury, total), "Transferencia fallida");
        for (uint i = 0; i < rpus.length; i++) {
            payments.push(Payment(msg.sender, rpus[i], serviceTypes[i], amounts[i], block.timestamp, company));
            emit PaymentMade(msg.sender, rpus[i], serviceTypes[i], amounts[i], company);
        }
    }

    function getPaymentsByUser(address user) external view returns (Payment[] memory) {
        uint count = 0;
        for (uint i = 0; i < payments.length; i++) {
            if (payments[i].payer == user) count++;
        }
        Payment[] memory result = new Payment[](count);
        uint j = 0;
        for (uint i = 0; i < payments.length; i++) {
            if (payments[i].payer == user) {
                result[j] = payments[i];
                j++;
            }
        }
        return result;
    }

    function setTreasury(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "Dirección inválida");
        treasury = newTreasury;
    }
} 