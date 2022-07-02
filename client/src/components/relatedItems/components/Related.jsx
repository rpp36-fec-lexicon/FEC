import React from "react";
import $ from "jquery";
import RelatedCard from "./RelatedCard.jsx";
import Flickity from "react-flickity-component";

const flickityOptions = {
  cellAlign: "left",
  contain: true,
};

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodID: this.props.prodID,
      relatedProdIDs: [],
      seen: false,
    };
  }

  // componentDidMount () {}
  relatedProductIDFetcher() {
    $.ajax({
      type: "GET",
      url: `/products/${this.state.prodID}/related`,
      success: (arrayOfProdIDs) => {
        this.setState({
          relatedProdIDs: arrayOfProdIDs,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  comparison() {
    console.log("feat");
    this.setState({
      seen: !this.state.seen,
    });
  }

  render() {
    return (
      <div>
        Related Products: <br></br>Temp prodID: 71698
        <br></br>
        <br></br>
        <button onClick={this.relatedProductIDFetcher.bind(this)}>
          get Related Products (temp button)
        </button>
        <br></br>
        <br></br>
        <div>
          {" "}
          {this.state.seen ? (
            <PopUp toggle={this.comparison.bind(this)} />
          ) : null}{" "}
        </div>
        <div
          style={{
            padding: "15px 15px 15px 15px",
            marginRight: "50px",
            marginLeft: "50px",
          }}
        >
          <Flickity options={flickityOptions}>
            {this.state.relatedProdIDs.map((itemID, index) => (
              <RelatedCard
                relatedItemID={itemID}
                comparison={this.comparison.bind(this)}
                key={index}
              />
            ))}
          </Flickity>
        </div>
      </div>
    );
  }
}

class PopUp extends React.Component {
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;{" "}
          </span>
          <p>comparison</p>
        </div>
      </div>
    );
  }
}

export default Related;
