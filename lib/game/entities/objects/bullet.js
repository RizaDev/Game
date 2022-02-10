ig.module(
    'game.entities.objects.bullet'
)
.requires(
    'impact.entity'
)
.defines(function(){

    Bullet = ig.Entity.extend({
        
		init:function(x,y,settings){
            this.parent(x,y,settings);
        },
        warnaGun: '#00FF00',
        draw:function(){
            this.parent();

            var x = ig.system.width/2,
			y = ig.system.height/2;
		
            var ctx = ig.system.context;

            //Peluruu
            ctx.save();
            ctx.strokeStyle = this.warnaGun;
            ctx.beginPath();
            
            // ctx.moveTo(this.pos.x-20, this.pos.y-20); 
            // ctx.lineTo(this.pos.x-20,this.pos.y-10);
            ctx.moveTo(this.pos.x+20, this.pos.y-20); 
            ctx.lineTo(this.pos.x+20,this.pos.y-10);
            
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.restore();

            // ctx.save();
            // ctx.fillStyle = '#00FF00';
            // ctx.textAlign = 'center';
            // ctx.fillText('Bullet', this.pos.x, this.pos.y);
            // ctx.restore();
        },

        update:function(){
            this.parent();
        },

    });

});