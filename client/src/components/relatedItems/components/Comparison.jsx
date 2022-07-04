import React from "react";

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commonFeat: "",
      mainProdUnqFeat: "",
      relatedProdUnqFeat: "",
    };
  }
  componentDidMount() {
    // commonFeat
    // mainProdUnqFeat
    // relatedProdUnqFeat
    const mainProdFeatObj = [];
    this.props.mainProdFeat.forEach((featureObj) => {
      mainProdFeatObj.push(Object.entries(featureObj));
    });

    const mainProdFeatCollection = [];
    mainProdFeatObj.forEach((featTuple) => {
      let mainProdFeatTuple = "";
      if (featTuple[1][1] !== null) {
        mainProdFeatTuple = `${featTuple[0][1]} (${featTuple[1][1]})`;
      } else {
        mainProdFeatTuple = `${featTuple[0][1]}`;
      }
      mainProdFeatCollection.push(mainProdFeatTuple);
    });
    // console.log("main", mainProdFeatCollection);

    const relatedProdFeatObj = [];
    this.props.relatedProdFeat.forEach((featureObj) => {
      relatedProdFeatObj.push(Object.entries(featureObj));
    });

    const relatedProdFeatCollection = [];
    relatedProdFeatObj.forEach((featTuple) => {
      let relatedProdFeatTuple = "";
      if (featTuple[1][1] !== null) {
        relatedProdFeatTuple = `${featTuple[0][1]} (${featTuple[1][1]})`;
      } else {
        relatedProdFeatTuple = `${featTuple[0][1]}`;
      }
      relatedProdFeatCollection.push(relatedProdFeatTuple);
    });
    // console.log("related", relatedProdFeatCollection);

    let commonFeat = [];
    let mainProdUnqFeat = [];
    // loop over main, find if exists in rela, add to common
    mainProdFeatCollection.forEach((featureDescrp) => {
      if (relatedProdFeatCollection.includes(featureDescrp)) {
        commonFeat.push(featureDescrp);
      } else {
        mainProdUnqFeat.push(featureDescrp);
      }
    });

    let relatedProdUnqFeat = [];
    relatedProdFeatCollection.forEach((featureDescrp) => {
      if (!mainProdFeatCollection.includes(featureDescrp)) {
        relatedProdUnqFeat.push(featureDescrp);
      }
    });

    this.setState({
      commonFeat: commonFeat,
      mainProdUnqFeat: mainProdUnqFeat,
      relatedProdUnqFeat: relatedProdUnqFeat,
    });
  }
  handleCloseButton = () => {
    this.props.toggle();
  };
  render() {
    console.log("props in comp", this.props);
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleCloseButton}>
            &times;{" "}
          </span>
          <table>
            <tbody>
              <tr>
                <td colSpan="3">Comparison</td>
              </tr>
              <tr>
                <td>{this.props.mainProdName}</td>
                <td>Feature</td>
                <td>{this.props.relatedProdName}</td>
              </tr>
              {this.state.commonFeat.length !== 0
                ? this.state.commonFeat.map((feature, index) => (
                    <CommonFeatureMapper feature={feature} key={index} />
                  ))
                : null}

              {this.state.mainProdUnqFeat.length !== 0
                ? this.state.mainProdUnqFeat.map((feature, index) => (
                    <MainFeatureMapper feature={feature} key={index} />
                  ))
                : null}

              {this.state.relatedProdUnqFeat.length !== 0
                ? this.state.relatedProdUnqFeat.map((feature, index) => (
                    <RelatedFeatureMapper feature={feature} key={index} />
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const CommonFeatureMapper = (props) => {
  // console.log("ff", props);
  return (
    <tr>
      <td>&#10003;</td>
      <td>{props.feature}</td>
      <td>&#10003;</td>
    </tr>
  );
};

const MainFeatureMapper = (props) => {
  // console.log("MainFeatureMapper", props);
  return (
    <tr>
      <td>&#10003;</td>
      <td>{props.feature}</td>
      <td></td>
    </tr>
  );
};

const RelatedFeatureMapper = (props) => {
  // console.log("ff", props);
  return (
    <tr>
      <td></td>
      <td>{props.feature}</td>
      <td>&#10003;</td>
    </tr>
  );
};
export default Comparison;
