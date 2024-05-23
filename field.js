const fieldCharacter = '░';
const pathCharacter = '*';
const holeCharacter = 'O';
const hatCharacter = '^';

class Field {
    constructor(field) {
        this.field = field;
        this.playerPosition = {x: 0, y: 0};
        this.field[0][0] = pathCharacter;
    }

    print() {
        this.field.forEach(row => console.log(row.join('')));
    }

    updateField() {
        this.field[this.playerPosition.y][this.playerPosition.x] = pathCharacter;
    }

    movePlayer(direction) {
        let {x,y} = this.playerPosition;
        switch(direction){
            case "up":
                y -= 1;
                break;
            case "down":
                y += 1;
                break;
            case "left":
                x -= 1;
                break;
            case "right":
                x += 1;
                break;
            default:
                console.log("Invalid move");
                return;
        }

        if(this.isOutOfBounds(x,y) || this.isHole(x,y)) {
            console.log("Game Over! GURU MEDITATION 00000004 restarting...");
        }
        else if(this.isHat(x,y)) {
            console.log("Congratulation! You found the hat of the GURU!");
            process.exit(0);
        }
        else {
            this.playerPosition = { x, y };
            this.updateField();
        }
    }

    isOutOfBounds(x, y) {
        return x < 0 || y < 0 || x >= this.field[0].length || y >= this.field.length; 
    }

    isHole(x, y) {
        return this.field[y][x] === holeCharacter;
    }
    isHat(x,y) {
        return this.field[y][x] === hatCharacter;
    }

    resetGame() {
        this.playerPosition = { x: 0 , y: 0 };
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[y].length; x++) {
                if (this.field[y][x] === pathCharacter) {
                    this.field[y][x] = fieldCharacter;
                }
            }
        }
        this.field[0][0] = pathCharacter;
    }

    static generateField(height, width, holePercentage = 0.2){
        const field = new Array(height).fill(0).map(() => 
            new Array(width).fill(fieldCharacter));

        //Random Holes
        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++){
                if(Math.random() < holePercentage){
                    field[y][x] = holeCharacter;
                }
            }        
        }

        //Random Hat
        const hatPosition = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };

        field[hatPosition.y][hatPosition.x] = hatCharacter;

        //Secure that Starting point isn't hole
        field[0][0] = pathCharacter;

        return field;
    }

}

module.exports = Field;