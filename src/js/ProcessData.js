import * as Papa from 'papaparse';
import { dataBase } from '../data/data';
import { word } from './Board';

export var data = [];

export function SelectFile() {
    return (<input type="file" id="file-selector" accept=".csv"/>);
}

export function AddFileListener() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', (event) => {
      const fileList = event.target.files;
      loadFile(fileList[0]);
    });
}

export async function loadFile(fileObject){
    const reader = new FileReader();
    reader.readAsText(fileObject, "UTF-8");
    reader.onload = event => {

        Papa.parse(event.target.result, {
            header: true,
            complete: function(CSVFilePlaces) {
                data = CSVFilePlaces.data;
                console.log(JSON.stringify(data, null, 2));
                // printData([data]);
            }
        });
    };
}



export function printData(arr) {
    arr.forEach(element => {
        if (element["Question"].length > 0)
            console.log(JSON.stringify(element, null, 2));
    });
}

function findEntries(letter) {
    var entries = [];

    dataBase.forEach(entry => {
        let position = entry["Answer"].indexOf(letter);

        if (position > -1)
            entries.push(entry);
    });
    return entries;
}

function findSmallest(count, data) {
    var entries = [];

    data.forEach(element => {
        if (entries.length != count)
            entries.push(element)
        else {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i]["Answer"].length > element["Answer"].length)
                    entries[i] = element;
            }
        }
    });
    return entries;
}

export function findAllEntries(word, long = false) {
    var entries = [];
    var wordsUsed = [];

    [...word].forEach(letter => {
        var options = findEntries(letter);
        var smallestElement = options[options.length - 1];

        // Get Smallest word for each letter
        var temp = findSmallest(3, options);

        var index = parseInt((Math.random() * 100) % temp.length);
        var entryData = {}

        if (long) {
            entryData = {
                "Letter":           letter,
                "Index":            options[index]["Answer"].indexOf(letter),
                "Question":         options[index]["Question"],
                "Answer":           options[index]["Answer"],
                "Answer Letters":   options[index]["Answer Letters"],
                "Question Letters": options[index]["Question Letters"],
                "Category":         options[index]["Category"],
                "Publisher":        options[index]["Publisher"],
                "Series":           options[index]["Series"],
                "Universe":         options[index]["Universe"],
                "Difficulty":       options[index]["Difficulty"]
            }
        } else {
            entryData = {
                "Letter":           letter,
                "Index":            options[index]["Answer"].indexOf(letter),
                "Question":         options[index]["Question"],
                "Answer":           options[index]["Answer"]
            }
        }

        entries.push(entryData);
    });
    return entries;
}