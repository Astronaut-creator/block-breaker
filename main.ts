namespace SpriteKind {
    export const tile = SpriteKind.create()
    export const block = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.block, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    getPos(sprite, otherSprite)
    if (direction == 1) {
        sprite.setVelocity(sprite.vx * -1, -1 * sprite.vy)
    } else {
        sprite.setVelocity(-1 * sprite.vy, sprite.vx * -1)
    }
    otherSprite.destroy()
})
function getPos (sprite: Sprite, otherSprite: Sprite) {
    if (sprite.x < otherSprite.x - 8 || sprite.x < otherSprite.x + 8) {
        direction = 1
    } else {
        direction = 0
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.setVelocity(sprite.vx, -1 * sprite.vy)
})
let direction = 0
let tile: Sprite = null
let tilepick = 0
let x = 0
let paddle = sprites.create(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . 
. 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . 
. 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
paddle.setPosition(79, 100)
controller.moveSprite(paddle, 100, 0)
let projectile = sprites.createProjectileFromSprite(img`
. . f f f f f f . . 
. f 1 1 1 1 1 1 f . 
f 4 4 4 4 4 4 1 1 f 
f 4 4 4 4 4 4 4 1 f 
f 4 4 4 4 4 4 4 1 f 
f 4 4 4 4 4 4 4 1 f 
f 4 4 4 4 4 4 4 1 f 
f 4 4 4 4 4 4 4 1 f 
. f 4 4 4 4 4 4 f . 
. . f f f f f f . . 
`, paddle, 50, -55)
projectile.setFlag(SpriteFlag.DestroyOnWall, false)
projectile.setFlag(SpriteFlag.BounceOnWall, true)
for (let index = 0; index <= 9; index++) {
    for (let index2 = 0; index2 <= 2; index2++) {
        x = index * 18
        if (index2 % 2 == 1) {
            x = index * 18 + 8
        }
        tilepick = Math.randomRange(0, 2)
        if (tilepick == 0) {
            tile = sprites.create(img`
5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
5 2 2 2 2 2 2 2 2 2 2 2 2 2 2 5 
5 5 5 5 5 5 5 5 5 5 5 5 5 5 2 5 
5 2 2 2 2 2 2 2 2 2 2 2 2 5 2 5 
5 2 5 5 5 5 5 5 5 5 5 5 2 5 2 5 
5 2 5 2 2 2 2 2 2 2 2 5 2 5 2 5 
5 2 5 2 5 5 5 5 5 5 2 5 2 5 2 5 
5 2 5 2 5 2 2 2 2 5 2 5 2 5 2 5 
5 2 5 2 5 2 5 5 2 5 2 5 2 5 2 5 
5 2 5 2 5 2 5 5 5 5 2 5 2 5 2 5 
5 2 5 2 5 2 2 2 2 2 2 5 2 5 2 5 
5 2 5 2 5 5 5 5 5 5 5 5 2 5 2 5 
5 2 5 2 2 2 2 2 2 2 2 2 2 5 2 5 
5 2 5 5 5 5 5 5 5 5 5 5 5 5 2 5 
5 2 2 2 2 2 2 2 2 2 2 2 2 2 2 5 
5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
`, SpriteKind.block)
        } else if (tilepick == 1) {
            tile = sprites.create(img`
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
7 5 7 7 7 7 7 7 7 7 7 7 7 7 5 7 
7 5 5 7 7 7 7 7 7 7 7 7 7 5 5 7 
7 5 5 5 7 7 7 7 7 7 7 7 5 5 5 7 
7 7 5 5 5 7 7 7 7 7 7 5 5 5 7 7 
7 7 7 5 5 5 7 7 7 7 5 5 5 7 7 7 
7 7 7 7 5 5 5 7 7 5 5 5 7 7 7 7 
7 7 7 7 7 5 5 5 5 5 5 7 7 7 7 7 
7 7 7 7 7 5 5 5 5 5 5 7 7 7 7 7 
7 7 7 7 5 5 5 7 7 5 5 5 7 7 7 7 
7 7 7 5 5 5 7 7 7 7 5 5 5 7 7 7 
7 7 5 5 5 7 7 7 7 7 7 5 5 5 7 7 
7 5 5 5 7 7 7 7 7 7 7 7 5 5 5 7 
7 5 5 7 7 7 7 7 7 7 7 7 7 5 5 7 
7 5 7 7 7 7 7 7 7 7 7 7 7 7 5 7 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
`, SpriteKind.block)
        } else {
            tile = sprites.create(img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, SpriteKind.block)
        }
        tile.setPosition(x, index2 * (18 + 20))
    }
}
info.setScore(1)
scene.setBackgroundColor(3)
direction = 1
forever(function () {
    if (projectile.bottom > 119) {
        game.over(false, effects.slash)
    }
    if (info.score() == 30) {
        game.over(true, effects.confetti)
    }
})
