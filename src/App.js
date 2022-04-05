import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import InvoiceData from './artifacts/contracts/InvoiceData.sol/InvoiceData.json'

const invoicedataAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function App() {

  const [buyerPAN, setBuyerPAN] = useState()
  const [sellerPAN, setSellerPAN] = useState()
  const [amount, setAmount] = useState()
  const [date, setDate] = useState()
  const [paymentStatus, setPaymentStatus] = useState()
  const [sellerAddress, setSellerAddress] = useState()
  const [invoiceNumber, setInvoiceNumber] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function createInvoice_() {
    if (!buyerPAN && !sellerPAN && !amount && !date && !sellerAddress) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(invoicedataAddress, InvoiceData.abi, signer)
      const transaction = await contract.createInvoice(buyerPAN, sellerPAN, amount, date, paymentStatus, sellerAddress, invoiceNumber)
      await transaction.wait()
      console.log("Invoice Succesfully Created")
   }
  }

  async function getPaymentStatus_() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(invoicedataAddress, InvoiceData.abi, provider)
      try {
        const paymentStatus = await contract.getPaymentStatus(invoiceNumber)
        console.log('Payment Status: ', paymentStatus.toString())
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function getInvoicesByBuyer_() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(invoicedataAddress, InvoiceData.abi, provider)
      try {
        const invoices = await contract.getPaymentStatus(buyerPAN)
        console.log(invoices)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <input onChange={e => setBuyerPAN(e.target.value)} placeholder="Buyer PAN" />
        <input onChange={e => setSellerPAN(e.target.value)} placeholder="Seller PAN" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <input onChange={e => setDate(e.target.value)} placeholder="Date in DDMMYY" />
        <input onChange={e => setPaymentStatus(e.target.value)} placeholder="Payment Status(true or false)" />
        <input onChange={e => setSellerAddress(e.target.value)} placeholder="Seller Address" />
        <input onChange={e => setInvoiceNumber(e.target.value)} placeholder="Invoice Number" />
        <button onClick={createInvoice_}>Create Invoice</button>

        <br />
        <input onChange={e => setInvoiceNumber(e.target.value)} placeholder="Invoice Number" />
        <button onClick={getPaymentStatus_}>Get Payment Status</button>

        <br />
        <input onChange={e => setBuyerPAN(e.target.value)} placeholder="Buyer PAN" />
        <button onClick={getInvoicesByBuyer_}>Find Invoices</button>
      </header>
    </div>
  );
}

export default App;
