import React from 'react';
import StarReviewIcon from './StarReviewIcon.jsx';
import UploadedPhotos from './UploadedPhotos.jsx';
import UploadPhotoButton from './UploadPhotoButton.jsx';

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedStar: null,
      starMessage: null,
      reviewBodyMessage: 'Minimum required characters left: 50',
      photos: [],
    };
    this.ratingMessage = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great'
    };
    this.clickFillStarFunc = this.clickFillStarFunc.bind(this);
    this.charactersLeftFunc = this.charactersLeftFunc.bind(this);
    this.photoUploadedFunc = this.photoUploadedFunc.bind(this);
    this.submitReviewFunc = this.submitReviewFunc.bind(this);
    this.mandatoryFilledFunc = this.mandatoryFilledFunc.bind(this);
  }

  clickFillStarFunc(star) {
    const starMessage = this.ratingMessage[star];
    this.setState({clickedStar: star, starMessage});
  }

  charactersLeftFunc () {
    const textarea = document.getElementById('reviewBody');
    const minLength = 50;
    const maxLength = 1000;
    const currentTextLength = textarea.value.length;

    if (currentTextLength < minLength) {
      const remainingCharacters = 50 - currentTextLength;
      this.setState({reviewBodyMessage: `Minimum required characters left: ${remainingCharacters}`});
    } else if (currentTextLength >= minLength) {
      this.setState({reviewBodyMessage: `Minimum reached. Characters count: ${currentTextLength}`});
    }
  }

  photoUploadedFunc(e) {
    console.log('uploaded photo event', e);
    const files = e.target.files;
    const photos = Array.from(e.target.files);
    photos.forEach(photo => {
      const reader = new FileReader();
      reader.readAsText(photo);
      reader.addEventListener('loadend', () => {
        console.log('reader.result', reader.result)
      });
    });
  }

  mandatoryFilledFunc() {
    // if (!this.state.clickedStar) {
    //   return false;
    // }

    // const recommendYesEle = document.getElementById('recommendYes');
    // const recommendNoEle = document.getElementById('recommendNo');
    // if (!recommendYesEle.checked && !recommendNo.checked) {
    //   return false;
    // }

    const recommendEle = document.getElementById('recommend');
    const recommendChilren = recommendEle.children;
    const recChildrenArray = Array.from(recommendChilren);
    console.dir(recommendEle)
    console.log('children', recommendChilren, typeof recommendChilren);
    console.log('recChilrenArray', recChildrenArray, Array.isArray(recChildrenArray));
    console.log(recChildrenArray[1].checked);



  }

  submitReviewFunc() {

  }

  render() {

    const sameLineStyle = {
      display: 'flex'
    };

    const messageStyle = {
      fontSize: '20px',
      margin: 'auto 10px'
    };

    let uploadPhotoButton;
    if (this.state.photos.length < 5) {
      uploadPhotoButton = <UploadPhotoButton photoUploadedFunc={this.photoUploadedFunc}/>;
    } else {
      uploadPhotoButton = null;
    }

    let uploadedPhotos;
    if (this.state.photos.length < 5) {
      uploadedPhotos = <UploadedPhotos photos={this.state.photos}/>;
    } else {
      uploadedPhotos = null;
    }

    return (
      <div className="reviewModal ">
        <div className="reviewModal-content reviewScrollable">
          <span className="close" onClick={() => { this.props.closeReviewModalFunc(); }}>&times;</span>
          <div>
            <h2>Write Your Review</h2>
            <h3>About the {this.props.productInfo.name}</h3>

            <div>
              <h3>Overall Rating<sup>*</sup></h3>
              <div style={sameLineStyle}>
                <StarReviewIcon starNumber={1} clickFillStarFunc={this.clickFillStarFunc} filled={1 <= this.state.clickedStar} />
                <StarReviewIcon starNumber={2} clickFillStarFunc={this.clickFillStarFunc} filled={2 <= this.state.clickedStar} />
                <StarReviewIcon starNumber={3} clickFillStarFunc={this.clickFillStarFunc} filled={3 <= this.state.clickedStar} />
                <StarReviewIcon starNumber={4} clickFillStarFunc={this.clickFillStarFunc} filled={4 <= this.state.clickedStar} />
                <StarReviewIcon starNumber={5} clickFillStarFunc={this.clickFillStarFunc} filled={5 <= this.state.clickedStar} />
                <div style={messageStyle}>{this.state.starMessage}</div>
              </div>
            </div>

            <div id="recommend">
              <h3>Do you recommend this product?<sup>*</sup></h3>
              <input type="radio" id="" name="recommend" value="yes"></input><label htmlFor="">Yes</label>
              <input type="radio" id="" name="recommend" value="no"></input><label htmlFor="">No</label>
            </div>

            <div>
              <h3>Characteristics</h3>
              <div>
                <div>
                  <b>Size</b>
                  <input type="radio" id="" name="size" value="yes"></input><label htmlFor="">A size too small</label>
                  <input type="radio" id="" name="size" value="no"></input><label htmlFor=""><sup>1</sup>/<sub>2</sub> a size too small</label>
                  <input type="radio" id="" name="size" value="yes"></input><label htmlFor="">Perfect</label>
                  <input type="radio" id="" name="size" value="no"></input><label htmlFor=""><sup>1</sup>/<sub>2</sub> a size too big</label>
                  <input type="radio" id="" name="size" value="no"></input><label htmlFor="">A size too wide</label>
                </div>

                <div>
                  <b>Width</b>
                  <input type="radio" id="" name="width" value="yes"></input><label htmlFor="">Too narrow</label>
                  <input type="radio" id="" name="width" value="no"></input><label htmlFor="">Slightly narrow</label>
                  <input type="radio" id="" name="width" value="yes"></input><label htmlFor="">Perfect</label>
                  <input type="radio" id="" name="width" value="no"></input><label htmlFor="">Slightly wide</label>
                  <input type="radio" id="" name="width" value="no"></input><label htmlFor="">Too wide</label>
                </div>

                <div>
                  <b>Comfort</b>
                  <input type="radio" id="" name="comfort" value="yes"></input><label htmlFor="">Uncomfortable</label>
                  <input type="radio" id="" name="comfort" value="no"></input><label htmlFor="">Slightly uncomfortable</label>
                  <input type="radio" id="" name="comfort" value="yes"></input><label htmlFor="">Ok</label>
                  <input type="radio" id="" name="comfort" value="no"></input><label htmlFor="">Comfortable</label>
                  <input type="radio" id="" name="comfort" value="no"></input><label htmlFor="">Perfect</label>
                </div>

                <div>
                  <b>Quality</b>
                  <input type="radio" id="" name="quality" value="yes"></input><label htmlFor="">Poor</label>
                  <input type="radio" id="" name="quality" value="no"></input><label htmlFor="">Below average</label>
                  <input type="radio" id="" name="quality" value="yes"></input><label htmlFor="">What I expected</label>
                  <input type="radio" id="" name="quality" value="no"></input><label htmlFor="">Pretty great</label>
                  <input type="radio" id="" name="quality" value="no"></input><label htmlFor="">Perfect</label>
                </div>

                <div>
                  <b>Length</b>
                  <input type="radio" id="" name="length" value="yes"></input><label htmlFor="">Runs short</label>
                  <input type="radio" id="" name="length" value="no"></input><label htmlFor="">Runs slightly short</label>
                  <input type="radio" id="" name="length" value="yes"></input><label htmlFor="">Perfect</label>
                  <input type="radio" id="" name="length" value="no"></input><label htmlFor="">Runs slightly long</label>
                  <input type="radio" id="" name="length" value="no"></input><label htmlFor="">Runs long</label>
                </div>

                <div>
                  <b>Fit</b>
                  <input type="radio" id="" name="fit" value="yes"></input><label htmlFor="">Runs tight</label>
                  <input type="radio" id="" name="fit" value="no"></input><label htmlFor="">Runs slightly tight</label>
                  <input type="radio" id="" name="fit" value="yes"></input><label htmlFor="">Perfect</label>
                  <input type="radio" id="" name="fit" value="no"></input><label htmlFor="">Runs slightly long</label>
                  <input type="radio" id="" name="fit" value="no"></input><label htmlFor="">Runs long</label>
                </div>
              </div>
            </div>

            <div>
              <h3>Review summary</h3>
              <textarea type="input" className="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!"></textarea>
            </div>

            <div>
              <h3>Review body<sup>*</sup></h3>
              <textarea type="input" id="reviewBody" className="reviewBody" minLength="50" maxLength="1000" placeholder="Why did you like the product or not?" onChange={() => { this.charactersLeftFunc(); }}></textarea>
              <div>{this.state.reviewBodyMessage}</div>
            </div>

            <div>
              <h3>Upload your photos</h3>
              {uploadPhotoButton}
              {uploadedPhotos}
            </div>

            <div>
              <h3>What is your nickname?<sup>*</sup></h3>
              <input type="input" maxLength="60" placeholder="Example: jackson11!"></input>
              <div>For privacy reasons, do not use your full name or email address</div>
            </div>

            <div>
              <h3>Your email<sup>*</sup></h3>
              <input type="input" maxLength="60" placeholder="Example: jackson11@email.com"></input>
              <div>For authentication reasons, you will not be emailed</div>
            </div>

            <div>
              <button onClick={() => { this.mandatoryFilledFunc(); }}>Submit review</button>
            </div>

          </div>
        </div>
      </div>
    );
  }

}

export default ReviewModal;
