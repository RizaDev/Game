ig.module(
    'game.entities.screens.result'
)
.requires(
    'impact.entity',
)
.defines(function(){

    Result = ig.Entity.extend({
        // layer index terbesar alias layer paling depan 
        zIndex:9999,
        //property animasi transparansi tulisan title
        alphaTitle:1,
        //property animasi easeout untuk rectangle layar result
        factorY:-900,
         //property incremental score , nilai default 1
         increment:0,
         statusLoop:'jalan',
         

		init:function(x,y,settings){
            this.parent(x,y,settings);
            //method / fungsi animasi dengan plugin tween 
            this.tween({
                alphaTitle:0
            },1, {
                loop:ig.Tween.Loop.Reverse
            }).start();
            // method animasi easeout dengan tween
            this.tween({
                factorY:0
            },0.5, {
                easing:ig.Tween.Easing.Back.EaseOut
            }).start();
            
           
            
        },
        
        draw:function(){
            this.parent();
            var x = ig.system.width/2,
			y = ig.system.height/2;
            
            
         
            
           
            
            var marginX = 25;
            var ctx = ig.system.context;
           
            ctx.save();
            ctx.font = '30px arial';
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#ff0088';
            ctx.textAlign = 'center';
            ctx.fillText(this.increment, this.pos.x+ig.system.width*0.25, 300+this.factorY);
            ctx.restore();
           

            ctx.save();
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = "#CCCCCC";
            //eksekusi method animasi easeout
            ctx.fillRect(this.pos.x+marginX, this.pos.y+marginX+this.factorY, 400-marginX*2, 400);
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#ff0000';
            ctx.textAlign = 'center';
            ctx.font = '30px arial';
            //eksekusi method animasi transparansi
            ctx.globalAlpha = this.alphaTitle;
            ctx.fillText('RESULT ', this.pos.x+ig.system.width*0.25, 100+this.factorY);
          
            ctx.restore();

            
        },

        update:function(){
            this.parent();
            
            // var score = ig.game.entities[1].score;
           
            
            // if(this.statusLoop == 'jalan'){
            //     for (var index = 0; index <= score; index++) {
                    
                
                   
                  
            //     }
            // }
        },

    });

});


// Template

// ig.module(
//     'game.entities.screens.result'
// )
// .requires(
//     'impact.entity'
// )
// .defines(function(){

//     Result = ig.Entity.extend({
        
// 		init:function(x,y,settings){
//             this.parent(x,y,settings);
//         },
        
//         draw:function(){
//             this.parent();

//             var x = ig.system.width/2,
// 			y = ig.system.height/2;
		
//             var ctx = ig.system.context;
//             ctx.save();
//             ctx.beginPath();
//             ctx.fillStyle = "#FF0000";
//             ctx.fillRect(20, 20, 150, 100);
//             ctx.stroke();
//             ctx.restore();
//         },

//         update:function(){
//             this.parent();
//         },

//     });

// });