var path = require("path");
var randomInt = require("random-int")

var friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData)
    });
  
    app.post("/api/friends", function(req, res) {
        // Handle incoming survey results and compatibiliy logic
        var newFriend = req.body
        var newFriendScores = newFriend.scores

        if (friendsData.length > 0) {
            var friendComparisons = []

            for (i=0; i<friendsData.length; i++) {
                var potentialMatchScores = friendsData[i].scores
                var totalDifference = 0
                for (j=0; j<potentialMatchScores.length; j++) {
                    var questionDifference = Math.abs(potentialMatchScores[j] - newFriendScores[j])
                    totalDifference += questionDifference
                }
                friendComparisons.push(totalDifference)
            }

            var minimumValue = Math.min.apply(null, friendComparisons)
            var bestMatches = []
            for (i=0; i<friendComparisons.length; i++) {
                if (friendComparisons[i] === minimumValue) {
                    bestMatches.push(i)
                }
            }

            var randomNumber = randomInt(bestMatches.length-1)
            var bestMatchIndex = bestMatches[randomNumber]           
            var chosenMatch = friendsData[bestMatchIndex]

            res.json(chosenMatch)
        } else {
            res.json()
        }

        friendsData.push(newFriend)
    });
};