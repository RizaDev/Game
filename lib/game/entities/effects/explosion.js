ig.module(
    'game.entities.effects.explosion'
)
.requires(
    'impact.entity'
)
.defines(function(){

    Explosion = ig.Entity.extend({
        // layer index 100 dibawah layer result
        // dimana index result bernilai 9999
        zIndex:100,
        // buat animasi transparasi dari 1 ke 0
        alphaEffect:1,
        // buat animasi gambar dari kecil ke membesar
        scaleEffect:0,

        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.tween({
                alphaEffect:0,
                scaleEffect:1
            },1).start();
        },
        
        draw:function(){
            this.parent();

            var x = ig.system.width/2,
            y = ig.system.height/2;
        
            var ctx = ig.system.context;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = '#FFFFFF';
            // eksekusi animasi transparansi
            ctx.globalAlpha = this.alphaEffect;
            // eksekusi animasi gambar yang membesar
            ctx.arc(this.pos.x,this.pos.y,100*this.scaleEffect, 0, 2*Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        },

        update:function(){
            this.parent();
        },

    });

});