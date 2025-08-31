let keys=document.querySelectorAll(".js-keys button");

keys.forEach(btn=>btn.addEventListener('click',()=>{
  let input=document.querySelector(".js-input");
  let value=btn.value;

  if(value==='AC') input.value='';
  else if(value==='DEL') input.value=input.value.slice(0,-1);
  else if(value==='='){ 
    let exp=convInfix(input.value);
    input.value=expEval(exp);
  }
  else input.value+=value;
}));


function convInfix(input){
  let exp='';
  let stack=[];
  let i=0,len=input.length;

  while(i<len){
    let curr=input.charAt(i);

    if(!isNaN(curr) || curr=='.'){ 
      while(i<len && (!isNaN(curr) || curr=='.')){
        exp+=curr;
        i++;
        curr=input.charAt(i);
      }
      exp+=' ';
      i--;
    }else if(curr==='(') stack.push(curr);
    else if(curr===')'){
      while(stack[stack.length-1]!=='('){
        console.log(stack[stack.length-1]);
        exp+=stack.pop()+' ';
      }
      stack.pop();
    }else{
      while(stack.length>0 && precedence(curr)<=precedence(stack[stack.length-1])){
        exp+=stack.pop()+' ';
      }
      stack.push(curr);
    }
    i++;
  }
  while(stack.length>0) exp+=stack.pop()+' ';
  return exp.trim();
}

function precedence(operator){
  switch(operator){
    case '*':
    case '/': return 3;
    case '+':
    case '-': return 2;
    default: return 1;
  }
}

function expEval(exp){
  let values=exp.split(' ');
  let numStack=[];
  for(let val of values){
    if(!isNaN(val)){
      numStack.push(parseFloat(val));
    }else{
      let op2=numStack.pop();
      let op1=numStack.pop();
      numStack.push(performEval(op1,val,op2));
    }
  }
  return numStack[0];
}

function performEval(op1, operator, op2){
  switch(operator){
    case '+': return op1+op2;
    case '-': return op1-op2;
    case '/': return op1/op2;
    case '*': return op1*op2;
  }
}

