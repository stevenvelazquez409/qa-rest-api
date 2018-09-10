'use strict';

const express = require('express');
var router = express.Router();

//GET /questions
// Return all the questions
router.get('/', function(req,res){
  res.json({response: "You sent me a GET request"});
});

//POST /questions
//create questions
router.post('/', function(req,res){
  res.json({
    response: "You sent me a GET request",
    body: req.body
  });
});

//GET /questions/:id
//route for specific querstions
router.get('/:qId', function(req,res){
  res.json({
    response: "You sent me a GET request" + req.params.qId
  });
});

//POST /questions/:id/answers
//create answer
router.post('/:qId/answers', function(req,res){
  res.json({
    response: "You sent me a POST request to /answers",
    questionId: req.params.qId,
    body: req.body
  });
});


//PUT /questions/:qId/answers/:id
//edit a specific answer
router.put("/:qId/answers/:aId", function(req,res){
  res.json({
    response: "You sent me a PUT request to /answers",
    questionId: req.params.qId,
    answerId: req.params.aId,
    body: req.body
  });
});

//DELETE /questions/:qId/answers/:id
//delete a specific answer
router.delete("/:qId/answers/:aId", function(req,res){
  res.json({
    response: "You sent me a DELETE request to /answers",
    questionId: req.params.qId,
    answerId: req.params.aId,
  });
});

//POST /questions/:qId/answers/:id/vote-up
//POST /questions/:qId/answers/:id/vote-down
//Vote on a specific answer
router.post("/:qId/answers/:aId/vote-:dir", function(req, res, next){
    if(req.params.dir.search(/^(up|down)$/) === -1){
      var err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  },function(req,res){
    res.json({
      response: "You sent me a POST request to /vote-" + req.params.dir,
      questionId: req.params.qId,
      answerId: req.params.aId,
      vote: req.params.dir
    });
});


module.exports = router;
