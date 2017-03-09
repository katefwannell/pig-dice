//business logic
// STill need to Refactor this project and finish the ending for the winner .......

var firstRollOfTurn = true;
var turnNumberPlayer1 = 0;
var turnNumberPlayer2 = 0;
var turnScore = 0;
var rollsToAppendToTurn = "";

function Player(name, active) {
  this.name = name;
  this.active = active;
  this.score = 0;
  this.turns = [];
};

function Turn(number) {
  this.number = 1;
  this.score = 0;
  this.rolls = [];
};





// user interface logic
$(document).ready(function() {

   console.log("ready function is firing");

   //  Create Player One Object
   $("form#frm-player-1").submit(function(event) {
     event.preventDefault();

     //  Create Player 1 obect when a player 1 name has been entered. Otherwise, raise an alert ....
     if ($("input#new-player-1-name").val() !== "") {
       newPlayer1 = new Player($("input#new-player-1-name").val(),true,0);

       //  Disable Player name and Add player button
       $("input#new-player-1-name").attr("disabled","disabled");
      $("#btn-add-player-1").attr("disabled","disabled");
      $("#btn-add-player-1").hide();
     } else {
       alert("Enter a name and add Player One");
     }

   });

   $("form#frm-player-2").submit(function(event) {
       event.preventDefault();
     //  Create Player 2 obect when a player 2 name has been entered. Otherwise, raise an alert ....
     if ($("input#new-player-2-name").val() !== "") {
       newPlayer2 = new Player($("input#new-player-2-name").val(),false,0);
       //  Disable Player name and Add player button
       $("input#new-player-2-name").attr("disabled","disabled");
       $("#btn-add-player-2").attr("disabled","disabled");
       $("#btn-add-player-2").hide();
     } else {
       alert("Enter a name and add Player Two");
     }

   });

  $(".btn-roll").click(function() {

    $("#btn-hold").removeAttr("disabled");

   if (firstRollOfTurn === true) {

     turnScore = 0;
     rollsToAppendToTurn = "";
     firstRollOfTurn = false;

     if (newPlayer1.active === true) {
        turnNumberPlayer1 = turnNumberPlayer1 += 1;
       var newTurn = new Turn(turnNumberPlayer1,0);
       newPlayer1.turns.push(newTurn);
       $("#player-1-rolls").text("");
       $("#player-1-turns").append("<li>" + turnNumberPlayer1 + "</li>");
    } else if (newPlayer2.active === true) {

       turnNumberPlayer2 = turnNumberPlayer2 += 1;
       var newTurn = new Turn(turnNumberPlayer2,0);
       newPlayer2.turns.push(newTurn);
       $("#player-2-rolls").text("");
       $("#player-2-turns").append("<li>" + turnNumberPlayer2 + "</li>");
     }
   }

   var diceRoll = Math.floor((Math.random() * 6) + 1);
   rollsToAppendToTurn = rollsToAppendToTurn + " : " + diceRoll;


     if (newPlayer1.active === true && diceRoll != 1) {
       $(".player-1-stats").css("background-color", "rgb(217, 237, 247)");
       $("#frm-player-1").css("background-color", "rgb(217, 237, 247)");
       $(".player-2-stats").css("background-color", "rgba(217, 237, 247, .25)");
       $("#frm-player-2").css("background-color", "rgba(217, 237, 247, .25)");
       newPlayer1.turns[turnNumberPlayer1 - 1].rolls.push(diceRoll);
       turnScore = turnScore + diceRoll;
       newPlayer1.turns[turnNumberPlayer1 - 1].score = turnScore;
       $("#player-1-rolls").text(diceRoll);
       $("#player-1-turn-score").text(turnScore);
    } else if (newPlayer2.active === true && diceRoll != 1) {
      $(".player-2-stats").css("background-color", "rgb(217, 237, 247)");
      $("#frm-player-2").css("background-color", "rgb(217, 237, 247)");
      $(".player-1-stats").css("background-color", "rgba(217, 237, 247, .25)");
      $("#frm-player-1").css("background-color", "rgba(217, 237, 247, .25)");
       newPlayer2.turns[turnNumberPlayer2 - 1].rolls.push(diceRoll);
       turnScore = turnScore + diceRoll;
       newPlayer2.turns[turnNumberPlayer2 - 1].score = turnScore;
       $("#player-2-rolls").text(diceRoll);
       $("#player-2-turn-score").text(turnScore);
    } else if (newPlayer1.active === true && diceRoll === 1) {
       newPlayer1.turns[turnNumberPlayer1 - 1].rolls.push(diceRoll);
       turnScore = 0;
       newPlayer1.turns[turnNumberPlayer1 - 1].score = turnScore;
       $("#player-1-turns").append(rollsToAppendToTurn);
       $("#player-1-rolls").text(diceRoll);
       $("#player-1-turn-score").text(turnScore);
       $("#player-1-total-score").text(newPlayer1.score);
//
       newPlayer1.active = false;
       newPlayer2.active = true;
       $(".player-2-stats").css("background-color", "rgb(217, 237, 247)");
       $("#frm-player-2").css("background-color", "rgb(217, 237, 247)");
       $(".player-1-stats").css("background-color", "rgba(217, 237, 247, .25)");
       $("#frm-player-1").css("background-color", "rgba(217, 237, 247, .25)");
//
       $("#player-1-radio").removeAttr("checked");
       $("#player-2-radio").attr("checked",true);
       firstRollOfTurn = true;
     } else if  (newPlayer2.active === true && diceRoll === 1) {
        newPlayer2.turns[turnNumberPlayer2 - 1].rolls.push(diceRoll);
        turnScore = 0;
        newPlayer2.turns[turnNumberPlayer2 - 1].score = turnScore;
        $("#player-2-turns").append(rollsToAppendToTurn);
        $("#player-2-rolls").text(diceRoll);
        $("#player-2-turn-score").text(turnScore);
        $("#player-2-total-score").text(newPlayer2.score);
//
        newPlayer2.active = false;
        newPlayer1.active = true;
        $(".player-1-stats").css("background-color", "rgb(217, 237, 247)");
        $("#frm-player-1").css("background-color", "rgb(217, 237, 247)");
        $(".player-2-stats").css("background-color", "rgba(217, 237, 247, .25)");
        $("#frm-player-2").css("background-color", "rgba(217, 237, 247, .25)");
//
        $("#player-2-radio").removeAttr("checked");
        $("#player-1-radio").attr("checked",true);
        firstRollOfTurn = true;
     }

   });

   $(".btn-hold").click(function() {

      if (newPlayer1.active === true) {
        $("#player-1-turns").append(rollsToAppendToTurn);
        $("#player-1-rolls").text("");
        newPlayer1.score = newPlayer1.score + turnScore;
        $("#player-1-total-score").text(newPlayer1.score);
//
       newPlayer1.active = false;
       newPlayer2.active = true;
       $(".player-2-stats").css("background-color", "rgb(217, 237, 247)");
       $("#frm-player-2").css("background-color", "rgb(217, 237, 247)");
       $(".player-1-stats").css("background-color", "rgba(217, 237, 247, .25)");
       $("#frm-player-1").css("background-color", "rgba(217, 237, 247, .25)");
//
        $("#player-1-radio").removeAttr("checked");
        $("#player-2-radio").attr("checked",true);
        firstRollOfTurn = true;
      } else if (newPlayer2.active === true) {
        $("#player-2-turns").append(rollsToAppendToTurn);
        $("#player-2-rolls").text("");
        newPlayer2.score = newPlayer2.score + turnScore;
        $("#player-2-total-score").text(newPlayer2.score);
//
        newPlayer2.active = false;
        newPlayer1.active = true;
        $(".player-1-stats").css("background-color", "rgb(217, 237, 247)");
        $("#frm-player-1").css("background-color", "rgb(217, 237, 247)");
        $(".player-2-stats").css("background-color", "rgba(217, 237, 247, .25)");
        $("#frm-player-2").css("background-color", "rgba(217, 237, 247, .25)");
//
        $("#player-2-radio").removeAttr("checked");
        $("#player-1-radio").attr("checked",true);
        firstRollOfTurn = true;
      }


      if (newPlayer2.active === true) {
        if (newPlayer1.score >= 10) {
        $("#player-1-total-score").text(newPlayer1.score + " YOU ARE THE WINNER!!!");
        }
      } else if (newPlayer1.active === true) {
        if (newPlayer2.score >= 10) {
        $("#player-2-total-score").text(newPlayer2.score + " YOU ARE THE WINNER!!!");
        }
      }

      $("#btn-hold").attr("disabled","disabled");
    });
});
