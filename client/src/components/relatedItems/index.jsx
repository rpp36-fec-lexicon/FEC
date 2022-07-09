import React from 'react';
import Related from './components/Related.jsx';
import Outfit from './components/Outfit.jsx';
import $ from 'jquery';

class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // prodId: "",
    };
    //
    // console.log("RelatedAndOutfit ID", this.props);
  }
  componentDidMount() {
    // this.setState({
    //   prodId: this.props.prodID,
    // });
    // console.log("RelatedAndOutfit", this.props.prodID);
    // $.ajax({
    //   type: "GET",
    //   url: `/products/${this.props.prodID}`,
    //   success: (prodInfo) => {
    //     // console.log("main prod", prodInfo.id); // {id, name, category, features...}
    //     this.setState({
    //       prodInfo: prodInfo,
    //     });
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  render() {

    console.log('props in related', this.props);

    // console.log("cons", this.props.prodID);


    // console.log("RelatedAndOutfit ID", this.props.prodID);

    return (
      <div>
        <Related
          prodID={this.props.prodID}
          // prodInfo={this.state.prodInfo}
          prodInfo={this.props.prodInfo}
          prodIDChanger={this.props.prodIDChanger}
        />
        <br></br>
        <br></br>
        <br></br>
        <Outfit
          prodID={this.props.prodID}
          prodInfo={this.props.prodInfo}
          // prodIDChanger={this.props.prodIDChanger}
        />
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default RelatedAndOutfit;
