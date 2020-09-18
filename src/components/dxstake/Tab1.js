import React, { Component } from 'react';

export default class Tab1 extends Component {
  
  render() {
    return (
        <div className="tab-pane fade active show" id="dxstake">
        <div className="container">
          <br/>
          <h4>Address Balance: <span>{this.props.saleBalance}</span> </h4>
          <br/>
          { !this.props.approved
            ? <div id="approvalRequired">
                <button className="btn btn-danger" onClick={this.props.approveContract} disabled={this.props.loading2}>
                  {this.props.loading2 && <i className="fa fa-refresh fa-spin"></i>}
                  Approve Contract to Spend SALE
                </button>
              </div> 
            : <div id="showStaking">
                <form className="input-round">
                  <div className="form-group input-group">
                    <input type="number" className="form-control" placeholder="SALE AMOUNT" value={this.props.stakeAmount} onChange={this.props.handleStakeUpdate}></input>
                    <div className="input-group-prepend">
                      <button className="btn btn-primary overlay opacity-95 " onClick={this.props.setStake} type="button" style={{borderColor: "white", backgroundColor: "#816af8",  marginRight:"3px" }} disabled={this.props.loading3}>
                        {this.props.loading3 && <i className="fa fa-refresh fa-spin"></i>} Stake
                      </button>
                    </div>
                  </div>
                  <div className="form-group input-group">
                    <input type="number" className="form-control" placeholder="SALE AMOUNT" value={this.props.unstakeAmount} onChange={this.props.handleUnStakeUpdate}></input>
                    <div className="input-group-prepend">
                      <button className="btn btn-primary overlay opacity-95 stake_btn" onClick={this.props.removeStake} type="button" style={{borderColor: "white", backgrounColor: "#816af8",  marginRight:"3px"}} disabled={this.props.loading4}>
                      {this.props.loading4 && <i className="fa fa-refresh fa-spin"></i>}
                        Unstake
                      </button>
                    </div>
                  </div>
                  <br/>
                  <h4>Your Available Staking Rewards: <span>{this.props.userRewards}</span> </h4>
                  <br/>
                  <div>
                    <button className="btn btn-outline-success font-weight-bolder" type="button" onClick={this.props.reinvestRewards} disabled={this.props.loading5}>
                    {this.props.loading5 && <i className="fa fa-refresh fa-spin"></i>}
                      Reinvest
                    </button>
                    <button className="btn btn-outline-warning" type="button" onClick={this.props.unstakeAll} disabled={this.props.loading6}>
                    {this.props.loading6 && <i className="fa fa-refresh fa-spin"></i>}
                      Unstake and Claim
                    </button>
                    <button className="btn btn-outline-primary" type="button" onClick={this.props.claimRewards} disabled={this.props.loading7} >
                    {this.props.loading7 && <i className="fa fa-refresh fa-spin"></i>}  
                      Claim
                    </button>
                  </div>
                </form>
              </div>}
        </div>
      </div>
      
    );
  }
}
