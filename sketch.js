var balloon, background,database;

function preload() {
  backgroundImg = loadImage("Hot Air Ballon-01.png")
  balloonImage = loadAnimation("Hot Air Ballon-02.png");
}

function setup(){
  database = firebase.database()
   console.log(database);
    createCanvas(1000,1000);

balloon = createSprite (100,400, 20, 20)
  balloon.addAnimation("balloon", balloonImage);
  balloon.scale = 0.4;

var ballonPosition=database.ref('balloon/position');
ballonPosition.on("value", readPosition,showError);
}

function draw(){

  background(backgroundImg);

  if(position !==undefined){
    
  
        if(keyDown(LEFT_ARROW)){
          writePosition(-10,0);
              

        }
        else if(keyDown(RIGHT_ARROW)){
          writePosition(10,0);
        }
        else if(keyDown(UP_ARROW)){
          writePosition(0,-10);
          balloon.scale=balloon.scale -0.01; 
        }
        else if(keyDown(DOWN_ARROW)){
          writePosition(0,+10);
          balloon.scale=balloon.scale +0.01; 
        }
        drawSprites();
    }

  }

    


    function readPosition(data){
      position=data.val();
      balloon.x=position.x;
      balloon.y=position.y;
    }

    function writePosition(x,y) {
      database.ref('balloon/position').set({
        'x':position.x + x,
        'y':position.y + y
      })
    }



    function showError(){
     console.log("Error in writing in the database");

    }