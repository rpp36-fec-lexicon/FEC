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
      disableUpload: false
    };
    this.ratingMessage = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great'
    };
    this.characteristics = {
      "Size": {
        1: 'A size too small',
        // 2: '1'.sup() + '/' + '2'.sub() + ' a size too small',
        2: '1/2 a size too small',
        3: 'Perfect',
        // 4: '1'.sup() + '/' + '2'.sub() + ' a size too big',
        4: '1/2 a size too big',
        5: 'A size too wide'
      },
      "Width": {
        1: 'Too narrow',
        2: 'Slightly narrow',
        3: 'Perfect',
        4: 'Slightly wide',
        5: 'Too wide'
      },
      "Fit": {
        1: 'Runs tight',
        2: 'Runs slightly tight',
        3: 'Perfect',
        4: 'Runs slightly long',
        5: 'Runs long'
      },
      "Length": {
        1: 'Runs short',
        2: 'Runs slightly short',
        3: 'Perfect',
        4: 'Runs slightly long',
        5: 'Runs long'
      },
      "Comfort": {
        1: 'Uncomfortable',
        2: 'Slightly uncomfortable',
        3: 'Ok',
        4: 'Comfortable',
        5: 'Perfect'
      },
      "Quality": {
        1: 'Poor',
        2: 'Below average',
        3: 'What I expected',
        4: 'Pretty great',
        5: 'Perfect'
      }
    }
    this.clickFillStarFunc = this.clickFillStarFunc.bind(this);
    this.charactersLeftFunc = this.charactersLeftFunc.bind(this);
    this.photoUploadedFunc = this.photoUploadedFunc.bind(this);
    this.submitReviewFunc = this.submitReviewFunc.bind(this);
    this.mandatoryFilledFunc = this.mandatoryFilledFunc.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
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

    if (this.state.photos.length === 5) {
      this.setState({disableUpload: true});
      return;
    }
    const photos = Array.from(e.target.files);
    if (photos[0].type === 'image/jpeg' || photos[0].type === 'image/gif' || photos[0].type === 'image/png' || photos[0].type === 'image/bmp' || photos[0].type === 'image/jpg') {
      document.getElementById('imageMessage').innerHTML = '';
      photos.map(photo => {
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.addEventListener('loadend', () => {
          const urls = this.state.photos.slice();
          urls.push(reader.result);
          this.setState({photos: urls, disableUpload: urls.length === 5});
        });
      });
    } else {
      document.getElementById('imageMessage').innerHTML = 'Invalid image, please upload again'
    }

  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
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

    const prop1 = document.getElementById('property1').checked;
    console.log('prop1', prop1)
    const prop2 = document.getElementById('property2').checked;
    const prop3 = document.getElementById('property3').checked;
    const prop4 = document.getElementById('property4').checked;
    const prop5 = document.getElementById('property5').checked;

    if (!prop1 && !prop2 && !prop3 && !prop4 && !prop5) {
      console.log('characterics failed')
      return false;
    }


    // const reviewBodyEle = document.getElementById('reviewBody');
    // if (reviewBodyEle.value.length === 0 || reviewBodyEle.value.length < 50) {
    //   return false;
    // }

    // const nicknameEle = document.getElementById('nickname');
    // if (nicknameEle.value.length === 0) {
    //   return false;
    // }

    // const email = document.getElementById('email').value;
    // if (!this.validateEmail(email)) {
    //   return false;
    // }

    return true;
  }



  submitReviewFunc() {

  }

  render() {
    const ulStyle = {
      listStyle: 'none',
      display: 'block'
    };

    const liStyle = {
      float: 'left',
      display: 'block',
      width: '85px',
      textAlign: 'center'
    };

    const labelStyle = {
      display: 'block'
    };

    const sameLineStyle = {
      display: 'flex'
    };

    const messageStyle = {
      fontSize: '20px',
      margin: 'auto 10px'
    };

    const characteristics = [];
    for (var key in this.characteristics) {
      characteristics.push([key, this.characteristics[key]]);
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

            <div id="characteristics">
              <h3>Characteristics</h3>
              <div>
                {characteristics.map((characteristic, index) => {
                  return (<div key={index}>
                    <b>{characteristic[0]}</b>
                    <input type="radio" id="property1" name="property" value="yes"></input><label htmlFor="">{characteristic[1]['1']}</label>
                    <input type="radio" id="property2" name="property" value="no"></input><label htmlFor="">{characteristic[1]['2']}</label>
                    <input type="radio" id="property3" name="property" value="yes"></input><label htmlFor="">{characteristic[1]['3']}</label>
                    <input type="radio" id="property4" name="property" value="no"></input><label htmlFor="">{characteristic[1]['4']}</label>
                    <input type="radio" id="property5" name="property" value="no"></input><label htmlFor="">{characteristic[1]['5']}</label>
                  </div>);
                })}
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
              <UploadPhotoButton photoUploadedFunc={this.photoUploadedFunc} disabled={this.state.disableUpload}/>
              <div id="imageMessage"></div>
              <UploadedPhotos photos={this.state.photos}/>
            </div>

            <div>
              <h3>What is your nickname?<sup>*</sup></h3>
              <input type="input" id="nickname" maxLength="60" placeholder="Example: jackson11!"></input>
              <div>For privacy reasons, do not use your full name or email address</div>
            </div>

            <div>
              <h3>Your email<sup>*</sup></h3>
              <input id="email" type="input" maxLength="60" placeholder="Example: jackson11@email.com"></input>
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
