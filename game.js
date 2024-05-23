const keypress = require("keypress");
const Field = require("./field");


//Setup field
const myField = new Field(Field.generateField(10, 10));

//Keypress function
function handleKeyPress(ch, key) {
    if (key) {
        switch (key.name){
            case "up":
                myField.movePlayer('up');
                break;
            case "down":
                myField.movePlayer('down');
                break;
            case "left":
                myField.movePlayer('left');
                break;
            case "right":
                myField.movePlayer('right');
                break;            
        }
        myField.print();
    }

    //Handle 
    if(key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
}

//Start "process.stdin" to emitting "keypress"
keypress(process.stdin);

//Handling "keypress" event
process.stdin.on("keypress", handleKeyPress);

//Start the game
myField.print();
process.stdin.setRawMode(true);
process.stdin.resume();