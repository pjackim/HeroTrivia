import { useState } from 'react';
import '../css/App.css';
import { dataBase } from '../data/data';
import Board from './Board';
import { AddFileListener, findAllEntries, SelectFile } from './ProcessData';

export var word = "Skyler";



// // register jQuery extension
// jQuery.extend(jQuery.expr[':'], {
//   focusable: function (el, index, selector) {
//       return $(el).is('a, button, :input, [tabindex]');
//   }
// });

// $(document).on('keypress', 'input,select', function (e) {
//   if (e.which == 13) {
//       e.preventDefault();
//       // Get all focusable elements on the page
//       var $canfocus = $(':focusable');
//       var index = $canfocus.index(document.activeElement) + 1;
//       if (index >= $canfocus.length) index = 0;
//       $canfocus.eq(index).focus();
//   }
// });




export default function App(props) {
  // AddFileListener();

  // Set Random Word
  var index = parseInt(Math.random() * dataBase.length)
  word = dataBase[index]["Answer"];
  // console.log( dataBase[index]["Answer"]);

  var data = findAllEntries(word);
  // AddFileListener();
  return (
    <div className='App'>
      <Board word={word} data={data}/>
    </div>
  );
}