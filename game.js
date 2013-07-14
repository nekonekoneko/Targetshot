enchant();

var time = 0;
var LimitTime = 16*60;
var addscore = 10;

var addspecialscore = 30;

var DISPLAY_STATE = 0;
var HIT_STATE = 1;
var DLEATE_STATE = 2;

window.onload = function(){
    //ゲーム画面の定義
    var game = new Game(320,320);
    game.fps = 16;
    game.preload('img/wilderness.gif','img/target.png');
    game.tick = 0; 
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
     var ScoreTime = enchant.Class.create(Label,{
     initialize: function(){
        Label.call(this);
        this.x = 250; this.y = 10;
        //this._element.style.zIndex = 300;
        this.addEventListener(Event.ENTER_FRAME, function(){
            if(time >= 0){
                LimitTime--;
            }else{};
            time = Math.floor(LimitTime / 16);
            this.text = "タイム：" + time + "<br>スコア：" + game.score;
            if(time == -1){
                game.end(game.score,'あなたのスコアは' + game.score + 'です。');
            }
        });
        game.rootScene.addChild(this);
        }
    });
    

    //的のクラス
    var Target = enchant.Class.create(Sprite,{
     initialize: function(x,y){
           Sprite.call(this,32,32);
           this.image = game.assets['img/target.png'];
            this.frame = 0;
            this.x = x;
            this.y = y;
            this.tick = 0;
            this.state = DISPLAY_STATE;
            this.addEventListener(Event.TOUCH_START,function(){
                game.score += addscore; 
                game.rootScene.removeChild(this);
            });
            game.rootScene.addChild(this);
        },
            onenterframe:function(){
                if(this.state == DISPLAY_STATE){
                    this.tick++;
                    if(this.tick % 48 == 0){
                        this.state = DLEATE_STATE;
                    }
                }else if(this.state == DLEATE_STATE){
                    this.tick++;
                    game.rootScene.removeChild(this);
                } 
            }
    });
    
    //高得点の的のクラス
    var SpecialTarget = enchant.Class.create(Sprite,{
        initialize: function(x,y){
            Sprite.call(this,32,32);
            this.image = game.assets['img/target.png'];
            this.frame = 2;
            this.x = x;
            this.y = y;
            this.tick = 0;
            this.state = DISPLAY_STATE;
            this.addEventListener(Event.TOUCH_START,function(){
                game.score += addspecialscore; 
                game.rootScene.removeChild(this);
            });
            
             
           
            game.rootScene.addChild(this);
        },
            onenterframe:function(){
                if(this.state == DISPLAY_STATE){
                    this.tick++;
                    if(this.tick % 16 == 0){
                        this.state = DLEATE_STATE;
                    }
                }else if(this.state == DLEATE_STATE){
                    this.tick++;
                    game.rootScene.removeChild(this);
                }
                    
                }
                
                });
    
    
    
    game.onload = function(){
        
        //背景画像の生成
        var bg = new Background();
        
        //タイムとスコアの表示
       var scoretime = new ScoreTime();
        
        game.addEventListener(Event.ENTER_FRAME,function(){
            game.tick++;
               
            if(game.tick / 16 <= 30 ){
                if(game.tick % 32 == 0){
                    //的の表示
                    var target = new Target(Math.floor(Math.random()*290-32)+32,Math.floor(Math.random()*200-32)+32);
                } 
            }else if(game.tick / 16 >= 30){
                if(game.tick % 8 == 0){
                    //的の大量表示
                    var target = new Target(Math.floor(Math.random()*290-32)+32,Math.floor(Math.random()*200-32)+32);
                }
            }
             if(game.tick % 80 == 0){    
                //高得点の的の表示
                var specialtarget = new SpecialTarget(Math.floor(Math.random()*290-80)+80,Math.floor(Math.random()*200-80)+80);
             }
                    
                
            
        });
    };
    
        
    
    game.start();
};