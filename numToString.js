var digits=["","one","two","three","four","five","six","seven","eight","nine"];
var teens=["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
var tens = ["", "ten","twenty","thirty","fourty","fifty","sixty","seventy","eighty","ninety"];
var localValues = ["", "", "ten","hundred", "thousand", "ten", "hundred", "million", "ten", "hundred", "billion", "ten", "hundred"];

var tests = [7,42,1999,2001,17999,100001,342251,1300420, 874500000000, 5961981498, 856151515, 14147841, 500014, 5021140];


function test(){
let  inputInt = parseInt(getInputNum());

  for(i=0; i<tests.length; i++){
    if (inputInt == tests[i]){
        convertNumToText(tests[i+1]);
        document.getElementById("input_number").value = tests[i+1];
        console.log(i);
        break;
    }else{
        convertNumToText(7);
        document.getElementById("input_number").value = 7;
    }
  }


}

function convertNumToText(input){
  let inputDigits = inputToArray(input);
  let text ="";

  for (let i=0; i<inputDigits.length; i++){ // iterating through digits of input number from higher local value to lower (left to right)
    let tempText = digits[inputDigits[i]]+ " " + localValues[inputDigits.length-i]; // saving decimal value and local value (local value goes in reverse order so the list of local values can be extended)

    if(localValues[inputDigits.length-i]=="ten"){   // if local value is "ten"
      tempText = tens[inputDigits[i]];    //reset saved local value to "tens" (twenty,thirty, etc.)
      if(tens[inputDigits[i+1]]!="" && inputDigits[i]!="1" && inputDigits[i]!="0" )  {
         tempText = tempText + "-";       //add - if next decimal is not zero (for example twenty-five)
      }
      if(tens[inputDigits[i]]=="ten"){              // if local value is "ten" and numeric value also starts with 1 then reset temptext to teens expect if i=0 (first digit)
        tempText = teens[inputDigits[i+1]];
      }
    }

    if (localValues[inputDigits.length-(i-1)]=="ten" && tens[inputDigits[i-1]]=="ten"){              // if previous iteration was a teen, empty text for this iteration
      tempText = localValues[inputDigits.length-i];
    }

   if (inputDigits[i]=="0" && inputDigits[i+1]=="0" && !(inputDigits.length-i==4 && inputDigits[i] =="0" && inputDigits[inputDigits.length-6]!="0") && !(inputDigits.length-i==7 && inputDigits[i] =="0" )){              // if 0 and next is also 0, empty text for this iteration except if local value is thousand
      tempText = "";
    }

    if (inputDigits.length-i==3 && inputDigits[i] =="0"){
      tempText = "";
    }

    if (inputDigits.length-i==6 && inputDigits[i] =="0"){
      tempText = "";
    }

    if (localValues[inputDigits.length-(i-1)]=="ten" && tens[inputDigits[i-1]]!="ten"){             // if previous iteration was of local value "ten", but not a teen
      text = text + tempText;                                                                       // add text of current iteration to the previous ones without a space (for example twenty-three)
      console.log(tempText);
    }else{
      text = text +" "+ tempText;                                                                   // otherwise add a space as well
    }
  }
console.log(text);


document.getElementById("result_text").innerHTML = text;
document.getElementById("result_number").innerHTML = input;
document.getElementById("result").style.display = "block";

}


function getInputLength(input){
  let number=input;
  let inputLength = number.toString().length;
  return inputLength;
}

function inputToArray(input){
  let inputLength = getInputLength(input);
  let inputDigits = [];
  //convertint input number to an array of digits
  let reducedInput = input;
  for (let i=inputLength; i>0; i--){
    let digit = Math.trunc(reducedInput/Math.pow(10,i-1));
    inputDigits.push(digit);
    reducedInput = reducedInput % Math.pow(10,i-1);
  }
  return inputDigits;
}


function getInputNum(){
  let inputNum = document.getElementById("input_number").value;
  return inputNum;
}

function checkValue(){
inputNum = parseInt(getInputNum());
document.getElementById("input_number").value = inputNum;

 if (inputNum<1){
     document.getElementById("input_number").value = 1;
 }
 if (inputNum>999999999999){
     document.getElementById("input_number").value = 999999999999;
 }

}

function checkAndGetValue(){
  checkValue();
  inputNum = getInputNum()
  return inputNum;
}
