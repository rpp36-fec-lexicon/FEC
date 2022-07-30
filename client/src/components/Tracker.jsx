// import React from 'react';
// import axios from 'axios';
// // const myAPIKey = process.env.myAPIKey;

// const Tracker = (WrappedComponent, nameOfWidget) => {
//   return class extends React.Component {
//     constructor(props) {
//       super(props);
//       this.wrapperClickTracker = this.wrapperClickTracker.bind(this);
//     }

//     wrapperClickTracker (e) {
//       let element = `${e.target.className}`;
//       let time = new Date().toLocaleString('en-US', {hour12: false});
//       let widget = nameOfWidget;
//       let data = {
//         element, time, widget
//       };
//       console.log(element);
//       /*
//       post request to /interactions
//       */
//       axios.post('/interactions', {
//         body: data
//       })
//         .then(res => {
//           console.log(`interaction data was sent ${res}`);
//         }).catch(err => {
//           console.log(`failed to send interaction data: ${err}`);
//         });
//     }

//     render() {
//       return (
//         <WrappedComponent wrapperClickTracker={this.wrapperClickTracker} {...this.props} />
//       );
//     }
//   };
// };

// export default Tracker;
