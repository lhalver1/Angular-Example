var myApp = angular.module('myApp', []);

//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

myApp.controller('MyCtrl', function MyCtrl($scope, $timeout) {
    $scope.name = 'Superhero';
    $scope.editing = false;
    $scope.themeName = "bs4";

    //Black Jack vars
    $scope.gaming = false;              //Flag for gaming
    $scope.playerTurnIndex = 0;         //Flag for the current hand
    $scope.trash = [];                  //discard pile
    $scope.deck = getCards();           //Deck of Cards
    $scope.players = [
        { name: "Player", cards: [], turn: false, type: "Human" },
        { name: "Dealer", cards: [], turn: false, type: "CPU" } 
    ];

    $scope.selectedRow = null;
    $scope.rows = generateRows(Math.round(Math.random() * (5 - 1) + 1));


    $scope.selectTableRow = function (row) {
        if ($scope.selectedRow == row) {
            $scope.selectedRow = null;
        } else {
            $scope.selectedRow = row;
        }
    }

    $scope.editName = function () {
        $scope.editing = true;
    }

    function generateRows(x) {
        var rows = [], j = x;

        for (var i = 0; i < x; i++) {
            rows.push({
                col1: "Data" + i,
                col2: "Data" + j
            });
            j--;
        }

        return rows;
    }
    
    /**
     * Builds the deck of cards. Creates an array of card objects with a
     * suit and value property.
     */
    function getCards() {
        var genDeck = [];
        var suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
        var cards = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

        for(var i = 0; i < suits.length ; i++) {
            var currSuit = suits[i];
            for(var k = 0; k < cards.length ; k++) {
                var currCard = cards[k];
                genDeck.push({
                    suit: currSuit,
                    value: currCard
                });
            }
        }

        //Be sure to shuffle it
        genDeck = shuffle(genDeck);
        return genDeck;
    }

    /**
     * Randomly shuffle the items in an array
     * From: http://stackoverflow.com/a/2450976/2593877
     * 
     * @param  {array} array - The array to have its items shuffled
     * @returns {array} array - The array with the items in it shuffled
     */
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /**
     * The next player is a Bot or Dealer, be smart for them.
     */
    $scope.goBeABot = function(player) {
        var total = $scope.cardsTotal(player);
        var hasSomeOneBusted = false;
        var highestVisibleTotal = -1;

        for (var index = 0; index < $scope.players.length; index++) {
            var currPlayer = $scope.players[index];
            if (currPlayer.turn) {
                var playersTotal = $scope.cardsTotal(currPlayer);

                if (playersTotal > 21) {
                    //Do nothing, player broke 21
                } else if (playersTotal > highestVisibleTotal) {
                    highestVisibleTotal = playersTotal;
                }
            }
        }

        if (total === 21) {
            $timeout(function() {
                $scope.stay(player);
            }, 2000);
        }

        if ( total <= 16 && total < highestVisibleTotal) {
            $timeout(function() {
                $scope.hit(player)
            }, 2000);
        } else if( total <= 16 && total >= highestVisibleTotal) {
            $timeout(function() {
                $scope.stay(player);
            }, 2000);
        } else if (total > 16 && total < highestVisibleTotal) {
            $timeout(function() {
                $scope.hit(player);
            }, 2000);
        } else if( total > 16 && total >= highestVisibleTotal ) {
            $timeout(function() {
                $scope.stay(player);
            }, 2000);
        } else { 
            $timeout(function() {
                $scope.stay(player);
            }, 2000);
        }
    }

    /**
     * Deals out cards to the player and the dealer. First makes sure the
     * gaming flag is set and that both hands are empty, if not then it 
     * puts the cards in the hands in the trash pile.
     */
    $scope.dealOutCards = function() {
        if($scope.gaming === false){
            $scope.gaming = true;
        }

        for (var i = 0; i < $scope.players.length; i++) {
            var currPlayer = $scope.players[i];
            if (currPlayer.cards.length > 0) {
                for (var index = 0; index < currPlayer.cards.length; index++) {
                    var currCard = currPlayer.cards[index];
                    $scope.trash.push(currCard);
                }
                currPlayer.cards.splice(0, currPlayer.cards.length);// = [];
            }
        }

        if ($scope.trash.length >= 38) {
            $scope.reshuffle(false);
        } else {

            for(var x = 0; x < 2 ; x++) {
                for (var i = 0; i < $scope.players.length; i++) {
                    var currPlayer = $scope.players[i];
                    var currCard = $scope.deck.splice(0,1)[0];
                    currPlayer.cards.push(currCard);
                }
            }

            $scope.resetPlayerTurns();
            $scope.players[$scope.playerTurnIndex].turn = true;
        }


    }//End dealOutCards()

    /**
     * Goes through the players list and sets the turn flag
     * to false. Meaning that for the next round that player
     * hasn't had their turn yet.
     */
    $scope.resetPlayerTurns = function() {
        $scope.playerTurnIndex = 0;
        for (var index = 0; index < $scope.players.length; index++) {
            var player = $scope.players[index];
            player.turn = false;
        }
    }

    /**
     * Adds a card to the players hand, if the players hand excedes
     * 21 then the player ends their turn and loses and the hand.
     */
    $scope.hit = function(player) {
        player.cards.push($scope.deck.splice(0,1)[0]);

        if(player.type === "Human") {
            if($scope.cardsTotal(player) >= 22) {
                $scope.playerTurnIndex += 1;

                //If the next players turn is out of index for players array
                //Reset it back to the beginning
                if ($scope.playerTurnIndex >= $scope.players.length) {

                    $scope.endRound();
                    
                } else {
                    var nextPlayer = $scope.players[$scope.playerTurnIndex];
                    nextPlayer.turn = true;
                    if(nextPlayer.type = "CPU") {
                        $scope.goBeABot(nextPlayer);
                    }
                }
            }
        } else {
            $scope.goBeABot(player);
        }


    }

    /**
     * The player has elected to stay with their hand. End
     * their turn.
     */
    $scope.stay = function(player) {
        $scope.playerTurnIndex += 1;

        //If the next players turn is out of index for players array
        //Reset it back to the beginning
        if ($scope.playerTurnIndex >= $scope.players.length) {

            $scope.endRound();

        } else {
            var nextPlayer = $scope.players[$scope.playerTurnIndex];
            nextPlayer.turn = true;
            if(nextPlayer.type = "CPU") {
                $scope.goBeABot(nextPlayer);
            }
        }
    }

    $scope.endRound = function() {

        $timeout(function() {
            $scope.dealOutCards();
        }, 3000);

    }

    /**
     * Resets everything, the deck is cleared and then built again.
     * The trash is cleared, the players hand is cleared, and the 
     * dealers hand is cleared. The gaming flag is also set to false.
     */
    $scope.reshuffle = function(done) {
        $scope.deck.splice(0,$scope.deck.length);// = [];
        $scope.trash.splice(0, $scope.trash.length);// = [];

        $scope.deck = getCards();
        $scope.dealOutCards();

        if(done) {
            $scope.gaming = false;
        }
    }

    /**
     * Counts the cards total.
     * 
     * @param  {object} player - The player whose cards need to be added up
     * @returns {int} total - The sum of the players cards
     */
    $scope.cardsTotal = function(player) {
        var acesArr = [];
        var total = 0;

        for (var i = 0; i < player.cards.length; i++) {
            var card = player.cards[i];
            var value = card.value;

            if(value == "King" || value == "Queen" || value == "Jack") {
                total += 10;
            } else if (value == "Ace") {
                total += 11;
                acesArr.push(card);
            } else {
                total += parseInt(value);
            }
        }//END For

        if (acesArr.length > 0) {
            for (var index = 0; index < acesArr.length; index++) {
                if (total > 21) {
                    total -= 10;
                }
            }
        }

        return total;
    }
    
});