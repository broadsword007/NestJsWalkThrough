import { Injectable } from '@nestjs/common';
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import * as mongoose from 'mongoose';
class Todo extends Typegoose{
@prop() text : string
@prop() done : boolean
}
var TodoModel=null
@Injectable()
export class TodoDatabaseService {
  constructor(){
    mongoose.connect('mongodb://broadsword007:broadsword007@ds147180.mlab.com:47180/broadsword_db1test',
    function(err){
        try
        {
            if(err)
            {
                console.log("MongoDB error occured: ", err)
                throw err
            }
        }
        catch(e)
        {
            console.log("Exception occured \n\n")
        }
    }) 
    const model = new Todo().getModelForClass(Todo)
    TodoModel = model
    var dbCon = mongoose.connection
    dbCon.once('open', function(){
    console.log("Connected to remote mongo DB")
    TodoModel.create({
        text : "A dummy todo",
        done : false
    }, function(err, todo) {
        if (err)
            console.log("Error occured while adding")
        else
            console.log("Record added")
    });
    })
  }
  getAllTodos(): Array<String> {
    return TodoModel.find((err, todos) => {
        if(!err)
        {
            return todos
        }
        else return []
    })
  }
  getTodoByID(id: Number): Object {
      try
      {
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            throw { 
                name:        "InvalidIDException", 
                message:     "Passed ID in params is invalid.", 
                toString:    function(){return this.name + ": " + this.message;} 
            }
        }
        return TodoModel.findById(id, (err, todo)=>{
            if(!err)
            {
                return todo
            }
            else return {}
        })
      }
      catch(exception)
      {
        console.log("Exception :", exception.toString(), " occured in getTodoById")
        return null
      }
  }
  createTodo(info: Object): Object {
      try
      {
        var promise = TodoModel.create(info)
        return promise
      }
      catch(exception)
      {
        console.log("Exception :", exception, " occured in createTodo")
        return {}
      }
  }
  updateTodo(id: string, info: Object): Boolean {
    try
      {
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            throw { 
                name:        "InvalidIDException", 
                message:     "Passed ID in params is invalid.", 
                toString:    function(){return this.name + ": " + this.message;} 
            }
        }
        if(info["text"]!=undefined && info["done"]!=undefined)
        {
            var obj = {
                text : info["text"],
                done: info["done"]
            }
            return TodoModel.findByIdAndUpdate(id, obj, (err)=>{
                if(err)
                {
                    return false
                }
                else
                {
                    return true
                }
            })
        }
        else return false
      }
      catch(exception)
      {
        console.log("Exception :", exception.toString(), " occured in getTodoById")
        return null
      }
  }
  deleteTodo(id: string): Boolean{
    try
    {
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            throw { 
                name:        "InvalidIDException", 
                message:     "Passed ID in params is invalid.", 
                toString:    function(){return this.name + ": " + this.message;} 
            }
        }
        return TodoModel.findByIdAndDelete(id, (err, todo)=>{
            if(!err)
            {
                return true
            }
            else return false
        })
    }
    catch(exception)
    {
      console.log("Exception :", exception.toString(), " occured in deleteTodo")
      return false
    }
  }
}
