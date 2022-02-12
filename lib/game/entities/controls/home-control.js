ig.module(
    'game.entities.controls.home-control'
)
.requires(
    'impact.entity',
    'game.entities.objects.player',
    'game.entities.objects.enemy',
    'game.entities.objects.bullet',
    'game.entities.objects.bintang',
    'game.entities.screens.result',
    'game.entities.effects.explosion'

)
.defines(function(){

    HomeControl = ig.Entity.extend({
        // state game
        state:'gamestart',
        

        // pemain
        player:null,
        lifePlayer:1, // Nyawa
        score:10,
        movementSpeed:5, // kecepatan gerak player
        // deteksi jika ada gesekkan antara player dengan enemy
        alphaPlayer:1,
        velPlayer:0,
        

        // Menembak property
        shootMax:0.25,//kecepatan maks frekuensi munculnya bullet yg satu ke bullet berikutnya
        shootTimer:0,
        arrayBulletA:[],
        arrayBulletB:[],
        velBullet:1,
        radiusHitBullet:50,

        // Property Musuh
        enemy:null,
        numberEnemy:0,
        lifeEnemy:0,
        radiusHitEnemy:0,
        spawnTimer:1, 
        spawnMax:2,//kecepatan maks frekuensi munculnya enemy yg satu ke enemy berikutnya
        arrayEnemy:[],
        // property kill enemy
        arrayKillEnemy:[],


        // array power up Start
        arrayPowerUpA:[],
        spawnTimerPowerUpA:2, 
        spawnMaxPowerUpA:10,
        // array power up Gun
        arrayPowerUpB:[],
        spawnTimerPowerUpB:3, 
        spawnMaxPowerUpB:15,
        // array power up Start
        arrayPowerUpC:[],
        spawnTimerPowerUpC:5, 
        spawnMaxPowerUpC:21,

        //player invulnerable property
        //lamanya waktu invulnerable
        // property timeInvulnerable harus menyesuaikan dengan property tweenConter di player
        timeInvulnerable:0, 

         // Menampilkan result
         result:null,
       
        


        
        // method yang pertama kali di load 
		init:function(x,y,settings){
            this.parent(x,y,settings);
           
                      
            this.player = ig.game.spawnEntity(Player, 200, 400);
            this.showResult1();

            
        },

        showResult1: function(){
            
            this.result = ig.game.spawnEntity(enemyAnimExplosion, 100, 400);
            
            ig.game.sortEntitiesDeferred();
        },
        showResult: function(){
            this.result = ig.game.spawnEntity(Result, 0, 0, {
                scoreTarget:this.score
            });
            
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
            ctx.fillText('Jumlah Musuh : '+ this.numberEnemy, 0, posY+30);
            ctx.textAlign = 'right';
            ctx.fillText(this.lifePlayer + '/10', ig.system.width-400, posY);
            ctx.fillText('Score : ' + this.score, ig.system.width-402, 40);
            ctx.restore();
        },
        // method yang senantiasa dijalankan saat game berjalan
        update:function(){
            this.parent();

            
            if(ig.input.state('left')){
                console.log('left');
                this.player.pos.x -= this.movementSpeed+this.velPlayer;
            }else if (ig.input.state('right')){
                console.log('right');
                this.player.pos.x += this.movementSpeed+this.velPlayer;
            }
            // }else if (ig.input.state('space')){
            //     this.shootBullet();

            // }
            // game over maka jangan jalankan berbagai
            // fungsi dibawah ini
            if(this.state == 'gameover') return;
            this.spawnEnemy();
            this.moveEnemy();
            this.moveBullet();
            if(this.timeInvulnerable <= 0){
                this.playerEnemyCollision();
            }
            this.BulletAEnemyCollision();
            this.BulletBEnemyCollision();
            this.PlayerPowerUpACollision();
            this.PlayerPowerUpBCollision();
            this.PlayerPowerUpCCollision();
            this.killEnemy();
            this.spawnPowerUpA();
            this.movePowerUpA();
            this.spawnPowerUpB();
            this.movePowerUpB();
            this.spawnPowerUpC();
            this.movePowerUpC();
            this.shootBullet();

            if(this.timeInvulnerable > 0){
                this.timeInvulnerable -= ig.system.tick;
            }
        },

        // Memunculkan enemy secara random   
        spawnEnemy:function(){
            
            this.spawnTimer -= ig.system.tick;
            if(this.spawnTimer <= 0){
                var posX = Math.random()*ig.system.width*_SCREEN_SCALE;
                // this.lifeEnemy++;
                this.numberEnemy++;
                this.lifeEnemy = this.numberEnemy*2;
                this.radiusHitEnemy = this.lifeEnemy;
                this.enemy = ig.game.spawnEntity(Enemy, posX, 0,{
                    lifeEnemy:this.lifeEnemy,
                    radiusHitEnemy:this.radiusHitEnemy
                });
                
                
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
        
        
        // Memunculkan Power Up start
        spawnPowerUpA:function(){
        this.spawnTimerPowerUpA -= ig.system.tick;
            if(this.spawnTimerPowerUpA <= 0){
                var posX = Math.random()*ig.system.width/2;
                var powerUp = ig.game.spawnEntity(PowerUpA, posX, 0);
                
                this.arrayPowerUpA.push(powerUp);
                this.spawnTimerPowerUpA = this.spawnMaxPowerUpA;
            }
        },
        // Memunculkan Power Up Gun
        spawnPowerUpB:function(){
        this.spawnTimerPowerUpB -= ig.system.tick;
            if(this.spawnTimerPowerUpB <= 0){
                var posX = Math.random()*ig.system.width/2;
                var powerUp = ig.game.spawnEntity(PowerUpB, posX, 0);
                
                this.arrayPowerUpB.push(powerUp);
                this.spawnTimerPowerUpB = this.spawnMaxPowerUpB;
            }
        },
        // Memunculkan Power Up Flash
        spawnPowerUpC:function(){
        this.spawnTimerPowerUpC -= ig.system.tick;
            if(this.spawnTimerPowerUpC <= 0){
                var posX = Math.random()*ig.system.width/2;
                var powerUp = ig.game.spawnEntity(PowerUpC, posX, 0);
                
                this.arrayPowerUpC.push(powerUp);
                this.spawnTimerPowerUpC = this.spawnMaxPowerUpC;
            }
        },

        // Pergerakan Start
        movePowerUpA: function(){
            var array = this.arrayPowerUpA;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                element.pos.y++;
                
            }
        },
        // Pergerakan Gun
        movePowerUpB: function(){
            var array = this.arrayPowerUpB;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                element.pos.y++;
                
            }
        },
        // Pergerakan Flash
        movePowerUpC: function(){
            var array = this.arrayPowerUpC;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                element.pos.y++;
                
            }
        },
        // method untuk menambak musuh
        shootBullet:function(){
            this.shootTimer -= ig.system.tick;
            if(this.shootTimer <= 0){
                this.shootTimer = this.shootMax;
                var bulletA = ig.game.spawnEntity(BulletA, this.player.pos.x, this.player.pos.y, {
                    radiusHitBullet: this.radiusHitBullet
                });
                this.arrayBulletA.push(bulletA);
                var bulletB = ig.game.spawnEntity(BulletB, this.player.pos.x, this.player.pos.y,{
                    radiusHitBullet: this.radiusHitBullet
                });
                this.arrayBulletB.push(bulletB);
            }
        },

        // Pergerakan bullet
        moveBullet: function(){
            var arrayA = this.arrayBulletA;
            var arrayB = this.arrayBulletB;

            for (var index = 0; index < arrayA.length; index++) {
                var element = arrayA[index];
                element.pos.y -=this.velBullet;
                
            }
            
            for (var index = 0; index < arrayB.length; index++) {
                var element = arrayB[index];
                element.pos.y-=this.velBullet;
                
            }
        },

      
        playerEnemyCollision: function(){
            var array = this.arrayEnemy;
           
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                var distance = Math.sqrt(Math.pow(element.pos.x-this.player.pos.x,2)+Math.pow(element.pos.y-this.player.pos.y, 2));
                // console.log(element.radiusHitEnemy);
                if(distance < element.radiusHitEnemy){
                    this.arrayKillEnemy.push(element);
                    // Memunculkan animasi kelap-kelip utk player selama 3 s
                    this.player.getHit();
                    //set property time invulnerable selama 3s 
                    this.timeInvulnerable = 10;
                    
                    
                    

                }
                
            }
        },
   
        // Tabrakan / gesekan antara peluru dan enemy
        BulletAEnemyCollision: function(){
           var enemies = this.arrayEnemy;
           var bullets = this.arrayBulletA;
           
           for (var i = 0; i < enemies.length; i++) {
                var enemy = enemies[i];

                for (var j = 0; j < bullets.length; j++) {
                    var bullet = bullets[j];
                    // cek collision
                    var distance = Math.sqrt(Math.pow(enemy.pos.x-(bullet.pos.x+20),2)+Math.pow(enemy.pos.y-(bullet.pos.y),2));
                
                    // jika jarak kurang sama dengan 50, maka hilangkan musuh dan peluru
                    //artinya besar hit radius bullet = 50px
                    if(distance < this.radiusHitBullet){
                        
                        //hapus peluru 
                        bullets.splice(j,1);
                        bullet.kill();
                        // kurangi nyawa enemy
                        enemy.lifeEnemy--;
                        //visual effect saat enemy tertembak
                        ig.game.spawnEntity(enemyExplosion, enemy.pos.x,enemy.pos.y);
                        
                    
                        if(enemy.lifeEnemy < 1){
                            //hapus musuh
                            enemies.splice(i,1);
                            enemy.kill();
                            
                            //memunculkan animasi ekploison/ledakan
                            ig.game.spawnEntity(Explosion, enemy.pos.x,enemy.pos.y);
                            this.score +=25;
                        }
                    }


                
                }
            }
        },
        // Tabrakan / gesekan antara peluru dan enemy
        BulletBEnemyCollision: function(){
           var enemies = this.arrayEnemy;
           var bullets = this.arrayBulletB;
           
           for (var i = 0; i < enemies.length; i++) {
                var enemy = enemies[i];

                for (var j = 0; j < bullets.length; j++) {
                    var bullet = bullets[j];
                    // cek collision
                    var distance = Math.sqrt(Math.pow(enemy.pos.x-(bullet.pos.x-20),2)+Math.pow(enemy.pos.y-(bullet.pos.y),2));
                
                    // jika jarak kurang sama dengan 50, maka hilangkan musuh dan peluru
                    //artinya besar hit radius bullet = 50px
                    if(distance <= this.radiusHitBullet){
                        
                        //hapus peluru 
                        bullets.splice(j,1);
                        bullet.kill();
                        // kurangi nyawa enemy
                        enemy.lifeEnemy--;
                        ig.game.spawnEntity(enemyExplosion, enemy.pos.x,enemy.pos.y);
                       
                            
                       
                    
                        if(enemy.lifeEnemy < 1){
                            //hapus musuh
                            enemies.splice(i,1);
                            enemy.kill();
                            
                            //memunculkan animasi ekploison/ledakan
                            ig.game.spawnEntity(Explosion, enemy.pos.x,enemy.pos.y);
                            this.score +=25;
                        }
                    }


                
                }
            }
        },

          
        
        // Collision antara player dan start   
        PlayerPowerUpACollision: function(){
            var array = this.arrayPowerUpA;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                var distance = Math.sqrt(Math.pow(element.pos.x-this.player.pos.x,2)+Math.pow(element.pos.y-this.player.pos.y, 2));
                if(distance < 100){
                    //hilangkan bintang
                    array.splice(index,1);
                    element.kill();
                    
                    this.lifePlayer += 3;
                }
                
            }
        },
        // Collision antara player dan Gun   
        PlayerPowerUpBCollision: function(){
            var array = this.arrayPowerUpB;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                var distance = Math.sqrt(Math.pow(element.pos.x-this.player.pos.x,2)+Math.pow(element.pos.y-this.player.pos.y, 2));
                if(distance < 100){
                    //hilangkan bintang
                    array.splice(index,1);
                    element.kill();
                    //gerak peluru bertambah 2
                    this.velBullet += 2;
                }
                
            }
        },
        // Collision antara player dan start   
        PlayerPowerUpCCollision: function(){
            var array = this.arrayPowerUpC;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                var distance = Math.sqrt(Math.pow(element.pos.x-this.player.pos.x,2)+Math.pow(element.pos.y-this.player.pos.y, 2));
                if(distance < 100){
                    //hilangkan bintang
                    array.splice(index,1);
                    element.kill();
                    //gerak player bertambah 2
                    this.velPlayer += 3;
                }
                
            }
        },

        // kill enemy digunakan hanya saat enemy menabrak player
        killEnemy:function(){
            var array = this.arrayKillEnemy;
            
            
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                var indexEnemy = this.arrayEnemy.indexOf(element);
                this.arrayEnemy.splice(indexEnemy, 1);
                element.kill();
                
                this.lifePlayer--;
                //memunculkan animasi ekploison/ledakan
                ig.game.spawnEntity(Explosion, element.pos.x,element.pos.y);
                

                // GameOver
                if(this.lifePlayer <= 0){
                    this.showResult();
                    this.state = 'gameover';
                }
            }
            this.arrayKillEnemy = [];
        },

        
        
        


    });

    


});