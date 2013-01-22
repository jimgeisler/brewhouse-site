var rest = require('restler-master');

var jsonData = "{ \"name\" : \"newbrew\", \"style\" : \"IPA\", \"brewers\" : [\"brent\"], \"grain_bill\" : [\"\"], \"hops\" : [\"\"]}";
var username = 'broni',
    password = 'jimsucksatmagic';

var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
var header = {'Authorization':auth};
var headers = {'headers':header};

// Grab the command line arguments
var cmd_args = process.argv.slice(2);


if (cmd_args.length == 2 && cmd_args[0] == 'delete') {
    rest.del('http://localhost:5000/recipes',
             //options
             {
                 data: {'recipe_id' : cmd_args[1]},
                 username : username,
                 password : password
                 
             })
        .on('complete', function(data, response) {
            console.log(response);
            console.log(data);
        });
} else if (cmd_args.length == 2 && cmd_args[0] == 'post_recipes') {
    
} else {
    rest.post('http://localhost:5000/recipes',
            //options
            {
                data : {
                    recipe : JSON.stringify({
                        name : 'new brew',
                        style : 'IPA',
                        brewers : ['brent'],
                        grain_bill : ['barley'],
                        hops : ['amarillo']
                    })
                },
                username : username,
                password : password                
            }).on('complete', function (data, response) {
                console.log(data);
            });
}
