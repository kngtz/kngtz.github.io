$(() => {
//turn counter
let turn = 1;
let count = 0;
$('td').click(function() {

var $class = $(this).attr("class");
// if condition to prevent clicking of filled box
 if ($class == 'square'){
   mark();
 } else {
   console.log('square is not empty')
 }
})


const mark = () => {

    if (turn === 1){
     $(event.currentTarget).removeClass('square').addClass("cross").text('x');
     $('.message').text('Player 2\'s turn');
     count++;
   turn = 2;
    whoWins('cross','Player 1');
   } else {
     $(event.currentTarget).removeClass("square").addClass("circle").text('o');
      $('.message').text('Player 1\'s turn')
     count++;
  turn = 1;
    whoWins('circle','Player 2');
   }

  }

const whoWins = (classShape,player) => {


   if ($('#1').attr('class') === classShape &&  $('#2').attr('class') === classShape && $('#3').attr('class') === classShape){
      $('td').removeClass('square');
     $('.message').text(player + " wins");
   } else if ($('#4').attr('class') === classShape &&  $('#5').attr('class') === classShape && $('#6').attr('class') === classShape){
     $('td').removeClass('square');
     $('.message').text(player + " wins");
   } else if ($('#7').attr('class') === classShape &&  $('#8').attr('class') === classShape && $('#9').attr('class') === classShape){
     $('td').removeClass('square');
      $('.message').text(player + " wins");
   } else if ($('#1').attr('class') === classShape &&  $('#4').attr('class') === classShape && $('#7').attr('class') === classShape){
     $('td').removeClass('square');
     $('.message').text(player + " wins");
   } else if ($('#2').attr('class') === classShape &&  $('#5').attr('class') === classShape && $('#8').attr('class') === classShape){
     $('td').removeClass('square');
     $('.message').text(player + " wins");
   } else if ($('#3').attr('class') === classShape &&  $('#6').attr('class') === classShape && $('#9').attr('class') === classShape){
     $('td').removeClass('square');
     $('.message').text(player + " wins");
   } else if ($('#1').attr('class') === classShape &&  $('#5').attr('class') === classShape && $('#9').attr('class') === classShape){
     $('td').removeClass('square');
     $('.message').text(player + " wins");
   } else if ($('#3').attr('class') === classShape &&  $('#5').attr('class') === classShape && $('#7').attr('class') === classShape){
     $('td').removeClass('square');
     $('.message').text(player + " wins");
   } else if (count == 9) {
     $('.message').text('It is a tie');
   } else {}








}

});
