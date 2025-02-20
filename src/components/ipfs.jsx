import React, { Component } from "react";
import { create } from "ipfs-http-client";

class Ipfs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      cid: "",
    };

    // Configure IPFS client with Infura credentials
    this.ipfs = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: `Basic ${btoa("c3ed831e633247428445b0375170c81a:fnwOJvLcI6Pmdp6PFf3kbDMKtGo/ART1g+NUSz43D2KLgzSouuqVhw")}`,
      },
    });
  }

  // Handle file input change
  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  // Upload file to IPFS
  uploadToIPFS = async () => {
    try {
      if (this.state.file) {
        const fileData = this.state.file;
        const added = await this.ipfs.add(fileData);
        this.setState({ cid: added.path }); // Save CID to state
        console.log("File uploaded to IPFS with CID:", added.path);
      } else {
        alert("Please select a file first.");
      }
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }
  };

  render() {
    return (
      <div className="ipfs-container">
        <h2>IPFS File Upload</h2>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.uploadToIPFS}>Upload to IPFS</button>
        {this.state.cid && (
          <p>
            File CID: <a href={`https://ipfs.io/ipfs/${this.state.cid}`} target="_blank" rel="noopener noreferrer">
              {this.state.cid}
            </a>
          </p>
        )}
      </div>
    );
  }
}

export default Ipfs;
