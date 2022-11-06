// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;


var file = "matrix";
var extension = ".c";

function fetchFileFromGithub() {
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
            console.log(userData);
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

    fetchFileFromGithub();
});