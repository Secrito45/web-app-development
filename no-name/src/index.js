import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';

const recipeBook = [
  {
    id: 1,
    url: 'https://www.k-ruoka.fi/reseptit/boltsi-pasta',
    name: 'Boltsi pasta'
  },
  {
    id: 2,
    url: undefined,
    name: 'Spam and eggs',
    method: 'Ota sian- ja naudanliha säilykepurkista ja leikkaa se siivuiksi. Paista säilukesiivut ja kananmunat pannulla öljyssä mausta suolalla ja pippurilla',
    ingredients: [
      '1 tölkki sian- ja naudanliha säilykettä',
      '2 kanan munaa',
      '2 ruokalusikallista öljyä',
      'Suolaa ja pippuria'
    ],
  }
];

ReactDOM.render(
  <App recipes={recipeBook} />,
  document.getElementById('root')
);
