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

             //body
             ctx.save();
             ctx.strokeStyle = this.warnaMusuh;
             ctx.beginPath();
             
             if(this.radiusHitEnemy< 50){

                 ctx.arc(this.pos.x, this.pos.y,this.radiusHitEnemy, 0, 2* Math.PI);
            }else{
                 ctx.arc(this.pos.x, this.pos.y,50, 0, 2* Math.PI);

             }

             ctx.fillStyle = this.warnaMusuh;
             ctx.fill();
             ctx.restore();

             ctx.save();
             ctx.textAlign = "center";
             if(this.radiusHitEnemy < 5){

                 ctx.font = '5px arial';
                 ctx.fillText(this.lifeEnemy, this.pos.x,this.pos.y+1);
             }
             else if(this.radiusHitEnemy < 18){
                 ctx.font = '10px arial';
                 ctx.fillText(this.lifeEnemy, this.pos.x,this.pos.y+1);
            }else{
                ctx.font = '30px arial';
                ctx.fillText(this.lifeEnemy, this.pos.x,this.pos.y+10);
             }
             
             ctx.restore();

		
        
        },

        update:function(){
            this.parent();
        },

    });

});