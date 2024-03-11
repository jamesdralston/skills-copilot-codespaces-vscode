// create web server that listens on port 3000
// When you visit localhost:3000 in your browser, you should see a list of comments
// When you visit localhost:3000/new in your browser, you should see a form to add a new comment
// When you visit localhost:3000/new and submit the form, the server should add the comment to the list of comments
// When you visit localhost:3000/new and submit the form, you should be redirected to localhost:3000
// When you visit localhost:3000/comments/:id, you should see the comment with the corresponding id
// When you visit localhost:3000/comments/:id, you should see a link to delete the comment
// When you visit localhost:3000/comments/:id/delete, the comment should be removed from the list of comments

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var comments = require('./comments.json');
var path = require('path');
var _ = require('underscore');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments', function(req, res){
  var commentsHtml = '<ul>';
  comments.forEach(function(comment){
    commentsHtml += '<li><a href="/comments/' + comment.id + '">' + comment.body + '</a></li>';
  });
  commentsHtml += '</ul>';
  res.send(commentsHtml);
});

app.get('/comments/new', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'new.html'));
});

app.post('/comments', function(req, res){
  var newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments), function(err){
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      res.redirect('/comments');
    }
  });
});

app.get('/comments/:id', function(req, res){
  var comment = _.findWhere(comments, {id: parseInt(req.params.id)});
  res.send(comment.body);
});

app.get('/comments/:id/delete', function(req, res){
  comments = comments.filter(function(comment){
    return comment.id !== parseInt(req.params.id);
  });
  fs.writeFile('comments.json', JSON.stringify(comments), function(err){
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      res.redirect('/comments');
    }
  });
});

app.listen(3000, function(){
  console.log('Server listening on port 3000');
});

module.exports = app;
// Path: comments.json
// []
// Path: public/new.html
// <!DOCTYPE html>
// <html>
// <head>
//   <title>New Comment</title>
// </head>
// <body>
//   <h1>New Comment</h1>
//   <form action="/comments" method="post">
//     <textarea name="body"></textarea>
//     <input type="submit" value="Submit">
//   </form>
// </body>
// </html>
// Path: public/styles.css
// body {
//   font-family: Arial, sans-serif;
//   margin: 0;
//   padding: 0;
//   background-color: #f4f4f4;
// }
// h1 {
//   text-align: center