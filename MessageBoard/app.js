var template = require('art-template');
var URL = require('url');
var http = require('http');
var fs = require('fs');

var comments = [
    {
        name: 'cl1',
        message: 'clsb',
        dateTime: '2019-12-1'
    },
    {
        name: 'cl2',
        message: 'clnb',
        dateTime: '2000-10-20'
    },
    {
        name: 'cl3',
        message: 'cllj',
        dateTime: '2018-10-20'
    }
];

http.createServer(function(req, res){
    var url = req.url;
    if (url === '/'){ //home page
        fs.readFile('./views/index.html', function(err, data){
           if (err)
               return res.end('home page 404 Not Found');
            var htmlStr = template.render(data.toString(), {
                comments: comments
            });
           res.end(htmlStr);
        });
    }
    // any page need if itself in server.on()
    else if (url === '/post'){
        // you can + '.html' or like this to beautify url
        // make dir !== url to beautify or conceal url
        fs.readFile('./view/post.html', function(err, data){
            if (err)
                return res.end('add page 404 Not Found');
            res.end(data);
        });
    }
    else if (url.indexOf('/addMeg') === 0){
        var urlObj = URL.parse(url, true);//must add 'true' parameter to parse String to object
        // console.log(urlObj.query);
        // res.end(JSON.stringify(urlObj.query));
        //将该对象的query反解析成字符串输出回去

        var msg = urlObj.query;
        // msg.dateTime = '2019-12-2';
        var date = new Date();
        msg.dateTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

        comments.unshift(msg); //array.unshift()
        console.log("get request:\n" + msg.name + ': ' + msg.message +
            '\t' + msg.dateTime);

        //how to make client redirect to homepage?
        //1.set 302 status:Moved Temporarily -- 可以简单的理解为该资源原本确实存在，但已经被临时改变了位置
        //2.use Location in response header to tell server to redirect to somewhere
        //if client receive 302, it will find location in response header automatically

        res.statusCode = 302;
        res.setHeader('Location', '/'); // /===url root path
        res.end(); //return directly
    }
    else if (url.indexOf('/public/') === 0){
        fs.readFile('.' + url, function(err, data){
           if (err){
               return res.end('404 Not Found!');
           }
           res.end(data);
        });
    }
    else{
        fs.readFile('./views/404.html', function(err, data){
            if (err){
                return res.end('404.html is Not Found');
            }
            res.end(data);
        });
    }
})
.listen(1122, function(){
    console.log('Success!http://127.0.0.1:1122');
});
