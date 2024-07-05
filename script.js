const time=document.querySelector("#time span");

const input=document.querySelector("#input");
const text=document.querySelector("#text");
const mistakes=document.querySelector("#mistakes span");
const WPM=document.querySelector("#wpm span");
const CPM=document.querySelector("#cpm span");
const btn=document.querySelector("#tryagain");


let sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript is a versatile programming language.",
  "Learning to code can be both fun and challenging.",
  "Arrays in JavaScript are used to store multiple values in a single variable.",
  "Always comment your code to make it easier to understand.",
  "Functions in JavaScript help to organize and reuse code.",
  "Loops allow you to repeat a block of code multiple times.",
  "Conditional statements let you perform different actions based on conditions.",
  "The Document Object Model (DOM) represents the structure of a web page.",
  "JavaScript can be used to manipulate HTML and CSS to create dynamic web pages.",
  "Event listeners wait for user interactions to trigger specific code.",
  "Variables in JavaScript can store different types of data like strings, numbers, and objects.",
  "Objects in JavaScript are collections of key-value pairs.",
  "Arrays are a special type of object used to store ordered lists of values.",
  "JSON (JavaScript Object Notation) is a common data format used for data exchange.",
  "Promises in JavaScript handle asynchronous operations.",
  "Arrow functions provide a concise syntax for writing functions.",
  "ES6 introduced many new features to JavaScript, including let and const.",
  "Template literals allow for easier string interpolation.",
  "JavaScript is a core technology of the World Wide Web, alongside HTML and CSS."
];

let timer;
let maxtime=60;
let timeleft=maxtime;
let charindex=0;
let mistakeCount=0;




function loadpera(){
  const randomIndex= Math.floor(Math.random()*sentences.length);
  
  for(let char of sentences[randomIndex])
    {
      text.innerHTML=text.innerHTML+`<span>${char}</span>`;
    }
    text.querySelectorAll("span")[0].classList.add("active");

    mistakes.innerText=mistakeCount;
    
}


function initTyping(){
  const char=text.querySelectorAll("span");
  const typedchar = input.value[charindex];
  
  if(charindex < char.length-1 && timeleft>0)
    {
       

      if(char[charindex].innerText=== typedchar)
        {
          char[charindex].classList.add("correct");
        }

        else{
          mistakeCount++;
          char[charindex].classList.add("incorrect");
        }
        charindex++;
        char[charindex].classList.add("active");
        mistakes.innerText=mistakeCount;

        CPM.innerText=charindex-mistakeCount;
    }

    else{
      clearInterval(timer);
    }

};

function clock(){
  if(timeleft>0){
    timeleft--;
    time.innerText=timeleft;
    let wpm=Math.round(((charindex-mistakeCount)/5)/(maxtime-timeleft)*60);
     WPM.innerText=wpm;
  }
  else
  {
  clearInterval(timer);
  }
}

function interval()
{
  timer=setInterval(clock,1000);
  document.removeEventListener("keydown",interval);
}





document.addEventListener("keydown", ()=>{ input.focus()});

text.addEventListener("click", ()=>{ input.focus()});

input.addEventListener("input",initTyping);

document.addEventListener("keydown",interval);
   
btn.addEventListener("click",()=>{

  
  timeleft=maxtime;
  charindex=0;
  mistakeCount=0;
  WPM.innerText=0;
  CPM.innerText=0;
  time.innerText=timeleft;
  input.value="";
  document.addEventListener("keydown",interval);
  text.innerHTML="";
  loadpera();
})




loadpera();

