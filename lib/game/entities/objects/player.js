ig.module(
    'game.entities.objects.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

    Player = ig.Entity.extend({
       
		init:function(x,y,settings){
            this.parent(x,y,settings);
            this.tween({
                alphaPemain:0
            },1, {
                loop:ig.Tween.Loop.Reverse
            }).start();
        },
        
        alphaPemain:1,
        hitRadius:100,
        warnaBadan: '#0000FF',
        warnaSayap: '#0000FF',
        warnaGun: '#FF0000',
        draw:function(){
            this.parent();

            var x = ig.system.width/2,
			y = ig.system.height/2;

		
            var ctx = ig.system.context;
       
             //Gun
             ctx.save();

             ctx.strokeStyle = this.warnaGun;
             ctx.beginPath();
             
             ctx.moveTo(this.pos.x-20, this.pos.y-20); 
             ctx.lineTo(this.pos.x-20,this.pos.y+10);
             ctx.moveTo(this.pos.x+20, this.pos.y-20); 
             ctx.lineTo(this.pos.x+20,this.pos.y+10);
             ctx.globalAlpha = this.alphaPemain;
             ctx.lineWidth = 5;
             ctx.stroke();
             ctx.restore();

           
             //body
             ctx.save();
             ctx.strokeStyle = this.warnaBadan
             ctx.beginPath();
             
            
             ctx.moveTo(this.pos.x-10, this.pos.y-10);
             ctx.lineTo(this.pos.x-40,this.pos.y-10);
             ctx.lineTo(this.pos.x,this.pos.y+40);
                       
             ctx.lineTo(this.pos.x+40,this.pos.y-10);
             ctx.lineTo(this.pos.x-10,this.pos.y-10);
             
             ctx.lineWidth = 2;
             ctx.fillStyle = this.warnaBadan;
             ctx.globalAlpha = this.alphaPemain;
             ctx.fill();
             ctx.stroke();
             ctx.restore();

            //Sayap
             ctx.save();
             ctx.strokeStyle = this.warnaSayap;
             ctx.beginPath();
       
             ctx.moveTo(this.pos.x, this.pos.y-30);
             ctx.lineTo(this.pos.x-20,this.pos.y+40);
             ctx.lineTo(this.pos.x,this.pos.y+10);
             ctx.moveTo(this.pos.x,this.pos.y+10); 
             ctx.lineTo(this.pos.x+20,this.pos.y+40);
             ctx.lineTo(this.pos.x,this.pos.y-30);
             
             ctx.lineWidth = 2;
             ctx.fillStyle = this.warnaSayap;
             ctx.globalAlpha = this.alphaPemain;
             ctx.fill();
             ctx.stroke();
             ctx.restore();
            
        

        },

        update:function(){
            this.parent();
            console.log(ig.game.entities[1].kelip);
        },

    });

});