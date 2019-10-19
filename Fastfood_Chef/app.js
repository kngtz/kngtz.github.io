

$(() => {








//SET VARIABLES
let cookedPatties = 0;
const grillArray = [0,0,0,0];
let burntPatties = 0;
let myStack = ['burgerBottom','burgerTop'];
let orderStack = [];
let order = '';
let correctOrders = 0;
let wrongOrders = 0;
let layerArray = ['patty','cheese','lettuce']
let imageArray = ['Images/burgerBottom.png','Images/burgerTop.png','Images/patty.png','Images/cheeseSlice.png','Images/lettuceSlice.png','Images/Fries.png','Images/drink.png','Images/greyTile.png']
let faceArray = ['Images/Bahu/0.png','Images/Bahu/1.png','Images/Bahu/2.png','Images/Bahu/3.png','Images/Bahu/4.png','Images/Bahu/5.png',]
let layerCount = 1;
let totalOrder = 0;
let sideOrder = [];
let timer = 12;
var interval;


// var customer = {orderStack:['patty','cheese','lettuce']};
// console.log(customer.orderStack);
function updateData () {
  console.log(myStack)
   checkWin()
   youLose();
  $('#sideOrder1').attr('src',imageArray[checkLayerImage(sideOrder[0])])
  $('#sideOrder2').attr('src',imageArray[checkLayerImage(sideOrder[1])])
  $('#Timer').text('Time Left = ' + timer);

  // $('#sideOrder2').attr('src',checkLayerImage(sideOrder[1]))
  checkCookedPatties();
  renderBurger(orderStack,orderBurger,'CustBurger ');
  renderBurger(myStack,myBurger,'MyBurger ');
     $('#posScore').text("Score : " + correctOrders );
     $('#negScore').text("Wrong orders : " + wrongOrders );
     $('#3').text("Cooked patties = " + cookedPatties);

}

function renderBurger(stack , id, stackName) {
 let n = 10;
 let renderStack = stack;

 // $(id).children('li').eq(n).children().attr('src',imageArray[0]).attr('id',stackName + n);
 //
 // n--;
   for (let i=0;i<stack.length;i++)
   {
     let $layer = stack[i];
     let $image = checkLayerImage($layer);
     // console.log($image);
    $(id).children('li').eq(n).children().attr('src',imageArray[$image]).attr('id',stackName + n);
      n--;
// console.log(n);
 }
 // $(id).children('li').eq(n).children().attr('src',imageArray[1]).attr('id',stackName + n);

// REMOVE LAYERS ABOVE TOP BUN
  while (n !== 0) {
    $(id).children('li').eq(n).children().attr('src','');
    n--;

  }

}
//SWITCH FUNCTION TO GET RESPECTIVE LAYER IMAGE
function checkLayerImage (x) {
  // console.log(x);

  switch(x) {
    case 'burgerBottom':
        return 0;
      break;
      case 'burgerTop':
          return 1;
        break;
  case 'patty':
     return 2;
    break;
  case 'cheese':
    return 3;
    break;
  case 'lettuce':
      return 4;
    break;
    case 'fries':
        return 5;
      break;
  case 'drink':
          return 6;
    break;
  default: return 7;

}
}

function checkCookedPatties () {
  if (cookedPatties > 0) {
    $('#4').children().attr('src','Images/pattyCooked.png');
  } else {
    $('#4').children().attr('src','');
  }
}
// RANDOM NUMBER FUNCTION with DECIMAL PLACING ROUNDING
const ranNum = (min,max,roundValue) => {
  return ((Math.random() * (+max - +min) + min).toFixed(roundValue));
}
//

function generateOrder ()  {

  roundDifficulty();
  orderStack = ['burgerBottom','burgerTop'];
  for (i=1;i<layerCount+1;i++){
    orderStack.splice(1,0,layerArray[ranNum(0,2,0)]);
  }  sideOrder = [];
  let side1 = ranNum(0,10,0);
  let side2 = ranNum(0,10,0);
  sideOrder[0]=(getSideOrder(ranNum(0,10,0)));
  sideOrder[1]=(getSideOrder(ranNum(0,10,0)));
  console.log(faceArray[ranNum(0,5,0)])
  $('#faceTile').attr('src',faceArray[ranNum(0,5,0)]);
   updateData();
  timer = 12;
   clearInterval(interval);
   interval = setInterval(timeUp,1000);
}

function getSideOrder (sideNum) {
  if (sideNum > 8 ){
    return '';
  } else if (sideNum > 4) {
    return 'fries';
  } else {
    return 'drink';
  }
}
// ADD PATTY ONTO THE GRILL TO COOK
function grillPatty() {
    if (grillArray[0] == 0){
     $('#5').children().attr('src','Images/pattyRaw.png').addClass('meat').delay(3000).queue(cook);
     grillArray[0] = 1;
    } else if (grillArray[1] == 0){
       $('#6').children().attr('src','Images/pattyRaw.png').addClass('meat').delay(3000).queue(cook);
       grillArray[1] = 1;
    } else if (grillArray[2] == 0){
       $('#7').children().attr('src','Images/pattyRaw.png').addClass('meat').delay(3000).queue(cook);
       grillArray[2] = 1;
    } else if (grillArray[3] == 0){
       $('#8').children().attr('src','Images/pattyRaw.png').addClass('meat').delay(3000).queue(cook);
       grillArray[3] = 1;
    } else {totalOrder = correctOrders + wrongOrder;

    }

 }
 // COOK PATTIES AND THEY GET BURNT AFTER A DELAY
 function cook () {

    $(this).attr('src','Images/pattyCooked.png').removeClass('meat').addClass('cooked');
    $(this).dequeue();
    $(this).delay(3000).queue(burnt)
 }

 // BURN THE PATTIES
 function burnt (){

   var $class = $(this).attr("class");
   // console.log($(this));
   if($class == 'img-fluid cooked'){
     $(this).attr('src','Images/pattyBurnt.png').removeClass('cooked').addClass('burnt');
     $(this).dequeue();
   } else {
     $(this).dequeue();
   }

     }

       $('img').click(function() {

         var $parent = $(this).parent().parent().attr('id');
         var $class = $(this).attr("class");
         var $grillID = $(this).parent().attr('id')

        if (($parent === 'myBurger') && ($(this).attr('src') !== 'Images/burgerTop.png') && ($(this).attr('src') !== 'Images/burgerBottom.png')  ){
          console.log($(this).attr('src'));
          if ($(this).attr('src') ==='Images/patty.png'){
            cookedPatties++;
          }
          removeLayer();

        }


          if ($class === 'img-fluid cooked'){

             if ($grillID == '5' ){
                grillArray[0] = 0;
               collectPatty();
             } else if ($grillID == '6' ) {
               grillArray[1] = 0;
               collectPatty();
             }  else if ($grillID == '7' ) {
               grillArray[2] = 0;
               collectPatty();
             }  else if ($grillID == '8' ) {
               grillArray[3] = 0;
               collectPatty();
             }
          }

         else if ($class === 'img-fluid burnt'){
           if ($grillID == '5' ){
              grillArray[0] = 0;
             throwPatty();
           } else if ($grillID == '6' ) {
             grillArray[1] = 0;
             throwPatty();
           }  else if ($grillID == '7' ) {
             grillArray[2] = 0;
             throwPatty();
           }  else if ($grillID == '8' ) {
             grillArray[3] = 0;
             throwPatty();
           }
         } else if ($class === 'img-fluid empty happyCup') {
            giveDrink()
         } else if ($class === 'img-fluid empty happyFries') {
           giveFries();
         }

         })

function giveDrink () {

  if (sideOrder.includes('drink')){

    $(event.currentTarget).attr('src','Images/greyTile.png').removeClass('happyCup')
    sideOrder.splice((sideOrder.indexOf('drink')),1,'');
    updateData();
  } else {
    console.log('wrong drink');
    wrongOrders++;
      updateData();
  }
}
function giveFries () {

  if (sideOrder.includes('fries')){

    $(event.currentTarget).attr('src','Images/greyTile.png').removeClass('happyFries')
    sideOrder.splice((sideOrder.indexOf('fries')),1,'');
    updateData();
  } else {
    console.log('wrong fries');
    wrongOrders++;
      updateData();
  }
}
     // MOVE COOKED PATTY INTO COOKED PATTY STASH
     function collectPatty() {
       // console.log("collectPatty");
     $(event.currentTarget).removeClass('cooked').text('').attr('src','Images/greyTile.png');
       cookedPatties++;
       updateData();
     }
     // THROW BURNT PATTY INTO BIN
     function throwPatty() {
       // console.log("throwPatty");
     $(event.currentTarget).removeClass('burnt').text('').attr('src','Images/greyTile.png');
       burntPatties++;
       updateData();
     }

   // ADD CHEESE LAYER
   function addCheese () {

     if (myStack.length<10){
       myStack.splice((myStack.length-1),0,'cheese');
       // myStack.push('cheese');
       updateData();
     }
   }

   // ADD LETTUCE LAYER
   function addLettuce () {

     if (myStack.length<10){
       myStack.splice((myStack.length-1),0,'lettuce');
       // myStack.push('lettuce');
       updateData();
     }

   }
   // ADD PATTY LAYER, REMOVE 1 FROM STASH
   function addPatty () {

     if (cookedPatties > 0 && myStack.length<10 ) {

       myStack.splice((myStack.length-1),0,'patty');
       // myStack.push('patty');
       cookedPatties--;
       updateData();
     }

   }
   // CHECK IF BURGER MADE MATCHES ORDER
   function checkStack(arr1, arr2){
       if (arr1.length !== arr2.length) return false;
       for (var i = 0, len = arr1.length; i < len; i++){
           if (arr1[i] !== arr2[i]){
               return false;
           }
       }
       return true;
   }

   // GIVE ORDER TO CUSTOMER
   function submitStack () {
     console.log(myStack);
     order = checkStack(myStack,orderStack)
     // console.log(order);
     if (order == true){
          myStack = ['burgerBottom','burgerTop'];
         orderStack = [];



          // generateOrder();
          updateData();

     } else {
        myStack = ['burgerBottom','burgerTop'];
        wrongOrders++;

        roundDifficulty();
         generateOrder();
        updateData();
     }
   }
function removeLayer () {

  let m = $(event.currentTarget).attr('id').split(' ')[1];
   m = (10 - m);
   myStack.splice(m,1);
   updateData();
 }

 function roundDifficulty () {
 totalOrder = correctOrders + wrongOrders;
 if (totalOrder % 2 == 0 && layerCount !== 7) {
   layerCount++;
   console.log('layercount' + layerCount)
 } else {

 }
 }
function fryFries () {
  if ($('#9').attr('class')=='img-fluid empty') {
  $('#9').attr('src','Images/emptyFries.png').addClass('sadFries').delay(3000).queue(collectFries);
} else if ($('#10').attr('class')=='img-fluid empty'){
  $('#10').attr('src','Images/emptyFries.png').addClass('sadFries').delay(3000).queue(collectFries);

}
}

function collectFries () {
  $(this).attr('src','Images/Fries.png').removeClass('sadFries').addClass('happyFries');
  $(this).dequeue();
}
function placeCup () {
    if ($('#9').attr('class')=='img-fluid empty') {
  $('#9').attr('src','Images/emptydrink.png').addClass('sadCup').delay(3000).queue(fillCup);
} else if($('#10').attr('class')=='img-fluid empty') {
  $('#10').attr('src','Images/emptydrink.png').addClass('sadCup').delay(3000).queue(fillCup);
  console.log('wrongwwrong')
}
}

function fillCup () {
  $(this).attr('src','Images/drink.png').removeClass('sadCup').addClass('happyCup');
  $(this).dequeue();
}
function timeUp () {
  console.log('hello')
   if (timer>0){
     timer--;
     $('#Timer').text('Time Left = ' + timer);
   } else {

     wrongOrders++;

     generateOrder();
   }
  // for (i=0;i<=timer;i++){
  //   timerCounter--;
  //   console.log("timer is " + timer);
  // }
}
function youLose () {
  if (wrongOrders > 2) {
    alert('More than 3 wrong orders... YOU LOSE!');
  }
}

function checkWin () {

  if ((sideOrder[0] === '') && (sideOrder[1] === '') &&  (orderStack.length === 0) ){

    correctOrders++;
    roundDifficulty();
    generateOrder();
  }
}

 $('#pattyButton').on('click',grillPatty);
 $('#4').on('click',addPatty);
 $('#2').on('click',addCheese);
 $('#1').on('click',addLettuce);
 $('#submitButton').on('click',submitStack);
 $('#friesButton').on('click',fryFries);
 $('#makeDrink').on('click',placeCup);
  generateOrder();
//
//
// // UPDATE TEXT DISPLAYING DATA
// function updateData () {
//   order = checkStack(myStack,orderStack);
//   $('#1').text("myStack = " + myStack);
//   $('#2').text("Cooked Patties = " + cookedPatties);
//   $('#3').text("Burnt Patties = " + burntPatties);
//   $('#4').text("customerStack = " + orderStack);
//   $('#10').text("Add a slice of cheese" );
//   $('#11').text("Add lettuce" );
//   $('#12').text('The order is ' + order);
//   $('#13').text("Submit" );
//   $('#14').text("Correct Orders = " + correctOrders );
//   $('#15').text("Wrong orders = " + wrongOrders );
// }
//






// $('#7').on('click',grillPatty);


 });
