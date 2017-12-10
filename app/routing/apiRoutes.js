var path = require("path");
var randomInt = require("random-int")

// Get the current data
var friendsData = require("../data/friends");

module.exports = function(app) {
    // Display the API data in the /api/friends page
    app.get("/api/friends", function(req, res) {
        res.json(friendsData)
    });

    // Add a new friend to the API
    app.post("/api/friends", function(req, res) {
        // Extract the new data from the request
        var newFriend = req.body
        var newFriendScores = newFriend.scores

        // Generate a match if there is someone in the data already
        if (friendsData.length > 0) {
            // The difference in scores between the new friend and everyone in the API
            var friendComparisons = []

            // Loop to determine the friends comparisons
            for (i=0; i<friendsData.length; i++) {
                var potentialMatchScores = friendsData[i].scores
                var totalDifference = 0
                for (j=0; j<potentialMatchScores.length; j++) {
                    var questionDifference = Math.abs(potentialMatchScores[j] - newFriendScores[j])
                    totalDifference += questionDifference
                }
                friendComparisons.push(totalDifference)
            }

            // Find the smallest comparison number
            var minimumValue = Math.min.apply(null, friendComparisons)

            // The best matches will have the smallest comparison number
            var bestMatches = []
            for (i=0; i<friendComparisons.length; i++) {
                if (friendComparisons[i] === minimumValue) {
                    bestMatches.push(i)
                }
            }

            // Choose one of the best matches based upon a randomly generated number
            var randomNumber = randomInt(bestMatches.length-1)
            var bestMatchIndex = bestMatches[randomNumber]           
            var chosenMatch = friendsData[bestMatchIndex]

            // Send the chosen best match as a server response
            res.json(chosenMatch)
        }

        // Add the new friend
        friendsData.push(newFriend)
    });
};