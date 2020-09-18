import React, { Component } from 'react';
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Web3 from 'web3';
import Web3Connect from "web3connect";
import { STAKE_ADDRESS, STAKE_TOKEN_ADDRESS, DXSTAKEABI, STAKETOKENABI } from '../../config'

var WalletConnectProvider = require('@walletconnect/web3-provider');

export default class SectionMain extends Component {

  constructor(){
    super();
    this.state = { 
      account: '',
      saleBalance: 0,
      minStakeAmount: 0,
      totalSaleStaked: 0,
      yourSaleStaked: 0,
      totalBurned: 0,
      userRewards: 0,
      approvalAmount: 0,
      stakeContract: null,
      tokenContract: null,
      stakeAmount: 0,
      unstakeAmount: 0,
      web3: null,
      loading: true,
      loading2:false, // Hash - This is to test out the loading animation for contract approve button
      loading3:false, // Hash - Loading icon for Stake BTN
      loading4:false, // Hash - Loading icon for UnStake BTN
      loading5:false, // Hash - Loading icon for Reinvest BTN
      loading6:false, // Hash - Loading icon for Unstake & Claim BTN
      loading7:false, // Hash - Loading icon for Claim BTN
      approved: false,
      name: "React",
      showTab1: true,
      showTab2: false,
      //Bind functions to state
      handleStakeUpdate: this.handleStakeUpdate.bind(this),
      handleUnStakeUpdate: this.handleUnStakeUpdate.bind(this),
      setStake: this.setStake.bind(this),
      removeStake: this.removeStake.bind(this),
      claimRewards: this.claimRewards.bind(this),
      reinvestRewards: this.reinvestRewards.bind(this),
      unstakeAll: this.unstakeAll.bind(this),
      approveContract: this.approveContract.bind(this),
    };

  }

  //Update stake amount -> functions for child component
  handleStakeUpdate(event){
    this.setState({ stakeAmount: event.target.value });
  }

  //Update unstake amount -> functions for child component
  handleUnStakeUpdate(event){
    this.setState({ unstakeAmount: event.target.value });
  }

  // Connect and load contracts and data as needed 
  async connectAndLoad(){
    if (this.state.web3 != null){
      const accounts = await this.state.web3.eth.getAccounts();
      this.setState({ account: accounts });
      console.log("My Address: ", this.state.account);
      const stkContract = new this.state.web3.eth.Contract(DXSTAKEABI, STAKE_ADDRESS);
      this.setState({ stakeContract: stkContract });
      const tknContract = new this.state.web3.eth.Contract(STAKETOKENABI, STAKE_TOKEN_ADDRESS);
      this.setState({ tokenContract: tknContract });
      this.setState({ loading: false })
      this.reloadData();
    }
  }

  reloadData(){
    this.minStkAmount();
    this.getTokenBalance();
    this.getContractAllowance();
    this.getUserRewards();
    this.getUserStake();
    this.getTotalStake();
    this.getTotalBurned();
    console.log("Current State: ", this.state)
  }

  // Get minimum staking amount
  async minStkAmount(){
    if (this.state.web3 !== null && this.state.stakeContract !== null){
      const minAmount = await this.state.stakeContract.methods.getMinimumStakeAmount().call();
      this.setState({minStakeAmount: minAmount/1000000000000000000});
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get user token balance
  async getTokenBalance(){
    if (this.state.web3 !== null && this.state.tokenContract !== null && this.state.account !== ''){
      const amount = await this.state.tokenContract.methods.balanceOf(this.state.account[0]).call();
      this.setState({saleBalance: amount/1000000000000000000});
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get contract allowance
  async getContractAllowance(){
    if (this.state.web3 !== null && this.state.tokenContract !== null && this.state.account !== ''){
      const amount = await this.state.tokenContract.methods.allowance(this.state.account[0], STAKE_ADDRESS).call();
      this.setState({approvalAmount: amount/1000000000000000000});
      const approvalCheck = amount/1000000000000000000;
      console.log("Approval amount", approvalCheck)
      if (approvalCheck >= 40000000 ){
        this.setState({approved: true});
      }
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get user rewards
  async getUserRewards(){
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const amount = await this.state.stakeContract.methods.CHECKREWARD().call({ from: this.state.account[0] });
      if (amount >= 50000000){
        this.setState({userRewards: 0});
      }
      else{
        this.setState({userRewards: Math.floor((amount*100)/100)});
      }
      
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get user staked tokens
  async getUserStake(){
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const amount = await this.state.stakeContract.methods.CHECKSTAKE().call({ from: this.state.account[0] });
      console.log("Users Staked amount: ", amount)
      if (amount >= 1000000000){
        this.setState({yourSaleStaked: 0});
      }
      else{
        this.setState({yourSaleStaked: Math.floor((amount*100)/100)});
      }
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get total staked tokens
  async getTotalStake(){
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const amount = await this.state.stakeContract.methods.totalStaked().call();
      this.setState({totalSaleStaked: amount/1000000000000000000});
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get burned tokens
  async getTotalBurned(){
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const amount = await this.state.stakeContract.methods.totalBurned().call();
      this.setState({totalBurned: Math.ceil((amount/1000000000000000000*100)/100)});
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Set stake function
  async setStake() {
    this.setState({ loading3: true }); // start load animation inside button = Hash
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      console.log(this.state.stakeAmount);
      const stakeAmount = String(Math.floor(this.state.stakeAmount)) + "000000000000000000";
      console.log(stakeAmount)
      this.state.stakeContract.methods.createStake(stakeAmount).send({ from: this.state.account[0] })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
      });
    }
    
  };

  // Remove stake function 
  async removeStake() {
    this.setState({ loading4: true }); // start load animation inside button = Hash
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const stakeAmount = String(Math.floor(this.state.unstakeAmount)) + "000000000000000000";
      this.state.stakeContract.methods.finishStake(stakeAmount).send({ from: this.state.account[0] })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
      });
    }
  };

  // Claim rewards function
  async claimRewards() {
    this.setState({ loading7: true }); // start load animation inside button = Hash
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      this.state.stakeContract.methods.CLAIMREWARD().send({ from: this.state.account[0] })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
      });
    }
  };

  // Reinvest rewards function
  async reinvestRewards() {
    this.setState({ loading5: true }); // start load animation inside button = Hash
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      this.state.stakeContract.methods.REINVESTREWARD().send({ from: this.state.account[0] })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
      });
    }
  };

  // Unstake all and claim rewards function
  async unstakeAll() {
    this.setState({ loading6: true }); // start load animation inside button = Hash
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      this.state.stakeContract.methods.UnStake().send({ from: this.state.account[0] })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
      });
    }
  };

  // Approve contract to spend tokens
  async approveContract(){
    this.setState({ loading2: true }); // start load animation inside button = Hash
    if (this.state.web3 !== null && this.state.tokenContract !== null && this.state.account !== ''){
      this.state.tokenContract.methods.approve(STAKE_ADDRESS, "5000000000000000000000000000").send({ from: this.state.account[0] })
      .once('receipt', (receipt) => {
        console.log(receipt);
        const status = this.isItApproved();
        if (status){
          this.setState({ approved: true });
          
          
        }
      });
    }
  }

  async isItApproved(){
    const amount = await this.state.tokenContract.methods.allowance(this.state.account[0], STAKE_ADDRESS).call();
    if (amount >= 40000000){
      this.setState({ approvalAmount: amount });
      return true;
    }
    else{
      return false;
    }
  }

  // Show tab 1 or 2
  showTab(name) {
    console.log(name);
    switch (name) {
      case "showTab1":
        if (!this.state.showTab1){
          this.setState({ showTab1: true })
          this.setState({ showTab2: false })
        }
        break;
      case "showTab2":
        if (!this.state.showTab2){
          this.setState({ showTab1: false })
          this.setState({ showTab2: true })
        }
        break;
    }
  }

  render() {
    const { showTab1, showTab2 } = this.state;
    return (
        <> 
          <nav className="navbar navbar-expand-lg navbar-dark navbar-stick-dark" data-navbar="static">
            <div className="container">

              <div className="navbar-left">
                <button className="navbar-toggler" type="button"><span className="navbar-toggler-icon"></span></button>
                    <a className="navbar-brand" href="staking.html">
                    <img className="logo-dark" src="assets/img/logo-dark.png" alt="logo"></img>
                    <img className="logo-light" src="assets/img  /logo-light.png" alt="logo"></img>
                    </a>
              </div>
              <Web3Connect.Button
                providerOptions={{
                  walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                      infuraId: "a79a4b4a904c4d3ea1f05fb708c42f8a" // required
                    }
                  }
                }}
                onConnect={(provider) => {
                  const newWeb3 = new Web3(provider); // add provider to web3
                  this.setState({ web3: newWeb3 });
                  this.connectAndLoad();
                  
                }}
                onClose={() => {
                  console.log("Web3Connect Modal Closed"); // modal has closed
                }}
              />
            </div>
        </nav>
        { this.state.loading 
          ? <div id="test" className="text-center"><br/><br/><br/><br/><h1 className="text-center">Connect your wallet to start!</h1></div> 
          : <main className="main-content">
              <section className="section bg-fixed py-10 overlay opacity-95" style= {{backgroundColor: "#6650B1"}}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 col-xl-8 mx-auto">
                        <div className=" shadow-lg section-dialog bg-white text-black text-center">
                            <p><img src="assets/img/dxstake-logo.png" alt="logo"></img></p>
                            <br></br>
                            
                            <div className="row">
                                <div className="col-md-12 col-xl-12 mx-auto">
                                    <ul className="nav nav-tabs-outline nav-center nav-separated" role="tablist">
                                        <li className="nav-item">
                                            <div id="dxstake-tab">
                                                <a className="nav-link " data-toggle="tab" onClick={() => this.showTab("showTab1")}>DxStake</a>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div id="metrics-tab">
                                                <a className="nav-link" data-toggle="tab" onClick={() => this.showTab("showTab2")}>Metrics</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-content p-4">
                              {showTab1 && <Tab1 {...this.state}/>}
                              <hr />
                              {showTab2 && <Tab2 {...this.state}/>}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
              </section>
            </main> 
        }
      </>
    );
  }
  onUpdate (saleBalance) { this.setState({ saleBalance }) }
}
