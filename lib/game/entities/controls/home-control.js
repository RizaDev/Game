ig.module(
    'game.entities.controls.home-control'
)
.requires(
    'impact.entity',
    'game.entities.objects.player',
    'game.entities.objects.enemy',
    'game.entities.objects.bullet',
    'game.entities.objects.bullet-lain',
    'game.entities.objects.bintang',
    'game.entities.screens.result',
    'game.entities.effects.explosion'

)
.defines(function(){

    HomeControl = ig.Entity.extend({
        // state game
        state:'gamestart',
        contoh: '',

        // pemain
        player:null,
        lifeCount:1, // Nyawa
        score:10,
        movementSpeed:5, // kecepatan gerak player
        kelip:false,

        // Menembak property
        shootMax:0.25,//kecepatan maks frekuensi munculnya bullet yg satu ke bullet berikutnya
        shootTimer:0,
        arrayBullet:[],
        arrayBulletLain:[],

        // Property Spawn Musuh
        spawnTimer:1, 
        spawnMax:2,//kecepatan maks frekuensi munculnya enemy yg satu ke enemy berikutnya
        arrayEnemy:[],
        // property kill enemy
        arrayKillEnemy:[],
        // array bintang
        arrayBintang:[],
        spawnTimerBintang:2, 
        spawnMaxBintang:10,

         // Menampilkan result
         result:null,
       
        

        coba:[1,2,3],

        
        // method yang pertama kali di load dan hanya sekali dilakukan
		init:function(x,y,settings){
            this.parent(x,y,settings);
            // console.log(this.coba);
            // var yangdiKill = this.coba.splice(1,1); 
            // console.log(yangdiKill);
            
            // console.log(this.coba);
                      
            this.player = ig.game.spawnEntity(Player, 200, 400);
            console.log(ig.system);
            // this.showResult();
            
        },

       
        showResult: function(){
            this.result = ig.game.spawnEntity(Result, 0, 0);
            
            ig.game.sortEntitiesDeferred();
        },
        
        // Method untuk gambar segala hal di canvas
        draw:function(){
            this.parent();

            var x = ig.system.width/2,
			y = ig.system.height/2;
		
            var ctx = ig.system.context;
            var posY = 20;
            ctx.save();
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'left';
            ctx.font = '20px arial';
            ctx.fillText('Home Control', 0, posY);
            ctx.textAlign = 'right';
            ctx.fillText(this.lifeCount + '/10', ig.system.width-400, posY);
            ctx.fillText('Score : ' + this.score, ig.system.width-402, 40);
            ctx.restore();
        },
        // method yang senantiasa dijalankan saat game berjalan
        update:function(){
            this.parent();

            
            if(ig.input.state('left')){
                console.log('left');
                this.player.pos.x -= this.movementSpeed;
            }else if (ig.input.state('right')){
                console.log('right');
                this.player.pos.x += this.movementSpeed;

            }else if (ig.input.state('space')){
                this.shootBullet();

            }
            // game over maka jangan jalankan berbagai
            // fungsi dibawah ini
            if(this.state == 'gameover') return;
            this.spawnEnemy();
            this.moveEnemy();
            this.moveBullet();
            this.playerEnemyCollision();
            this.BulletEnemyCollision();
            this.PlayerBintangCollision();
            this.killEnemy();
            this.spawnBintang();
            this.moveBintang();
        },

        // Memunculkan enemy secara random   
        spawnEnemy:function(){
            
            this.spawnTimer -= ig.system.tick;
            if(this.spawnTimer <= 0){
                var posX = Math.random()*ig.system.width;
                this.enemy = ig.game.spawnEntity(Enemy, posX, 0);
               
                this.arrayEnemy.push(this.enemy);
                this.spawnTimer = this.spawnMax;
                ig.game.sortEntitiesDeferred();
            }
        },

     

        // Pergerakan enemy
        moveEnemy: function(){
            var array = this.arrayEnemy;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                element.pos.y++;
                
            }
        },
        
        
        // Memunculkan bintang
        spawnBintang:function(){
        this.spawnTimerBintang -= ig.system.tick;
            if(this.spawnTimerBintang <= 0){
                var posX = Math.random()*ig.system.width/2;
                var bintang = ig.game.spawnEntity(Bintang, posX, 0);
                
                this.arrayBintang.push(bintang);
                this.spawnTimerBintang = this.spawnMaxBintang;
            }
        },
        // Pergerakan Bintang
        moveBintang: function(){
            var array = this.arrayBintang;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                element.pos.y++;
                
            }
        },
        // method untuk menambak musuh
        shootBullet:function(){
            this.shootTimer -= ig.system.tick;
            if(this.shootTimer <= 0){
                console.log('nembak!!');
                this.shootTimer = this.shootMax;
                var bullet = ig.game.spawnEntity(Bullet, this.player.pos.x, this.player.pos.y);
                this.arrayBullet.push(bullet);
                var peluru = ig.game.spawnEntity(Peluru, this.player.pos.x, this.player.pos.y);
                this.arrayBulletLain.push(peluru);
            }
        },

        // Pergerakan bullet
        moveBullet: function(){
            var array = this.arrayBullet;
            var array1 = this.arrayBulletLain;

            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                element.pos.y--;
                
            }
            
            for (var index = 0; index < array1.length; index++) {
                var element = array1[index];
                element.pos.y--;
                
            }
        },

        // deteksi jika ada gesekkan antara player dengan enemy
        playerEnemyCollision: function(){
            var array = this.arrayEnemy;
            // var pemainTween = this.player.tween({
            //     pos: {x:this.player.pos.x-20, y: this.player.pos.y},
            // }, 2.5,{
            //     easing: ig.Tween.Easing.Bounce.EaseInOut,
            // });
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                var jarak = Math.sqrt(Math.pow(element.pos.x-this.player.pos.x,2)+Math.pow(element.pos.y-this.player.pos.y, 2));
                if(jarak < 100){
                    this.arrayKillEnemy.push(element);
                    this.kelip = true;
                    // Memunculkan animasi kelap-kelip utk player selama 3 s
                    // ig.game.spawnEntity(Player, this.player.pos.x,this.player.pos.y);

                }
                
            }
        },
        //method kill enemy dan bullet sesuai peluru yang kena
        killEnemyAsPeluru: function(enemies, pelurus){
            for (var i = 0; i < enemies.length; i++) {
                var musuh = enemies[i];
 
                for (var j = 0; j < pelurus.length; j++) {
                    var peluru = pelurus[j];
                    // cek collision
                    var jarak = Math.sqrt(Math.pow(musuh.pos.x-peluru.pos.x,2)+Math.pow(musuh.pos.y-peluru.pos.y,2));
                    // jika jarak kurang sama dengan 5, maka hilangkan musuh dan peluru
                    if(jarak <= 50){
                        console.log('nyenggol');
                        //hapus peluru 
                        pelurus.splice(j,1);
                        peluru.kill();
                        // hapus enemy
                        enemies.splice(i,1);
                        musuh.kill();
                        this.score +=25;
                    }
 
 
                    
                }
                
            }
        },
        // Tabrakan / gesekan antara peluru dan enemy
        BulletEnemyCollision: function(){
           var musuhs = this.arrayEnemy;
           var bullets = this.arrayBullet;
           var pelurus = this.arrayBulletLain;

           this.killEnemyAsPeluru(musuhs, bullets);
           this.killEnemyAsPeluru(musuhs, pelurus);
        },
        // Collision antara player dan bintang   
        PlayerBintangCollision: function(){
            var array = this.arrayBintang;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                var jarak = Math.sqrt(Math.pow(element.pos.x-this.player.pos.x,2)+Math.pow(element.pos.y-this.player.pos.y, 2));
                if(jarak < 100){
                    //hilangkan bintang
                    array.splice(index,1);
                    element.kill();
                    this.lifeCount += 3;
                }
                
            }
        },

        // kill enemy digunakan hanya saat enemy menabrak player
        killEnemy:function(){
            var array = this.arrayKillEnemy;
            
            
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                var indexMusuh = this.arrayEnemy.indexOf(element);
                this.arrayEnemy.splice(indexMusuh, 1);
                element.kill();
                this.lifeCount--;
                //memunculkan animasi ekploison/ledakan
                ig.game.spawnEntity(Explosion, element.pos.x,element.pos.y);
                

                // GameOver
                if(this.lifeCount <= 0){
                    this.showResult();
                    this.state = 'gameover';
                }
            }
            this.arrayKillEnemy = [];
        },

        
        
        


    });

    
   


});