import React from 'react';
import StarReviewIcon from './StarReviewIcon.jsx';
import UploadedPhotos from './UploadedPhotos.jsx';
import UploadPhotoButton from './UploadPhotoButton.jsx';
import SubmitReviewAlert from './SubmitReviewAlert.jsx';
import styled from 'styled-components';

const axios = require('axios');

const Button = styled.button`
  margin-right: 30px;
  height: 50px;
  width: auto;
  min-width: 100px;
  text-align: center;
  font-family: Optima, sans-serif;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid rgba(39, 200, 210, 0.9);
  color: rgba(39, 200, 210, 0.9);
  background-color: transparent;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: rgba(39, 200, 210, 0.9);
    box-shadow: 0px 5px 10px rgba(39, 200, 210, 0.4);
  }
  &:active {
    box-shadow: 10px 10px 9px 4px rgba(37, 125, 255, 0.7);
  }
`;

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedStar: null,
      starMessage: null,
      reviewBodyMessage: 'Minimum required characters left: 50',
      photos: [],
      disableUpload: false,
      errors: [],
      // characteristicReviews: {}

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
    };
    this.centerStyle = {
      textAlign: 'center'
    };
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
    const files = Array.from(e.target.files);
    const file = files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/jpg') {
      document.getElementById('imageMessage').innerHTML = '';
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', 'lexicon');
      axios.post('https://api.cloudinary.com/v1_1/lexicon-atelier/image/upload/', form, { headers: { 'X-Requested-With': 'MLHttpRequest' } })
        .then(res => {
          let url = res.data.secure_url;
          const urls = this.state.photos.slice();
          urls.push(url);
          this.setState({photos: urls, disableUpload: urls.length === 5});
        })
        .catch(err => {
          console.log('error', err);
        });

    } else {
      document.getElementById('imageMessage').innerHTML = 'Invalid image, please upload again';
    }

  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  mandatoryFilledFunc() {
    let errors = [];
    // STAR RATINGS
    if (!this.state.clickedStar) {
      errors.push('star rating');
    }

    //RECOMMENDATION
    const recommendYesEle = document.getElementById('recommendYes');
    const recommendNoEle = document.getElementById('recommendNo');
    if (!recommendYesEle.checked && !recommendNoEle.checked) {
      errors.push('recommendation');
    }

    //CHARACTERISTICS
    let charProp1;
    let charProp2;
    let charProp3;
    let charProp4;
    let charProp5;

    const characteristicTitles = Object.keys(this.props.metaData.characteristics);

    characteristicTitles.map(char => {
      charProp1 = document.getElementById(char + 'Property1').checked;
      charProp2 = document.getElementById(char + 'Property2').checked;
      charProp3 = document.getElementById(char + 'Property3').checked;
      charProp4 = document.getElementById(char + 'Property4').checked;
      charProp5 = document.getElementById(char + 'Property5').checked;

      if (!charProp1 && !charProp2 && !charProp3 && !charProp4 && !charProp5 ) {
        errors.push(`characteristic: ${char.toLowerCase()}`);
      }
    });

    //REVIEW BODY
    const reviewBodyEle = document.getElementById('reviewBody');
    if (reviewBodyEle.value.length === 0 || reviewBodyEle.value.length < 50) {
      errors.push('review body');
    }

    //NICKNAME
    const nicknameEle = document.getElementById('nickname');
    if (nicknameEle.value.length === 0) {
      errors.push('nickname');
    }

    // EMAIL
    const email = document.getElementById('email').value;
    if (!this.validateEmail(email)) {
      errors.push('email');
    }

    if (errors.length) {
      this.setState({errors});
      return false;
    }

    return true;
  }

  submitReviewFunc() {
    var recommend;
    var nickname;
    var reviewInfo = {};
    var viewCharacteristics = {};
    const productId = this.props.productInfo.id;
    const characteristicIds = {};
    const characteristics = this.props.metaData.characteristics;
    const characteristicTitles = Object.keys(this.props.metaData.characteristics);
    characteristicTitles.forEach(title => {
      characteristicIds[title] = this.props.metaData.characteristics[title].id;
    });

    if (this.mandatoryFilledFunc()) {
      console.log('in madatory filled if');
      const summary = document.getElementById('summary').value;
      const body = document.getElementById('reviewBody').value;
      document.getElementById('recommendYes').checked ? recommend = true : recommend = false;
      nickname = document.getElementById('nickname').value;
      const email = document.getElementById('email').value;
      const photos = this.state.photos.slice();

      const reviewCharacteristicBody = {};
      for (let c of characteristicTitles) {
        const cElements = document.getElementsByClassName(c);

        const checkedElement = Array.from(cElements).find((cElement) => {
          return cElement.checked;
        });

        if (!checkedElement) {
          console.log(`${c} has no checked element`);
          return;
        }

        reviewCharacteristicBody[`${characteristicIds[c]}`] = parseInt(checkedElement.value);
      }

      reviewInfo['product_id'] = parseInt(this.props.metaData['product_id']);
      reviewInfo.rating = this.state.clickedStar;
      reviewInfo.summary = summary;
      reviewInfo.body = body;
      reviewInfo.recommend = recommend;
      reviewInfo.name = nickname;
      reviewInfo.email = email;
      reviewInfo.photos = photos;
      reviewInfo.characteristics = reviewCharacteristicBody;

      console.log('reviewinfo', reviewInfo);
      axios.post('/reviews', reviewInfo)
        .then((response) => {
          console.log('post review success', response);
          this.props.closeReviewModalFunc();
          // this.props.getAllReviewsFunc()
          //   .then(response => { console.log(response) });
        })
        .catch(error => {
          console.log('error posting review', error);
        });
    }
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
    for (var key in this.props.metaData.characteristics) {
      characteristics.push([key, this.characteristics[key]]);
    }

    let submitReviewAlert;
    if (this.state.errors.length) {
      submitReviewAlert = <SubmitReviewAlert errors={this.state.errors}/>;
    }

    return (

      <div className="reviewModal ">
        <div className="reviewModal-content reviewScrollable">
          <span data-testid="XButton" className="close" onClick={() => { this.props.closeReviewModalFunc(); }}>&times;</span>
          <div>
            <h2 style={this.centerStyle}>Write Your Review</h2>
            <h3 style={this.centerStyle}>About the {this.props.productName}</h3>

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
            <br></br>
            <div id="recommend">
              <h3>Do you recommend this product?<sup>*</sup></h3>
              <input type="radio" id="recommendYes" name="recommend" value="yes"></input><label htmlFor="">Yes</label>
              &nbsp;
              <input type="radio" id="recommendNo" name="recommend" value="no"></input><label htmlFor="">No</label>
            </div>
            <br></br>
            <div id="characteristics">
              <h3>Characteristics<sup>*</sup></h3>
              <div>
                {characteristics.map((characteristic, index) => {
                  return (<div key={index}>
                    <b>{characteristic[0]}</b>
                    <br></br>
                    <input type="radio" id={characteristic[0] + 'Property1'} className={`property ${characteristic[0]}`} name={characteristic[0]} value="1"></input><label htmlFor="">{characteristic[1]['1']}</label>
                    <br></br>

                    <input type="radio" id={characteristic[0] + 'Property2'} className={`property ${characteristic[0]}`} name={characteristic[0]} value="2"></input><label htmlFor="">{characteristic[1]['2']}</label>
                    <br></br>

                    <input type="radio" id={characteristic[0] + 'Property3'} className={`property ${characteristic[0]}`} name={characteristic[0]} value="3"></input><label htmlFor="">{characteristic[1]['3']}</label>
                    <br></br>

                    <input type="radio" id={characteristic[0] + 'Property4'} className={`property ${characteristic[0]}`} name={characteristic[0]} value="4"></input><label htmlFor="">{characteristic[1]['4']}</label>
                    <br></br>

                    <input type="radio" id={characteristic[0] + 'Property5'} className={`property ${characteristic[0]}`} name={characteristic[0]} value="5"></input><label htmlFor="">{characteristic[1]['5']}</label>
                  </div>);
                })}
              </div>
            </div>
            <br></br>
            <div>
              <h3>Review summary</h3>
              <textarea id="summary" type="input" className="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!"></textarea>
            </div>
            <br></br>
            <div>
              <h3>Review body<sup>*</sup></h3>
              <textarea type="input" id="reviewBody" className="reviewBody" minLength="50" maxLength="1000" placeholder="Why did you like the product or not?" onChange={() => { this.charactersLeftFunc(); }}></textarea>
              <div>{this.state.reviewBodyMessage}</div>
            </div>
            <br></br>
            <div>
              <h3>Upload your photos</h3>
              <UploadPhotoButton photoUploadedFunc={this.photoUploadedFunc} disabled={this.state.disableUpload}/>
              <div id="imageMessage"></div>
              <UploadedPhotos photos={this.state.photos}/>
            </div>
            <br></br>
            <div>
              <h3>What is your nickname?<sup>*</sup></h3>
              <input type="input" id="nickname" maxLength="60" placeholder="Example: jackson11!"></input>
              <div>For privacy reasons, do not use your full name or email address</div>
            </div>
            <br></br>
            <div>
              <h3>Your email<sup>*</sup></h3>
              <input id="email" type="input" maxLength="60" placeholder="Example: jackson11@email.com"></input>
              <div>For authentication reasons, you will not be emailed</div>
            </div>
            <br></br>
            {submitReviewAlert}

            <div>
              <Button onClick={() => { this.submitReviewFunc(); }}>Submit review</Button>
            </div>

          </div>
        </div>
      </div>
    );
  }

}

export default ReviewModal;
