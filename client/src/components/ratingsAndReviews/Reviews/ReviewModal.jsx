import React from 'react';
import StarReviewIcon from './StarReviewIcon.jsx';

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedStar: null,
      message: null
    };
    this.clickFillStarFunc = this.clickFillStarFunc.bind(this);
    this.ratingMessage = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great'
    };
  }

  clickFillStarFunc(star) {
    const message = this.ratingMessage[star];
    this.setState({clickedStar: star, message});
  }

  render() {

    // const expandStyle = {
    //   width: '700px',
    //   height: '2000px'
    // };

    const sameLineStyle = {
      display: 'flex'
    };

    const messageStyle = {
      fontSize: '20px',
      margin: 'auto 10px'
    };



    return (
      <div className="reviewModal ">
        <div className="reviewModal-content reviewScrollable">
          <span className="close" onClick={() => { this.props.closeReviewModalFunc(); }}>&times;</span>
          <div>
            <h2>Write Your Review</h2>
            <h3>About the {this.props.productInfo.name}</h3>
            <h3>Overall Rating<sup>*</sup></h3>
            <div style={sameLineStyle}>
              <StarReviewIcon starNumber={1} clickFillStarFunc={this.clickFillStarFunc} filled={1 <= this.state.clickedStar} />
              <StarReviewIcon starNumber={2} clickFillStarFunc={this.clickFillStarFunc} filled={2 <= this.state.clickedStar} />
              <StarReviewIcon starNumber={3} clickFillStarFunc={this.clickFillStarFunc} filled={3 <= this.state.clickedStar} />
              <StarReviewIcon starNumber={4} clickFillStarFunc={this.clickFillStarFunc} filled={4 <= this.state.clickedStar} />
              <StarReviewIcon starNumber={5} clickFillStarFunc={this.clickFillStarFunc} filled={5 <= this.state.clickedStar} />
              <div style={messageStyle}>{this.state.message}</div>
            </div>
            <h3>Do you recommend this product?<sup>*</sup></h3>
            <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Yes</label>
            <input type="radio" id="" name="one" value="no"></input><label htmlFor="">No</label>
            <h3>Characteristics</h3>
            <div>
              <div>
                <b>Size</b>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">A size too small</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor=""><sup>1</sup>/<sub>2</sub> a size too small</label>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Perfect</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor=""><sup>1</sup>/<sub>2</sub> a size too big</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">A size too wide</label>
              </div>

              <div>
                <b>Width</b>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Too narrow</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Slightly narrow</label>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Perfect</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Slightly wide</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Too wide</label>
              </div>

              <div>
                <b>Comfort</b>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Uncomfortable</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Slightly uncomfortable</label>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Ok</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Comfortable</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Perfect</label>
              </div>

              <div>
                <b>Quality</b>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Poor</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Below average</label>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">What I expected</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Pretty great</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Perfect</label>
              </div>

              <div>
                <b>Length</b>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Runs short</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Runs slightly short</label>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Perfect</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Runs slightly long</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Runs long</label>
              </div>

              <div>
                <b>Fit</b>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Runs tight</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Runs slightly tight</label>
                <input type="radio" id="" name="one" value="yes"></input><label htmlFor="">Perfect</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Runs slightly long</label>
                <input type="radio" id="" name="one" value="no"></input><label htmlFor="">Runs long</label>
              </div>
            </div>

            <h3>Review summary</h3>
            <textarea type="input" className="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!"></textarea>

            <h3>Review body<sup>*</sup></h3>
            <textarea type="input" className="reviewBody" minLength="50" maxLength="1000" placeholder="Why did you like the product or not?"></textarea>
          </div>
        </div>
      </div>
    );
  }

}

export default ReviewModal;
