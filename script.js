var powerBtn = document.querySelector("[data-power]")
var apiBtn = document.querySelector("[data-api]")
var gridPanel = document.querySelector(".grid-panel")
var displayDOM = document.querySelector(".query-string");
var apiBtn = document.querySelector("[data-api]")

var buttons = [1,2,3,4,5,6,7,8,"C",9,0,"=","*","-",'/',"+","rand","abs",".","^","Back"]


let numbers = [];
let operations = [];
let totalRef = 0;
let stillCalc = false;
var queryString = "";
var hitRand = false;


function createButtons(buttons,el){
    buttons.forEach(b=>{
        var div = document.createElement("div");
            div.className="btn grid-btn";
            div.setAttribute("data-val",b)
            div.onclick=()=>pushButton(b)
            if(b === "C")div.classList.add("clear")
            if(b === "=" || b === "Back")div.classList.add("equal")
            div.innerText = b

            el.append(div)
    })
}


createButtons(buttons,gridPanel)


powerBtn.onclick=(e)=>{
    if(e.target.textContent === "On"){
        powerOn()
        e.target.textContent = "Off"
    }
    else{
        e.target.textContent = "On"
        powerOff()
    }
}


function powerOn(){

    queryString = "0"
    displayDOM.innerHTML = queryString
}


function powerOff(){
    
    queryString = "";
    displayDOM.innerHTML = ""
    numbers = [];
    operations = []
}



function pushButton(key){
    console.log(key);
    // console.log(isNaN(key))
    if(!isNaN(key)){
        if(!stillCalc && totalRef > 0){
            totalRef = 0
        }
         queryString += key;
    
        if(queryString[0] === "0"){
            //eliminate leading zero's
            queryString = queryCleanUp(queryString,"shift")
           
        }
        displayDOM.innerHTML = queryString
    }
    else if(key === "Back"){
        if(hitRand)return flashError()
        if(queryString === "0")return
           
        queryString = queryCleanUp(queryString,"pop")
      
        if(queryString === "")queryString = "0"
            displayDOM.innerHTML = queryString

    }
    else if(key === "C"){
    
        clearCalc()
    }
    else if(key === "="){
        if(hitRand)return flashError()

        numbers.push(parseFloat(queryString));
                solveProblem()
    }
    else if(key === "."){
        if(hitRand)return flashError()

        console.log('grrrr',typeof(queryString))
        queryString += "."
        
        displayDOM.innerHTML = queryString
    }
    else if(key === "rand"){
        let random = Math.random() * 100 | 0;
        displayDOM.innerHTML = random
        numbers.push(random);
        hitRand = true;
    }

    else if(key === "abs"){
        if(hitRand)return flashError()

        let absVal = Math.abs(parseFloat(totalRef));
        displayDOM.innerHTML = absVal
        totalRef = absVal;
        queryString = absVal;
        // numbers.push(absVal)
    }
    else{
        hitRand  = false;
        if(totalRef > 0){
            stillCalc = true;
        }
      if(queryString.length){
        numbers.push(parseFloat(queryString));
      }
        operations.push(key)
        queryString = ""
        displayDOM.innerHTML = key
    }
}


function solveProblem(){
    console.log(numbers)
    console.log(operations)
    numbers.forEach(val=>{
        if(isNaN(val)){
            displayDOM.innerHTML ="Error!! :("
            setTimeout(clearCalc,2000);
            return
        }
    })
    let total = 0
        total = totalRef > 0 ? totalRef : numbers[0]
        console.log("do the operation!",total)

    for(let i=0;i<operations.length;i++){
        let numbIdx = stillCalc ? i : i+1

        switch(operations[i]){

            case "+":
           total += numbers[numbIdx]
                break;

            case "-":

            total -= numbers[numbIdx]

                break;

            case "*":
            total *= numbers[numbIdx]

                break;

            case "/":
            total /= numbers[numbIdx]

                break;

            case "^":
                let refTotal = total;
                for(let i=0;i<numbers[numbIdx]-1;i++){
                    console.log("refTotal",refTotal)
                    total*=refTotal;
                }
            break;
        }
    }
    if(total > 1 && JSON.stringify(total).indexOf(".") !== -1 &&  JSON.stringify(total).split(".")[1].length > 4){
        total = parseFloat(total.toFixed(2))
    }
    else if(total < 1 && JSON.stringify(total).length > 4){
        total = parseFloat(total.toFixed(2))
    }

    displayDOM.innerHTML = total
    totalRef = total;
    operations = [];
    numbers = [];
    queryString = ""
}



apiBtn.onclick=()=>{

    alert("Hey! Im currently under construction. Sorry!")

    // fetch(`https://api.giphy.com/v1/gifs/search?q=math&api_key=uKphAK8kteX2OKtsDfh5n97qdjER4ErO`)
    // .then(res=>res.json())
    // .then(res=>{
    //     console.log(res)

    //      displayDOM.innerHTML = `<img class='giph' src=${res.data[Math.random() * res.data.length | 0].images.fixed_height.url}/>`
    // })
}


function flashError(){
    displayDOM.innerHTML = "Error! :("
    setTimeout(clearCalc,1500)

}


function queryCleanUp(queryString,mutation){
    queryString.split("");
    mutation === "shift" ? queryString.shift() : queryString.pop()
    queryString = queryString.join("")
    return queryString
}


function clearCalc(){
    queryString = "";
    displayDOM.innerHTML = queryString
    numbers = [];
    operations = []
    totalRef = 0;
    stillCalc = false;
}



