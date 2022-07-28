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
    this.handleComparison();
  }

  handleComparison() {
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

      if (!mainProdFeatCollection.includes(mainProdFeatTuple)) {
        mainProdFeatCollection.push(mainProdFeatTuple);
      }
    });

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
      if (!relatedProdFeatCollection.includes(relatedProdFeatTuple)) {
        relatedProdFeatCollection.push(relatedProdFeatTuple);
      }
    });

    let commonFeat = [];
    let mainProdUnqFeat = [];
    let relatedProdUnqFeat = [];
    mainProdFeatCollection.forEach((featureDescrp) => {
      if (
        relatedProdFeatCollection.includes(featureDescrp) &&
        !commonFeat.includes(featureDescrp)
      ) {
        commonFeat.push(featureDescrp);
      }
    });

    mainProdFeatCollection.forEach((featureDescrp) => {
      if (!relatedProdFeatCollection.includes(featureDescrp)) {
        mainProdUnqFeat.push(featureDescrp);
      }
    });

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

  render() {
    return (
      <div
        className="compModal"
        onClick={(e) => {
          let timeOfClick = new Date().toLocaleString("en-US", {
            hour12: false,
          });
          let element = `Selectors: {LocalName: ${e.target.localName}, ClassName: ${e.target.className}, innerHTML: ${e.target.innerHTML}}`;
          this.props.userTracker(element, "Related Widget", timeOfClick);
        }}
      >
        <div className="compModal_content">
          <table>
            <tbody>
              <tr>
                <td colSpan="3">
                  <b>
                    <em>Comparison</em>
                    <hr></hr>
                  </b>
                </td>
              </tr>
              <tr>
                <td>
                  <b>{this.props.mainProdName}</b>
                </td>
                <td>
                  <b>Feature</b>
                </td>
                <td>
                  <b>{this.props.relatedProdName}</b>
                </td>
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
  return (
    <tr style={{ overflowY: "auto" }}>
      <td role="checkMark">&#10003;</td>
      <td>{props.feature}</td>
      <td role="checkMark">&#10003;</td>
    </tr>
  );
};

const MainFeatureMapper = (props) => {
  return (
    <tr style={{ overflowY: "auto" }}>
      <td role="MaincheckMark">&#10003;</td>
      <td>{props.feature}</td>
      <td></td>
    </tr>
  );
};

const RelatedFeatureMapper = (props) => {
  return (
    <tr style={{ overflowY: "auto" }}>
      <td></td>
      <td>{props.feature}</td>
      <td role="checkMark">&#10003;</td>
    </tr>
  );
};
export default Comparison;
