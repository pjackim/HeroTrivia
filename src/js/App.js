import '../css/App.css';
import { dataBase } from '../data/data';
import Board from './Board';
import { AddFileListener, findAllEntries } from './ProcessData';


export default function App(props) {
  // AddFileListener();

  // Set Random Word
  var index = parseInt(Math.random() * dataBase.length)
  var word = dataBase[index]["Answer"];

  var data = findAllEntries(word);
  return (
      <Board word={word} data={data}/>
  );
}