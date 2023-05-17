/* global preloadImagesTmr fxhash */

//
//  fxhash - fffffrfffffl
//
//
//  HELLO!! Code is copyright revdancatt (that's me), so no sneaky using it for your
//  NFT projects.
//  But please feel free to unpick it, and ask me questions. A quick note, this is written
//  as an artist, which is a slightly different (and more storytelling way) of writing
//  code, than if this was an engineering project. I've tried to keep it somewhat readable
//  rather than doing clever shortcuts, that are cool, but harder for people to understand.
//
//  You can find me at...
//  https://twitter.com/revdancatt
//  https://instagram.com/revdancatt
//  https://youtube.com/revdancatt
//

const ratio = 4 / 3 // 1.414 is the golden ratio

// const startTime = new Date().getTime() // so we can figure out how long since the scene started
let drawn = false
let highRes = false // display high or low res
const features = {}
let resizeTmr = null
const dumpOutputs = false

window.$fxhashFeatures = {}

class Room {
  constructor (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}

const palettes = [
  {
    background: '#ffd200',
    tiles: ['#1d1d1b', '#e51f23', '#e6007b', '#005aa7', '#5ec5ee', '#f9f0de']
  },
  {
    background: '#f0ac00',
    tiles: ['#d7312e', '#f9f0de', '#0c7e45', '#2c52a0', '#f7bab6', '#5ec5ee', '#1d1d1b']
  },
  {
    background: '#084698',
    tiles: ['#f299a5', '#a0d6da', '#1a86c8', '#74afe0', '#f8f9f2']
  },
  {
    background: '#3c401d',
    tiles: ['#aebf8a', '#d971aa', '#f257a0', '#bf4974']
  }
]

function generateMap (mapData) {
  const { width, height, floor, wall, minRoomSize, maxRoomSize, roomCount } = mapData
  let map = null

  let mapFilledPercentage = 100
  let mapEscape = 0
  // While the map is more than 40% filled or we've tried 100 times
  while (mapFilledPercentage > 40 && mapEscape < 100) {
    map = new Array(height).fill(null).map(() => new Array(width).fill(wall))
    const rooms = []
    let escapeCounter = 0
    // Keep looping until we have enough rooms, the mapFilledPercentage is above 50% or we've tried 100 times
    while (rooms.length < roomCount && escapeCounter < 100) {
      // Empty the rooms array
      rooms.length = 0

      for (let i = 0; i < roomCount; i++) {
        const w = minRoomSize + Math.floor(Math.random() * (maxRoomSize - minRoomSize))
        const h = minRoomSize + Math.floor(Math.random() * (maxRoomSize - minRoomSize))
        const x = Math.floor(Math.random() * (width - w - 1)) + 1
        const y = Math.floor(Math.random() * (height - h - 1)) + 1

        const newRoom = new Room(x, y, w, h)
        let overlap = false

        for (const room of rooms) {
          if (
            newRoom.x < room.x + room.width &&
            newRoom.x + newRoom.width > room.x &&
            newRoom.y < room.y + room.height &&
            newRoom.y + newRoom.height > room.y
          ) {
            overlap = true
            break
          }
        }

        if (!overlap) {
          rooms.push(newRoom)
          for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
              map[newRoom.y + y][newRoom.x + x] = floor
            }
          }
        }
      }
      escapeCounter++
    }

    for (let i = 1; i < rooms.length; i++) {
      const prevRoomCenter = {
        x: Math.floor(rooms[i - 1].x + rooms[i - 1].width / 2),
        y: Math.floor(rooms[i - 1].y + rooms[i - 1].height / 2)
      }
      const currentRoomCenter = {
        x: Math.floor(rooms[i].x + rooms[i].width / 2),
        y: Math.floor(rooms[i].y + rooms[i].height / 2)
      }

      let x = prevRoomCenter.x
      let y = prevRoomCenter.y

      while (x !== currentRoomCenter.x || y !== currentRoomCenter.y) {
        map[y][x] = floor

        if (x < currentRoomCenter.x) {
          x++
        } else if (x > currentRoomCenter.x) {
          x--
        } else if (y < currentRoomCenter.y) {
          y++
        } else if (y > currentRoomCenter.y) {
          y--
        }
      }
    }
    // Calculate the percentage of the map that is filled
    let floorFiles = 0
    for (const row of map) {
      for (const cell of row) {
        if (cell === floor) {
          floorFiles++
        }
      }
    }

    mapFilledPercentage = Math.floor((floorFiles / (width * height)) * 100)
    mapEscape++
  }
  return map
}

//  Work out what all our features are
const makeFeatures = () => {
  features.mapData = {
    width: 30,
    height: 40,
    floor: '#',
    wall: ' ',
    minRoomSize: 3,
    maxRoomSize: 7,
    roomCount: 9
  }
  features.map = generateMap(features.mapData)

  // Pick a random palette
  features.palette = palettes[Math.floor(Math.random() * palettes.length)]
  // Now build up a long list of all the colours we'll use, about 10,000 of them
  features.colours = []
  for (let i = 0; i < 10000; i++) {
    features.colours.push(features.palette.tiles[Math.floor(Math.random() * features.palette.tiles.length)])
  }
  // And we need a pointer to the current colour
  features.colourIndex = 0
}

//  Call the above make features, so we'll have the window.$fxhashFeatures available
//  for fxhash
makeFeatures()

console.log(features)
console.table(window.$fxhashFeatures)

const init = async () => {
  //  I should add a timer to this, but really how often to people who aren't
  //  the developer resize stuff all the time. Stick it in a digital frame and
  //  have done with it!
  window.addEventListener('resize', async () => {
    //  If we do resize though, work out the new size...
    clearTimeout(resizeTmr)
    resizeTmr = setTimeout(async () => {
      await layoutCanvas()
    }, 100)
  })

  //  Now layout the canvas
  await layoutCanvas()
}

const layoutCanvas = async () => {
  const wWidth = window.innerWidth
  const wHeight = window.innerHeight

  let ratioMod = ratio
  if (ratio < 1) ratioMod = 1 / ratio

  let cWidth = wWidth
  let cHeight = cWidth * ratio
  if (cHeight > wHeight) {
    cHeight = wHeight
    cWidth = wHeight / ratio
  }
  const canvas = document.getElementById('target')
  if (highRes) {
    canvas.height = 8192
    canvas.width = 8192 / ratioMod
  } else {
    canvas.width = Math.min((8192 / 2), cWidth * 2)
    canvas.height = Math.min((8192 / ratioMod / 2), cHeight * 2)
    //  Minimum size to be half of the high rez cersion
    if (Math.min(canvas.width, canvas.height) < 8192 / 2) {
      if (canvas.width < canvas.height) {
        canvas.height = 8192 / 2
        canvas.width = 8192 / 2 / ratioMod
      } else {
        canvas.width = 8192 / 2
        canvas.height = 8192 / 2 * ratioMod
      }
    }
  }

  canvas.style.position = 'absolute'
  canvas.style.width = `${cWidth}px`
  canvas.style.height = `${cHeight}px`
  canvas.style.left = `${(wWidth - cWidth) / 2}px`
  canvas.style.top = `${(wHeight - cHeight) / 2}px`

  //  And draw it!!
  drawCanvas()
}

const drawCanvas = async () => {
  //  Let the preloader know that we've hit this function at least once
  drawn = true
  // always reset the noise pointer
  features.noisePointer = 0

  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  features.colourIndex = 0

  ctx.fillStyle = features.palette.background
  ctx.fillRect(0, 0, w, h)

  // Now we are going to draw the map, but first work out the tile width and height
  const tileWidth = w / features.mapData.width
  const tileHeight = h / features.mapData.height

  // We are going to draw some lines across the map, starting from just off the left and finishing just off to the right.
  // We are going to move down from the top to the bottom. As we draw the line across we do it via a number of points
  // those points will fall inside each tile, two points for each tile. We then draw a line between those points.
  // As we don't know how many lines down we are going to have we have to convert the y postion into a tile row so we
  // then know which row of tiles to walk across.
  // First make the number of lines down the map we are going to draw be x per tile
  const linesPerTile = 3
  const totalLines = features.mapData.height * linesPerTile
  // Make the tinyOffset be 1/4 the width of a tile
  const tinyOffset = tileWidth / 8
  ctx.lineWidth = h / 500
  // Now loop through the lines
  for (let line = 0; line < totalLines; line++) {
    // Work out what percentage down the map we are
    const linePercent = line / totalLines
    // Work out the y position of the line
    const y = linePercent * h
    const heightMod = tileHeight / 1.2 * 1
    // Work out which tile row we are in
    const tileRow = Math.floor(line / linesPerTile)
    ctx.fillStyle = features.colours[features.noisePointer++]
    ctx.strokeStyle = features.palette.background
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'lime'
    // Start the line off the left of the map
    ctx.beginPath()
    ctx.moveTo(-tinyOffset, h * 1.1)
    ctx.lineTo(-tinyOffset, y)
    // Now loop through the tiles in the row
    for (let x = 0; x < features.mapData.width; x++) {
      // grab the tile
      const tile = features.map[tileRow][x]
      // If the tile is '#' then we need to add the height of the tile to the y position
      if (tile === '#') {
        ctx.lineTo(x * tileWidth + tinyOffset, y + heightMod)
        ctx.lineTo((x + 1) * tileWidth - tinyOffset, y + heightMod)
      } else {
        ctx.lineTo(x * tileWidth + tinyOffset, y)
        ctx.lineTo((x + 1) * tileWidth - tinyOffset, y)
      }
    }
    // Finish the line off the right of the map
    ctx.lineTo(w + tinyOffset, y)
    ctx.lineTo(w + tinyOffset, h * 1.1)
    ctx.closePath()
    // Now draw the line
    ctx.fill()
    ctx.stroke()
  }

  // Now we're going to draw a grid of really fine lines over the whole thing
  ctx.strokeStyle = 'black'
  ctx.lineWidth = h / 2000
  // First across the canvas
  for (let y = 0; y < h; y += w / 500 * (h / w)) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    // ctx.stroke()
  }
  // Then down the canvas
  for (let x = 0; x < w; x += w / 250) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  // Loop through the map and draw the tiles
  /*
  for (let y = 0; y < features.mapData.height; y++) {
    for (let x = 0; x < features.mapData.width; x++) {
      // Work out the corner positions and the middle
      const tilePos = {
        tl: {
          x: x * tileWidth,
          y: y * tileHeight
        },
        tr: {
          x: (x + 1) * tileWidth,
          y: y * tileHeight
        },
        bl: {
          x: x * tileWidth,
          y: (y + 1) * tileHeight
        },
        br: {
          x: (x + 1) * tileWidth,
          y: (y + 1) * tileHeight
        },
        mid: {
          x: (x + 0.5) * tileWidth,
          y: (y + 0.5) * tileHeight
        }
      }

      //  Get the tile
      const tile = features.map[y][x]
      if (tile === '#') {
        // Set the fill colour to yellow and the stroke colour to red
        ctx.fillStyle = features.colours[features.colourIndex]
        features.colourIndex++
        if (features.colourIndex >= features.colours.length) features.colourIndex = 0
        // Now we are going to draw a # symbol in the middle of the tile, with a small margin all the way around, it needs to be a little smaller than the tile
        // about 80% with a 10% margin all around, plus we want the hash symbol to be slight italic
        // We need two vertical rectangles and two horizontal rectangles
        ctx.beginPath()
        // Left vertical rectangle
        ctx.moveTo(tilePos.tl.x + tileWidth * 0.375, tilePos.tl.y + tileHeight * 0.1)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.525, tilePos.tl.y + tileHeight * 0.1)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.325, tilePos.tl.y + tileHeight * 0.8)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.175, tilePos.tl.y + tileHeight * 0.8)
        ctx.closePath()
        // Right vertical rectangle
        ctx.moveTo(tilePos.tl.x + tileWidth * 0.675, tilePos.tl.y + tileHeight * 0.1)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.825, tilePos.tl.y + tileHeight * 0.1)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.625, tilePos.tl.y + tileHeight * 0.8)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.475, tilePos.tl.y + tileHeight * 0.8)
        ctx.closePath()
        // Top horizontal rectangle
        ctx.moveTo(tilePos.tl.x + tileWidth * 0.2, tilePos.tl.y + tileHeight * 0.3)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.9, tilePos.tl.y + tileHeight * 0.3)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.85, tilePos.tl.y + tileHeight * 0.4)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.15, tilePos.tl.y + tileHeight * 0.4)
        ctx.closePath()
        // Bottom horizontal rectangle
        ctx.moveTo(tilePos.tl.x + tileWidth * 0.15, tilePos.tl.y + tileHeight * 0.5)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.85, tilePos.tl.y + tileHeight * 0.5)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.8, tilePos.tl.y + tileHeight * 0.6)
        ctx.lineTo(tilePos.tl.x + tileWidth * 0.1, tilePos.tl.y + tileHeight * 0.6)
        ctx.closePath()

        ctx.fill()
      }
    }
  }
  */
}

const autoDownloadCanvas = async (showHash = false) => {
  const element = document.createElement('a')
  element.setAttribute('download', `fffffrfffffl_${fxhash}`)
  element.style.display = 'none'
  document.body.appendChild(element)
  let imageBlob = null
  imageBlob = await new Promise(resolve => document.getElementById('target').toBlob(resolve, 'image/png'))
  element.setAttribute('href', window.URL.createObjectURL(imageBlob, {
    type: 'image/png'
  }))
  element.click()
  document.body.removeChild(element)

  if (dumpOutputs) window.location.reload()
}

//  KEY PRESSED OF DOOM
document.addEventListener('keypress', async (e) => {
  e = e || window.event
  // Save
  if (e.key === 's') autoDownloadCanvas()

  //   Toggle highres mode
  if (e.key === 'h') {
    highRes = !highRes
    console.log('Highres mode is now', highRes)
    await layoutCanvas()
  }
})

//  This preloads the images so we can get access to them
// eslint-disable-next-line no-unused-vars
const preloadImages = () => {
  //  If paper1 has loaded and we haven't draw anything yet, then kick it all off
  if (!drawn) {
    clearInterval(preloadImagesTmr)
    init()
  }
}
