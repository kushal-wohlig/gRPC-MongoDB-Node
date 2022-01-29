// const { result } = require('lodash');

// async function main(){
//     const {MongoClient} = require('mongodb');

//     //use mongoose to connect and interact with dataabase
//     //mongoose is an ODM library
//     const mongoose = require('mongoose');
//     const uri ="mongodb+srv://kushal-wohlig:Wohlig%40123@cluster0.vbyug.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
//     mongoose.connect(uri)
//         .then((result) => console.log("Connected to datbase"))
//         .catch((err)=> console.log(err));

//     const Blog = require('./models/blog');

//     const blog = new Blog({
//         title:'My Blog 1',
//         snippet:'This is my blog number 1 snippet',
//         body:'This is body of my blog'
//     });

//     blog.save()
//         .then((result) => console.log("The data has been saved "+ result._id))
//         .catch((err) => console.log(err));

//     Blog.find()
//         .then((result) =>{
//             console.log(result);
//         })
//         .catch((err) => console.log(err));
// }
// main();


//Starting with Server.js

var PROTO_PATH = __dirname + '/hello.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).hello;

function main(){
    var server = new grpc.Server();
    //adding here mongoDB connections

    //const {MongoClient} = require('mongodb');

    //use mongoose to connect and interact with dataabase
    //mongoose is an ODM library
    const mongoose = require('mongoose');
    const uri ="mongodb+srv://kushal-wohlig:Wohlig%40123@cluster0.vbyug.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
    mongoose.connect(uri)
        .then((result) => console.log("Connected to datbase"))
        .catch((err)=> console.log(err));

    const Blog = require('./models/blog');

    server.addService(hello_proto.Greeter.service,{
        getAll:(_,callback) =>{
            console.log("Inside GetAll RPC");
            Blog.find()
            .then((result) =>{
                console.log(result);
                //var myJsonString = JSON.stringify(result);
                callback(null,{result});
            })
            .catch((err) => console.log(err));
            
        }

    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
      });


}
main();
