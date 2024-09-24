import './style.css'

import { Application, Assets, Container, Graphics, Sprite, Text } from 'pixi.js'

const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

const app = new Application()
await app.init({ width: windowWidth, height: windowHeight })

document.body.appendChild(app.canvas)

const offsetContainer = new Container()
offsetContainer.x = windowWidth / 2
offsetContainer.y = windowHeight / 2
app.stage.addChild(offsetContainer)

const tileSize = 500
const tilePath = '/tile.png'

const drawTiles = async (
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
  drawGrid?: boolean,
): Promise<void> => {
  const topLeftX = Math.floor(minX / tileSize) * tileSize
  const topLeftY = Math.floor(minY / tileSize) * tileSize
  const bottomRightX = Math.ceil(maxX / tileSize) * tileSize
  const bottomRightY = Math.ceil(maxY / tileSize) * tileSize

  const c = new Container()
  offsetContainer.addChild(c)

  const g = drawGrid ? new Graphics() : undefined

  for (let x = topLeftX; x + tileSize <= bottomRightX; x += tileSize) {
    for (let y = topLeftY; y + tileSize <= bottomRightY; y += tileSize) {
      await Assets.load(tilePath)
      const sprite = Sprite.from(tilePath)
      sprite.x = x
      sprite.y = y
      sprite.width = tileSize
      sprite.height = tileSize
      c.addChild(sprite)

      if (drawGrid && g) {
        g.moveTo(x, y)
        g.lineTo(x + tileSize, y)
        g.stroke({ width: 2, color: 0xffffff })
        c.addChild(g)

        g.moveTo(x, y)
        g.lineTo(x, y + tileSize)
        g.stroke({ width: 2, color: 0xffffff })
        c.addChild(g)

        const t = new Text({
          text: `(${x}, ${y})`,
        })
        t.x = x
        t.y = y
        c.addChild(t)
      }
    }
  }
}

// await drawTiles(-600, -750, 1500, 1800)
await drawTiles(-1200, -750, 1500, 1800, true)
