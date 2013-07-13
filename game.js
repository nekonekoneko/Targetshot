enchant();

window.onload = function(){
    var game = new Game(320,320);
    game.fps = 16;
    game.preload();    
    
    game.onload = function(){
        game.addEventListener(Event.ENTER_FRAME,function(){
        
        });
    };
    game.start();
};