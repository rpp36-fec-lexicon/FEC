const qetQuestionsByProductID = require('./QuestionsAnswers');
const axios = require('axios');

jest.mock('axios');

it('returns questions for given productID'), async () => {
  axios.get.qetQuestionsByProductID({
    data: [
      {
        productID: 1,

        questionID: 1,
        question: 'When can be delivered?'
      },
      {
        productID: 2,
        questionID: 1,
        question: 'Is there any discount?'
      }
    ]
  });

  const questions = await qetQuestionsByProductID (1,() => {
    console.log(data[0].questions);
  })

}