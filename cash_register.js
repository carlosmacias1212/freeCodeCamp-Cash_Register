function checkCashRegister(price, cash, cid) {

  var cidCopy = cid;
  var ccc = [];
  for (let i = 0; i < cid.length; i++) {
    let c = cid[i].slice(0);
    ccc.push(c); 
  } 
  
  var change = cash - price;
  var money = [.01, .05, .1, .25, 1, 5, 10, 20, 100];
  var re = {status: "", change: []}; 

  for (let i = money.length - 1; i >= 0; i--) {
    var quant = money[i] * Math.floor(change / money[i]);
      
    if (quant == 0) {
      continue; 
    }

    if ((cidCopy[i][1] - quant) >= 0) { 
      change -= quant; 
      change = change.toFixed(2); 
      cidCopy[i][1] -= quant; 
      re.change.push([cidCopy[i][0], quant]); 

    } else if (cidCopy[i][1] > 0) {
      change -= cidCopy[i][1];   
      change = change.toFixed(2);     
      re.change.push([cidCopy[i][0], cidCopy[i][1]]);
      cidCopy[i][1] = 0;

    }
     
  }

  var drawer = 0; 
  for (let i = 0; i < cid.length; i++) {
    drawer += cidCopy[i][1]; 
  }

  
  if (change > 0) {
    re.status = "INSUFFICIENT_FUNDS";
    re.change = [];
    return re; 
  } else if (drawer == 0) {
    re.status = "CLOSED"; 
    re.change = ccc; 
    return re; 
  } else {
    re.status = "OPEN";
    return re; 
  }
  

}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
