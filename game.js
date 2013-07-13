enchant();

var time = 0;

window.onload = function(){
    var game = new Game(320,320);
    game.fps = 16;
    game.preload('img/wilderness.gif');
    game.tick = 16*60; 
    game.score = 0;    
    
    //背景画像のクラス
     var Background = enchant.Class.create(Sprite,{
     initialize: function(){
           Sprite.call(this,320,320);
           this.image = game.assets['img/wilderness.gif'];
            game.rootScene.addChild(this);
        }
    });
    
    //スコアとタイムのクラス
     var timeLabel = enchant.Class.create(TimeLabel,{
     initialize: function(){
           TimeLabel.call('countdown');
           this.x = 250; this.y = 10;
        //this._element.style.zIndex = 300;
        this.addEventListener(Event.ENTER_FRAME, function(){
            this.time = 60;   
        });
        game.rootScene.addChild(this);
        }
    });
    
    game.onloadL = function(){
        
        //背景画像の生成
        var bg = new Background();
        
        //タイムとスコアの表示
       var scoretime = new ScoreTime();
        
        game.addEventListener(Event.ENTER_FRAME,function(){
        
        });
    };
    game.start();
};