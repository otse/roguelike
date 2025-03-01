export var game;
(function (game) {
    game.groundPresets = {
        default: {
            shapeGroundTexture: './img/textures/beach.jpg',
            shapeGroundTextureNormal: './img/textures/beachnormal.jpg',
        },
        stonemixed: {
            shapeGroundTexture: './img/textures/stonemixed2.jpg',
            shapeGroundTextureNormal: './img/textures/stonemixed2normal.jpg',
        },
        cobblestone: {
            shapeGroundTexture: './img/textures/cobblestone3.jpg',
            shapeGroundTextureNormal: './img/textures/cobblestone3normal.jpg',
        }
    };
})(game || (game = {}));
export default game;
