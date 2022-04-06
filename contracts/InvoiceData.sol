// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract InvoiceData {
    struct Invoice {
        uint invoiceNumber;
        string buyerPAN;
        string sellerPAN;
        uint amount;
        uint date;
        bool paymentStatus;
        address payable sellerAddress;
    }

    mapping(string => Invoice[]) private invoicesByBuyer;
    mapping(uint => Invoice) private allInvoices;

    function createInvoice(string memory _buyerPAN, string memory _sellerPAN, uint _amount, uint dateDDMMYY, bool _paymentStatus, address payable _sellerAddress, uint _invoiceNumber) public {
        invoicesByBuyer[_buyerPAN].push(Invoice({
            invoiceNumber : _invoiceNumber,
            buyerPAN : _buyerPAN, 
            sellerPAN : _sellerPAN, 
            amount : _amount,
            date : dateDDMMYY,
            paymentStatus : _paymentStatus,
            sellerAddress : _sellerAddress}));

        allInvoices[_invoiceNumber] = Invoice({
            invoiceNumber : _invoiceNumber,
            buyerPAN : _buyerPAN, 
            sellerPAN : _sellerPAN, 
            amount : _amount,
            date : dateDDMMYY,
            paymentStatus : _paymentStatus,
            sellerAddress : _sellerAddress});
    }


    function getPaymentStatus(uint _invoiceNumber) public view returns(string memory) {
        if(allInvoices[_invoiceNumber].paymentStatus == true) {
            return ("Invoice Paid");
        }
        else {
            return ("Invoice not paid");
        }
    }

    function getInvoicesByBuyer(string memory _buyerPAN) public view returns(Invoice[] memory) {
        return(invoicesByBuyer[_buyerPAN]);
    }
}