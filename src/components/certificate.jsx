import React, { Component } from "react";
import { Button } from "react-bootstrap";
import QRCode from "react-qr-code"; // QR Code library
import { ethers } from "ethers"; // For MetaMask integration
import "../certstyle.css";
import crypto from "crypto"; // For generating hash

class Certificate extends Component {
  state = {
    certificateHash: "", // Certificate hash
    signedHash: "",      // Signed hash from MetaMask
    isSigned: false,     // Status to track signing
  };

  // Generate a unique hash for the certificate
  generateCertificateHash = () => {
    const data = `${this.props.sname}${this.props.course}${this.props.txh}${this.props.id}`;
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    this.setState({ certificateHash: hash });
    return hash;
  };

  // Connect to MetaMask and sign the certificate hash
  signCertificate = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to sign the certificate.");
        return;
      }

      // Connect to MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request access to MetaMask
      const signer = provider.getSigner();

      // Prompt MetaMask to sign the certificate hash
      const signedHash = await signer.signMessage(this.state.certificateHash);

      // Update state with signed hash
      this.setState({ signedHash, isSigned: true });
      alert("Certificate successfully signed!");
    } catch (error) {
      console.error("Error signing the certificate:", error);
      alert("Failed to sign the certificate.");
    }
  };

  // Print functionality
  onclickprint = (event) => {
    event.preventDefault();
    window.print();
  };

  componentDidMount() {
    // Generate the hash when the component mounts
    this.generateCertificateHash();
  }

  render() {
    return (
      <div className="w-100 pc">
        <div id="printcertificate" className="w-75 cert">
          <div id="fname">
            <span>{this.props.sname}</span>
          </div>
          <div id="course">
            <style>{`@media print {#course{color:red;}}`}</style>
            <span>{this.props.course}</span>
          </div>
          <div id="txh">
            <span>{this.props.txh}</span>
          </div>
          <div id="id">
            <span>{this.props.id}</span>
          </div>

          {/* Show the QR Code after signing */}
          {this.state.isSigned && (
            <div id="qr-code" style={{ marginTop: "20px" }}>
              <strong>Scan to Verify:</strong>
              <QRCode value={this.state.signedHash} size={150} />
            </div>
          )}

          {/* Show the Signed Hash */}
         
        </div>

        {/* Button to Sign Certificate */}
        {!this.state.isSigned && (
          <Button
            className="btn btn-primary"
            onClick={this.signCertificate}
            variant="primary"
            type="button"
          
          >
            Sign Certificate
          </Button>
        )}

        {/* Print Button */}
        {this.state.isSigned && (
          <Button
            className="btn btn-success"
            onClick={this.onclickprint}
            variant="success"
            type="submit"
          >
            Print
          </Button>
        )}
      </div>
    );
  }
}

export default Certificate;
