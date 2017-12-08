var path = require("path");

var friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        // Displays a JSON of all possible friends
        res.json(friendsData)
    });
  
    app.post("/api/friends", function(req, res) {
        // Handle incoming survey results and compatibiliy logic
        console.log(req)
        var newFriend = req.body
        friendsData.push(newFriend)
    });
};