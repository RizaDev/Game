ig.module(
    'game.levels.home'
)
.requires(
    'impact.image',
    'game.entities.controls.home-control'
)
.defines(function(){
    Home = {
        "entities":[
            {"type":"HomeControl","x":0,"y":0}
        ],
        "layer":[]
    };
});