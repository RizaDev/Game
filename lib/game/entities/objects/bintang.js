ig.module(
    'game.entities.objects.bintang'
)
.requires(
    'impact.entity'
)
.defines(function(){

    PowerUpA = ig.Entity.extend({
        
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
    PowerUpB = ig.Entity.extend({
        
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

            //gambar amunisi
      
            ctx.save();
            ctx.beginPath();
      
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x+7.5,this.pos.y-30);
            ctx.lineTo(this.pos.x+15,this.pos.y);
           ctx.lineTo(this.pos.x, this.pos.y)
            
            // ctx.lineWidth = 30;
            ctx.fillStyle = '#FF0000';
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#00FF00';
            ctx.beginPath();
            ctx.moveTo(this.pos.x,this.pos.y);
            ctx.lineTo(this.pos.x,this.pos.y+30);
            ctx.lineTo(this.pos.x+15,this.pos.y+30);
            ctx.lineTo(this.pos.x+15,this.pos.y);
            ctx.lineTo(this.pos.x,this.pos.y);
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#00FF00'; //blue
            ctx.beginPath();
            ctx.arc(this.pos.x+7.5,this.pos.y+30,7,0,Math.PI*1,false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
             
            
            

        },

        update:function(){
            this.parent();
        },

    });

    PowerUpC = ig.Entity.extend({
        
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

            //gambar petir
            ctx.save();
            ctx.strokeStyle = this.warna;
            ctx.beginPath();
    
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x+10,this.pos.y-30);
            ctx.lineTo(this.pos.x+1,this.pos.y-35);
            
            ctx.lineTo(this.pos.x+20,this.pos.y-60);
            ctx.lineTo(this.pos.x+8,this.pos.y-40);
            ctx.lineTo(this.pos.x+20,this.pos.y-37);
            ctx.lineTo(this.pos.x,this.pos.y);
            
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