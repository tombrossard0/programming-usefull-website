// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;


var file = "";
var extension = ".c";
let best_score = 0;



function compare2(str1, str2, matches = []) {
    (str1).replace(/(\w+)/g, m => str2.search(new RegExp(m, "i")) >= 0 && matches.push(m));
    return matches;
}

/* Get complete functions
function compare(str1, str2, matches = []) {
    const re = /void (\w)*\((.)*\}|double (\w)*\((.)*\}/gi;
    const list = str2.replace(/(\r\n|\n|\r)/gm, "²").match(re);
    const newstr = list != null ? list.join("\n") : "";
    console.log(newstr.replaceAll("²", "\n"));
    (str1).replace(/(\w+)/g, m => newstr.search(new RegExp(m, "i")) >= 0 && matches.push(m));
    return matches;
}
*/

function compare(str1, str2, matches = []) {
    const re = /void (\w)*\((.)*|double (\w)*\((.)*/gi;
    const list = str2.match(re);
    const newstr = list != null ? list.join("\n") : "";
    console.log(newstr);
    (str1).replace(/(\w+)/g, m => newstr.search(new RegExp(m, "i")) >= 0 && matches.push(m));
    return matches;
}

function GetBestResult(input, i = 0)
{

    if (i < suggestions.length)
    {
        _file = suggestions[i];
        console.log(suggestions[i]);

        fetch("https://raw.githubusercontent.com/tombrossard0/programming-usefull/main/C/".concat(_file).concat(extension))
            .then(function(response) {
                response.text().then(function(text) {
                let score = compare(input, text).length;
                //console.log(compare(input, text));
                if (score >= best_score)
                {
                    file = _file;
                    best_score = score;
                }

            })
            .then(function(response) {
                GetBestResult(input, i+1);
            });
        });
    }
    else {
        if (best_score <= 0)
        {
            GetBestResult2(input);
        }
        else {
            fetchFileFromGithub_next();
            best_score = -1;
        }
        
    }
}

function GetBestResult2(input, i = 0)
{

    if (i < suggestions.length)
    {
        _file = suggestions[i];
        console.log(suggestions[i]);

        fetch("https://raw.githubusercontent.com/tombrossard0/programming-usefull/main/C/".concat(_file).concat(extension))
            .then(function(response) {
                response.text().then(function(text) {
                let score = compare2(input, text).length;
                if (score >= best_score)
                {
                    file = _file;
                    best_score = score;
                }

            })
            .then(function(response) {
                GetBestResult2(input, i+1);
            });
        });
    }
    else {            
        fetchFileFromGithub_next();
        best_score = -1;
    }
}

function fetchFileFromGithub() {
    GetBestResult(file);
}

function fetchFileFromGithub_next() {
    // Show code
    document.getElementById("wrapper").className = "wrapper-show";
    document.getElementById("container").className = "container-show";

    var url = 'https://raw.githubusercontent.com/tombrossard0/programming-usefull/main/C/'.concat(file).concat(extension);


    fetch(url)
        .then(function(response) {
            response.text().then(function(text) {
            document.getElementById("code").textContent = text;
            document.getElementById("lang").textContent = file.concat(extension);
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
            hljs.initLineNumbersOnLoad();
        });
    });
}



// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    file = userData;
    if(userData){
        icon.onclick = ()=>{
            //webLink = `https://www.google.com/search?q=${userData}`;
            //linkTag.setAttribute("href", webLink);
            //linkTag.click();
            file = userData;
            fetchFileFromGithub();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    file = selectData;
    icon.onclick = ()=>{
        fetchFileFromGithub();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

document.addEventListener('DOMContentLoaded', () => {
    const codeBlock = document.getElementById('code');
    const copyButton = document.getElementById('copy-button');
    const copySuccess = document.getElementById('copy-success');
  
    const copyTextHandler = () => {
        //const text = "```c\n" + codeBlock.innerText + "```";
        const text = codeBlock.innerText;

        navigator.clipboard.writeText(text).then(
          () => {
            copySuccess.classList.add('show-message');
            setTimeout(() => {
              copySuccess.classList.remove('show-message');
            }, 2500);
          },
          () => {
            console.log('Error writing to the clipboard');
          }
        );
    };
  
    copyButton.addEventListener('click', copyTextHandler);

    //fetchFileFromGithub();
});