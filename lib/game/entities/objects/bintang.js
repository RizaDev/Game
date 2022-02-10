ig.module(
    'game.entities.objects.bintang'
)
.requires(
    'impact.entity'
)
.defines(function(){

    Bintang = ig.Entity.extend({
        
		init:function(x,y,settings){
            this.parent(x,y,settings);
        },
        hitRadius:100,
        warna: '#FFFF00',
        
        draw:function(){
            this.parent();

            var x = ig.system.width/2,
			y = ig.system.height/2;

		
            var ctx = ig.system.context;

            //gambar bintang
            ctx.save();
            ctx.strokeStyle = this.warna;
            ctx.beginPath();
            
           
            ctx.moveTo(this.pos.x-10, this.pos.y-10);
            ctx.lineTo(this.pos.x-40,this.pos.y-10);
            ctx.lineTo(this.pos.x,this.pos.y+40);
            
            ctx.lineTo(this.pos.x+40,this.pos.y-10);
            ctx.lineTo(this.pos.x-10,this.pos.y-10);
            
            ctx.lineWidth = 2;
            ctx.fillStyle = this.warna;
            ctx.fill();
            ctx.stroke();
            ctx.restore();

           
            ctx.save();
            ctx.strokeStyle = this.warna;
            ctx.beginPath();
      
            ctx.moveTo(this.pos.x, this.pos.y-30);
            ctx.lineTo(this.pos.x-40,this.pos.y+20);
            ctx.lineTo(this.pos.x+40,this.pos.y+20);
            ctx.lineTo(this.pos.x,this.pos.y-30);
           
            
            ctx.lineWidth = 2;
            ctx.fillStyle = this.warna;
            ctx.fill();
            ctx.stroke();
            ctx.restore();
             
            
            

        },

        update:function(){
            this.parent();
        },

    });

});