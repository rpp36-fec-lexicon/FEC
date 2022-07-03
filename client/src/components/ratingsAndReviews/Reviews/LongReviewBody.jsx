import React from 'react';

class LongReviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewBody: ''
    };
  }

  componentDidMount() {
    this.setState({reviewBody: this.props.reviewBody.substring(0, 250)});
  }

  showAllReviewBodyFunc() {
    this.setState({reviewBody: this.props.reviewBody});
  }

  render() {

    return (
      <div>
        <div>{this.state.reviewBody}</div>
        <a onClick={ () => { this.showAllReviewBodyFunc() }}>Show more</a>
      </div>
    );
  }
}

// const LongReviewBody = (props) => {
//   const first250 = props.reviewBody.substring(0, 250);
//   const after250 = props.reviewBody.substring(250, props.reviewBody.length);
//   return (
//     <div>
//       <div>{first250}</div>
//       <a onClick={ () => { props.showAllReviewBodyFunc() }}>Show more</a>
//     </div>
//   );
// }

export default LongReviewBody;