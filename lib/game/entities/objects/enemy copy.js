ig.module(
    'game.entities.objects.enemy'
)
.requires(
    'impact.entity'
)
.defines(function(){

    Enemy = ig.Entity.extend({
        
		init:function(x,y,settings){
            this.parent(x,y,settings);
        },
        warnaMusuh: '#FF0000',
        
        draw:function(){
            this.parent();

            var x = ig.system.width/2,
			y = ig.system.height/2;

            var ctx = ig.system.context;
            //gambar spaceship
            //  Gun 1
             ctx.save();
             ctx.strokeStyle = this.warnaMusuh;
             ctx.beginPath();
             
             ctx.moveTo(this.pos.x-15, this.pos.y-20); 
             ctx.lineTo(this.pos.x-15,this.pos.y-4);
             
             ctx.lineWidth = 5;
             ctx.stroke();
             ctx.restore();
            //  Gun 2
             ctx.save();
             ctx.strokeStyle = this.warnaMusuh;
             ctx.beginPath();
             
             ctx.moveTo(this.pos.x+15, this.pos.y-20); 
             ctx.lineTo(this.pos.x+15,this.pos.y-4);
             
             ctx.lineWidth = 5;
             ctx.stroke();
             ctx.restore();

            //  Noss
             ctx.save();
             ctx.strokeStyle = this.warnaMusuh;
             ctx.beginPath();
             
             ctx.moveTo(this.pos.x, this.pos.y+20); 
             ctx.lineTo(this.pos.x,this.pos.y+27);
             
             ctx.lineWidth = 3;
             ctx.stroke();
             ctx.restore();

             //body
             ctx.save();
             ctx.strokeStyle = this.warnaMusuh;
             ctx.beginPath();
             
             ctx.arc(this.pos.x, this.pos.y,20, 0, 1* Math.PI);
             ctx.moveTo(this.pos.x, this.pos.y-20);
             ctx.lineTo(this.pos.x+40,this.pos.y+19);
             ctx.lineTo(this.pos.x+1,this.pos.y+10);
             ctx.moveTo(this.pos.x+1,this.pos.y+10); 
             ctx.lineTo(this.pos.x-40,this.pos.y+19);
             ctx.lineTo(this.pos.x,this.pos.y-20);
             
             
             ctx.lineWidth = 2;
             ctx.fillStyle = this.warnaMusuh;
             ctx.fill();
             ctx.stroke();
             ctx.restore();

             ctx.save();
             ctx.font = '30px arial';
             ctx.fillText(this.lifeEnemy, this.pos.x-10,this.pos.y+10);
             ctx.fillStyle = '#fff';
             ctx.restore();

		
        
        },

        update:function(){
            this.parent();
        },

    });

});