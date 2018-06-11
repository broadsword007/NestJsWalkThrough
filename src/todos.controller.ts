import { Get, Controller, Post, Patch, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoDatabaseService } from './tododatabase.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly TodoDBService: TodoDatabaseService) {}

  @Get('/')         //-- get all todos
  getAll(): Array<Object> {
    return this.TodoDBService.getAllTodos()
  }
  @Get('/:id')      //-- get a specific todo
  get(@Param() params): Object {
    var todo = this.TodoDBService.getTodoByID(params.id)
    if(todo == null)
    {
      return {}
    }
    else
    {
      return todo
    }
  }
  @Post('/')        //-- create a todo
  async create(@Body() postData): Promise<Object> {
    if(postData.text!=undefined && postData.done!=undefined)
    {
      console.log("Running1")
      var obj = {
          text : postData["text"],
          done: postData["done"]
      }
      console.log("Creating : ", obj)
      var res = await this.TodoDBService.createTodo(obj)
      if(res==undefined || res==null)
      {
        console.log("Running6")
        return {
          success: false,
          reason: null
        }
      }
      else
      {
        return {
          success: true,
          reason: null
        }
      }
    }
    else return {
      success: false,
      reason: "Invalid Parameters"
    }
  }
  @Put('/:id')      //-- update a todo
  update(@Body() postData, @Param() params): Object {
    if(postData["text"]!=undefined && postData["done"]!=undefined)
      {
          var obj = {
              text : postData["text"],
              done: postData["done"]
          }
          console.log("Updating to : ", obj)
          if(this.TodoDBService.updateTodo(params.id, obj))
          {
            return {
              success: true,
              reason: null
            }
          }
          else
          {
            return {
              success: false,
              reason: "Internal server error"
            }
          }
      }
      else return {
        success: false,
        reason: "Invalid Parameters"
      }
  }

  @Delete('/:id')   //-- delete a todo
  delete(@Param() params): Object {
    var todo = this.TodoDBService.deleteTodo(params.id)
    if(this.TodoDBService.deleteTodo(params.id))
    {
      return {
        success: true,
        reason: null
      }
    }
    else
    {
      return {
        success: false,
        reason: "Internal Server Error"
      }
    }
  }
}
