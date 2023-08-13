import React from "react";
import { ethers } from "ethers";
import { SHA256 } from "crypto-js";

class Verification {
  constructor(config, abi) {
    this.config = config;
    this.contractAddr = this.config.contract_addr;
    this.address = this.config.address;
    this.pvtKey = this.config.pvt_key;
  this.provider = new ethers.AlchemyProvider("maticmum", this.config.provider);
     this.signer = new ethers.Wallet(this.pvtKey, this.provider);
     this.contract = new ethers.Contract(this.contractAddr, abi, this.provider);
    this.tx = {
      from: this.address,
      to: this.contractAddr,
      // gasLimit: ethers.hexlify(250000),
      // gasPrice: ethers.hexlify(ethers.parseUnits("10", "gwei")),
      chainId: 80001,
    };
  }

  generateHash(row) {
    return SHA256(row).toString();
   // return ethers.keccak256(ethers.toUtf8Bytes(row));
  }

  async uploadHash(row, address) {
    console.log(row)
    const digest = this.generateHash(row);
    address = ethers.getAddress(address);
  //  console.log(address,digest)
    const data = this.contract.interface.encodeFunctionData("uploadHash", [
      `0x${digest}`,
      Math.floor(Date.now() / 1000),
      address,
    ]);

    // const nonce = await this.provider.getTransactionCount(this.address);
    // this.tx.nonce = ethers.hexlify(nonce);
    // this.tx.data = data;

    // const signedTx = await this.signer.signTransaction(this.tx);
    // const txResponse = await this.provider.sendTransaction(signedTx);
    // await txResponse.wait();

    // return txResponse.hash;
  }

  async verifyHash(row) {
    console.log(row)
    const digest = this.generateHash(row);
   return await this.contract.verify(`0x${digest}`);
  }
}
export default Verification;