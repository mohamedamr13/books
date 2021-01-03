const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
var path = require('path');
//var popup = require('popups');
let ejs = require('ejs');
const session = require('express-session');
//const sc = require('./errorScript.js');
app.set('view engine', 'ejs');
app.use(express.json());

app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

//let currUser = "";
// var currBooks = [];
//   for( var i = 0 ;  i<booksDB.length; i++)
//  if(booksDB[i].username = req.session.user)
//    currBooks = booksDB[i].books;
//////////////////// 
//we need to set a variable to store username in current session 
// whenever  the users adds a book to her/her readlist , the database is updated 
// when the user goes to the read list , the page either renders or filters the books in the database with the uesername 
// the user can also remove a book from the readlist - supposedly 
app.use( session({
 secret : 'key' ,
 resave : false,
 saveUninitialized : false ,
 cookie : {
  path : '/' , 
  httpOnly : false ,
  maxAge : 1000 * 60 * 60 * 24 * 20
 } ,
}));


let database = JSON.parse(fs.readFileSync("user.json"));

let booksDB = JSON.parse(fs.readFileSync("userWantToRead.json"));
// let currBooks = []; has to be a local variable 
// for( var i = 0 ;  i<booksDB.length; i++)
//  if(booksDB[i].username = currUser)
//    currBooks = booksDB[i].books;

app.get('/home', (req, res) => {
  res.render('home.ejs' , {
    Name : req.session.user
  });
  //res.send('Hello World!')

});



app.get('/', (req, res) => {
  res.render('login.ejs', {
    ErrorMessage:""  
    });
  //res.send('Hello World!')

});

app.get('/login', (req, res) => {
  res.render('login.ejs', {
    ErrorMessage:""  
    });
  //res.send('Hello World!')

});

app.get('/dune', (req, res) => {
  res.render('dune.ejs');
  //res.send('Hello World!')

});

app.get('/fiction', (req, res) => {
  res.render('fiction.ejs');
  //res.send('Hello World!')

});
app.get('/flies', (req, res) => {
  res.render('flies.ejs');
  //res.send('Hello World!')

});
app.get('/grapes', (req, res) => {
  res.render('grapes.ejs',{
    DoneMessage:""
  });  //res.send('Hello World!')

});

app.get('/leaves', (req, res) => {
  res.render('leaves.ejs');
  //res.send('Hello World!')

});

app.get('/mockingbird', (req, res) => {
  res.render('mockingbird.ejs');
  //res.send('Hello World!')

});
app.get('/novel', (req, res) => {
  res.render('novel.ejs');
  //res.send('Hello World!')

});

app.get('/poetry', (req, res) => {
  res.render('poetry.ejs');
  //res.send('Hello World!')

});
app.get('/readlist', (req, res) => {
  res.render('readlist.ejs');
  //res.send('Hello World!')

});

app.get('/registration', (req, res) => {
  res.render('registration.ejs', {
    ErrorMessage:""  
    });
  //res.send('Hello World!')

});

app.get('/searchresults', (req, res) => {
  res.render('searchresults.ejs',{
    Name : req.body.Search
  });
  //res.send('Hello World!')

});

app.get('/sun', (req, res) => {
  res.render('sun.ejs');
  //res.send('Hello World!')

});


// //var alert = window['alert'];
// const notifier = require('node-notifier');
// // String
// notifier.notify('Message');
// notifier.notify({
//   title: 'ERROR',
//   message: 'USERNAME ARLEADY DEFINED'
// });
// // Object


app.post('/register' , (req,res)=>{
 var x = req.body.username;
 var y = req.body.password;
 var i;
  for(  i = 0; i<database.length ; i++ ){
      if(database[i].username === x){
     
   return res.render('registration.ejs', {
    ErrorMessage:"Username is taken"  
    });
  }
    };
 // let newArr = JSON.parse(fs.readFileSync("user.json"));
  database.push({ username:x , password:y });
  fs.writeFileSync("user.json",JSON.stringify(database));
 // currUser = x;
  req.session.user = x;
  res.redirect('home');
  //console.log( 'length inside' + database.length);
}  );


app.post('/login' , (req,res)=>{
  var x = req.body.username;
  var y = req.body.password;
  var i;
  let noUser= true;
  let wrongUser=  true;
   for(  i = 0; i<database.length ; i++ ){
       if(database[i].username === x &&  database[i].password === y)
       {
        noUser = false;
        // console.log("true");
       // currUser = x;
       req.session.user = x;
      //  console.log(req.session);
      //  console.log(req.sessionID);
        return res.redirect('home');
       }
      // if(database[i].username === x &&  database[i].password != y)
      // {
      //   res.redirect('/login');
      // // error
      // }
      
     };
   if(noUser){
    //  console.log("here")
   res.render('login.ejs',{
     ErrorMessage:"Wrong UserName or Password"
   });
  }
 }  );
 

 app.post('/grapes' ,(req,res) =>{
   var currBooks = [];
  for( var i = 0 ;  i<booksDB.length; i++){
    console.log(booksDB[i].username);
 if(booksDB[i].username = req.session.user)
   currBooks = booksDB[i].books;
  }
   //console.log(currBooks);
   // make loop inside a function 
   let currUser = req.session.user;
 addBookToDb ('The Grapes of Wrath' , currBooks, currUser);
  
  fs.writeFileSync("userWantToRead.json",JSON.stringify(booksDB));

  res.render('grapes.ejs',{
    DoneMessage:"Book Added to List"
  });



 }  );


app.use('/css', express.static(__dirname + 'public/css'))


app.listen(port, () => {
  console.log(` App listening at http://localhost:${port}`)
})





 function addBookToDb  ( x , currBooks , currUser)  {
   
  if( !currBooks.includes(x) )
  currBooks.push(x);
// booksDB.push( { username : currUser , books: currBooks }  );
if(booksDB.length === 0){
 booksDB.push( { username : currUser , books: currBooks }  );
 console.log("entered");
}
 else {
   var flag = true;

   for  (var i = 0 ; i<booksDB.length ; i++){
   // console.log(booksDB[i].username);

     if(booksDB[i].username === currUser){
       booksDB[i].books = currBooks;
           flag = false;
           console.log(flag);
     }
   }
   console.log(flag);

   if(flag)
   booksDB.push( { username : currUser , books: currBooks }  );

 }
 return null;
}







app.post( '/search' , (req,res)=>{

  let s = req.body.Search;

res.render('searchresults.ejs' , {
  Name : s
});


} )