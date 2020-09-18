import React, { Component } from 'react';
import * as RiIcons from "react-icons/ri";


export default class Tab2 extends Component {
  render() {
    return (
        <div className="tab-pane fade active show" id="metrics">
            <div className="container">
                <div className="row"> 
                  
                  <div className="col-md-12 card hover-shadow-2 text-center">
                    <div className="card-body">
                      <h4 className="card-title font-weight-bold header-left pl-7" ><span className="mr-5 font-weight-bolder"><RiIcons.RiMoneyDollarCircleFill size={28} style={{color:"#3cd458"}}/></span>Minimum Stake Amount <span className="pl-2" style={{color: "#816af8"}}>{this.props.minStakeAmount}</span></h4>
                    </div>
                  </div>
                  
                  <div className="col-md-12 card hover-shadow-4">
                    <div className="card-body ">
    <h4 className="card-title font-weight-bold header-left pl-7" ><span className="mr-5 font-weight-bolder"><RiIcons.RiStackFill size={28} style={{color:"#8772F8"}}/></span>Total SALE Staked <span className="pl-2" style={{color: "#816af8"}}>{this.props.totalSaleStaked}</span></h4>
                    </div>
                  </div>
                  
                  <div className="col-md-12 card hover-shadow-4">
                    <div className="card-body">
                    <h4 className="card-title font-weight-bold header-left pl-7" ><span className="mr-5"><RiIcons.RiWallet3Fill size={28} style={{color:"#88440d"}}/></span>Your SALE Staked <span className="pl-2" style={{color: "#816af8"}}>{this.props.yourSaleStaked}</span></h4>
                    </div>
                  </div>
                  
                  <div className="col-md-12 card hover-shadow-4">
                    <div className="card-body">
    <h4 className="card-title font-weight-bold header-left pl-7" ><span className="mr-5 font-weight-bolder"><RiIcons.RiFireFill size={28} style={{color:"#ff4954"}}/></span>Total SALE Burned by Contract<span className="pl-2" style={{color: "#816af8"}}>{this.props.totalBurned}</span></h4>
                    </div>
                  </div>
                  
                  

                </div>
              </div>
        </div>
                   
    );
  }
}
