var rectHeight = 90,
  rectWidth = 90,
  rectMargin = 10;

const gems = ["blue", "green", "orange", "red", "white", "yellow"];

/**
 * Number of cells required to trigger an explosion
 */
const explosionThreshold = 3;
const swapDuration = 180; // ms
const destroyDuration = 180; // ms
var itemClick1 = { x: 0, y: 0 };
var itemClick2 = { x: 0, y: 0 };

function main() {
  var scene = new g.Scene({
    game: g.game,
    assetPaths: [
      "/image/player.svg",
      "/image/ground.jpg",
      "/image/explosion.png",
      "/image/blue.png",
      "/image/green.png",
      "/image/orange.png",
      "/image/red.png",
      "/image/white.png",
      "/image/yellow.png",
    ],
    // assetIds: ["explosion"]
  }); //add display width height theo thông số ở game.json
  scene.onLoad.add(function () {
    //load các đối tượng lên display

    var x, y;
    for (y = 0; y < g.game.height; y += rectHeight + rectMargin) {
      for (x = 0; x < g.game.width; x += rectWidth + rectMargin) {
        createEventRectItem(scene, x, y);
      }
    }

    // var tile = new at.Tile({
    //   scene: scene,
    //   src: scene.assets.mapchipImage,
    //   tileWidth: 32,
    //   tileHeight: 32,
    //   tileData: [
    //     [0, 1, 1, 0],
    //     [1, 2, 2, 1],
    //     [0, 0, 1, 0],
    //   ],
    // });
    // scene.append(tile);
  });
  g.game.pushScene(scene);
}

//các thuộc tính của 1 thực thể con
function createRect(scene, x, y, color) {
  return new g.FilledRect({
    scene: scene,
    width: 30,
    height: 30,
    x: x,
    y: y,
    cssColor: color,
  });
}

//các thuộc tính của 1 thực thể con
function createRectItem(scene, x, y) {
  var item = ["blue", "green", "orange", "red", "white", "yellow"];
  var idx = Math.floor(g.game.random.generate() * item.length);
  return new g.Sprite({
    scene: scene,
    width: 100,
    height: 100,
    src: scene.asset.getImageById(item[idx]),
    x: x,
    y: y,
  });
}

function createEventRectItem(scene, x, y) {
  var item = createRectItem(scene, x, y);
  item.touchable = true;
  scene.append(item);
  // item.onPointMove.add(function (ev) {
  //   item.x += ev.prevDelta.x;
  //   item.y += ev.prevDelta.y;
  //   item.modified();
  //   if (item.y > x + rectHeight + rectMargin) item.destroy();
  // });
  item.onPointDown.add(function (ev) {
    console.log(ev);
    if (itemClick1.x == 0) {
      itemClick1 = { x: ev.target.x, y: ev.target.y };
    }
    if (itemClick1.x != 0) {
      itemClick2 = { x: itemClick1.x, y: itemClick1.y };
      itemClick1 = { x: ev.target.x, y: ev.target.y };
    }
  });

  item.onPointUp.add(function (ev) {
    scene.onUpdate.add(function () {
      console.log("🚀 ~ file: main.js ~ line 107 ~ itemClick1", itemClick1);
      item.x = itemClick1.x;
      item.y = itemClick1.y;
      item.modified();
    });
  });

  // item.onPointMove.add(function (ev) {
  //   item.x += ev.prevDelta.x;
  //   item.y += ev.prevDelta.y;
  //   item.modified();
  //   console.log(ev);
  // });
}

function moveRect(rect, frameSprite) {
  ++rect.x; //thực thể di chuyển theo trục x
  rect.modified();
  if (rect.x > g.game.width / 2) {
    rect.destroy(); //khi x > 1/2 width màn hình thì thực thể sẽ bị x
  }
}

module.exports = main;
