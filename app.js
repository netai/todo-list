var http=require('http');
var express=require('express');
var redisStore=require('connect-redis')(express);
var iniparser=require('iniparser');
var mysql = require('mysql');
var config=iniparser.parseSync('./config.ini');
var fs=require('fs');
var connection  = require('express-myconnection');

var app=express();

app.use(express.bodyParser({keepExtentions:true}));
app.use(express.cookieParser());
app.use(express.cookieSession({
		store:new redisStore({
				host:'127.0.0.1',
				port:5345,
				prefix:'sess',
			}),
		secret:'superkey'
	}));
/*****************mysql connection*******************/
app.use(
	connection(mysql,{
		host: 'localhost',
		user: 'root',
		password : 'root',
		port : 3306,
		database:'node_store'
	},'request')
);
/*****************************************/
var routes=require('./routes')(app);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(app.router);
app.use(express.errorHandler());
app.use(express.logger({
		format:'tiny',
		stream:fs.createWriteStream('app.log',{'flagd':'w'})
	}));
app.use(function(req,res){
		res.status(400);
		res.send('File Not Found');
	});

http.createServer(app).listen(config.port,function(){
		console.log('App started on port '+config.port)
	});
