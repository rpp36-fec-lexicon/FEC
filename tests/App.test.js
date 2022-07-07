// import React from 'react';
// import SearchQuestion from '../components/SearchQuestion.jsx';
// // import App from './../index.jsx'
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

// test('Displays a heading', () => {
//   render(<SearchQuestion />);
//   const heading = screen.getByRole('heading', {
//     name: /hello world/i
//   });
//   expect(heading).toBeInTheDocument();
// });
// describe('Each Component renders correctly', () => {
//   it('ProductInformation renders correctly', () => {
//     const wrapper = shallow(<QuestionsAnswersMain />);
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('ProductDescription renders correctly', () => {
//     const wrapper = shallow(<QuestionsAnswersList />);
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('StyleSelector renders correctly', () => {
//     const wrapper = shallow(<QuestionsListEntry />);
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('AddToCart renders correctly', () => {
//     const wrapper = shallow(<SearchQuestion />);
//     expect(wrapper).toMatchSnapshot();
//   });
// });


/*

mocking out the server

simulate the res from api request

dotenv  - put in gitignore -> allows different values


aws->s3 bucket with permissions set ->you can client send image > server

*/

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../client/src/App.jsx';
// import '@testing-library/jest-dom/extend-expect';
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import { render, screen } from '@testing-library/react';
import App from '../client/src/App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/this should exist/i);
    expect(linkElement).toBeInTheDocument();
});