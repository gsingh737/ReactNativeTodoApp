/**
 * Created by User on 4/7/2017.
 */

exports.create = (req, res, next) => {
    const user = req.user;
    const text = req.body.text;
    const count = user.todos.push({
        text
    });
    const _id = user.todos[count-1]._id;
    user.save((err) => {
       if(err) {
           return next(err);
       }
       res.json({todo: {text, _id}});
    });
}

exports.index = (req, res, next) => {
    res.json({todos: req.user.todos});
}

exports.destroy = (req, res, next) => {
    const user = req.user;
    const todo_id = req.params.todo_id
    console.log(todo_id);
    user.todos.pull({_id: todo_id});
    user.save((err) => {
        if(err) {
            return next(err);
        }
        res.json({});
    });
}