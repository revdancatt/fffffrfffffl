/* global preloadImagesTmr fxhash fxrand noise */

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
const dumpOutputs = true

window.$fxhashFeatures = {}

// A function to convert a hex colour to a hsl colour
function hexToHsl (hex) {
  // Convert hex to RGB first
  let r = 0; let g = 0; let b = 0
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1]
    g = '0x' + hex[2] + hex[2]
    b = '0x' + hex[3] + hex[3]
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2]
    g = '0x' + hex[3] + hex[4]
    b = '0x' + hex[5] + hex[6]
  }
  // Then to HSL
  r /= 255
  g /= 255
  b /= 255
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0

  if (delta === 0) { h = 0 } else if (cmax === r) { h = ((g - b) / delta) % 6 } else if (cmax === g) { h = (b - r) / delta + 2 } else { h = (r - g) / delta + 4 }

  h = Math.round(h * 60)

  if (h < 0) { h += 360 }

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return { h, s, l }
}

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
    tiles: [
      '#000000'
    ]
  },
  {
    tiles: [
      '#FFFFFF'
    ]
  }
]

const backgrounds = ['#e8b400', '#ed600b', '#f69a99', '#9d7ad2', '#28b2ca', '#24bc94']

function generateMap (mapData) {
  const { width, height, floor, wall, minRoomSize, maxRoomSize, roomCount } = mapData
  let map = null

  let mapFilledPercentage = 100
  let mapEscape = 0
  let rooms = []
  // While the map is more than 40% filled or we've tried 100 times
  while (mapFilledPercentage > 40 && mapEscape < 100) {
    map = new Array(height).fill(null).map(() => new Array(width).fill(wall))
    rooms = []
    let escapeCounter = 0
    // Keep looping until we have enough rooms, the mapFilledPercentage is above 50% or we've tried 100 times
    while (rooms.length < roomCount && escapeCounter < 100) {
      // Empty the rooms array
      rooms.length = 0

      for (let i = 0; i < roomCount; i++) {
        const w = minRoomSize + Math.floor(fxrand() * (maxRoomSize - minRoomSize))
        const h = minRoomSize + Math.floor(fxrand() * (maxRoomSize - minRoomSize))
        const x = Math.floor(fxrand() * (width - w - 1)) + 1
        const y = Math.floor(fxrand() * (height - h - 1)) + 1

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
  const finalMap = {
    map,
    rooms,
    data: mapData
  }
  return finalMap
}

//  Work out what all our features are
const makeFeatures = () => {
  features.mapSize = {
    width: 48,
    height: 48,
    floorSizes: [12, 22, 32, 40, 44, 46, 46, 44, 40, 32, 22, 12],
    minRoomSizes: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    maxRoomSizes: [3, 4, 6, 8, 10, 12, 12, 10, 8, 6, 4, 3],
    roomCounts: [7, 9, 10, 11, 12, 12, 12, 12, 11, 10, 9, 7]
  }
  features.extendLineDownChance = 0.01
  features.currentFloor = -1
  features.mode = 0
  features.showCorridors = true

  // Pick a random palette
  features.palette = palettes[Math.floor(fxrand() * palettes.length)]
  features.palette = palettes[1]
  features.backgroundColour = '#333'
  features.backgroundMode = 'flat'
  const firstColour = backgrounds[Math.floor(fxrand() * backgrounds.length)]
  let secondColour = backgrounds[Math.floor(fxrand() * backgrounds.length)]
  // Make sure the second colour isn't the same as the first
  while (secondColour === firstColour) {
    secondColour = backgrounds[Math.floor(fxrand() * backgrounds.length)]
  }
  features.firstColour = firstColour
  features.secondColour = secondColour

  if (fxrand() < 0.666) {
    features.palette = palettes[0]
    features.backgroundColour = features.palette.background
    // Going to do something with the background colour here instead
    features.backgroundColour = backgrounds[Math.floor(fxrand() * backgrounds.length)]
    features.backgroundMode = 'coloured'
    // Sometimes it'll be a gradient from one colour to another
    if (fxrand() < 0.5) {
      features.backgroundMode = 'gradient'
      // There is also a chance we'll add a "sun glow" to the background
      if (fxrand() < 0.2) features.sunGlow = true
    }
    // Sometimes we'll swap the background colour for one of the other colours in the palette
    // Change my mind, we'll NEVER do this :D
    /*
    if (fxrand() < 0.25) {
      const oldBackground = features.backgroundColour
      // randomly remove a colour from the palette and store is in newBackground
      const newBackground = features.palette.tiles.splice(Math.floor(fxrand() * features.palette.tiles.length), 1)[0]
      // Add the old background colour back into the palette
      features.palette.tiles.push(oldBackground)
      features.backgroundColour = newBackground
    }
    */
  }
  features.showPixels = fxrand() < 0.5

  // Make some pixels in the background
  features.pixels = {
    across: Math.floor(fxrand() * 40) + 20
  }
  features.pixels.down = Math.floor(features.pixels.across * ratio)
  const pNoiseOffset = fxrand() * 4000 + 2000
  const pNoiseScale = 0.8
  features.pixels.data = {}
  for (let x = 0; x < features.pixels.across; x++) {
    for (let y = 0; y < features.pixels.down; y++) {
      const index = `${x},${y}`
      let n = (noise.perlin2(x * pNoiseScale + pNoiseOffset, y * pNoiseScale + pNoiseOffset) + 1) / 2
      // We want to calculate the absolute distance the y value is from have the down value, as a percentage
      const yDist = Math.abs(y - features.pixels.down / 2) / (features.pixels.down / 2)
      // We want to calculate the absolute distance the x value is from have the across value, as a percentage
      const xDist = Math.abs(x - features.pixels.across / 2) / (features.pixels.across / 2)
      n = n * yDist / xDist
      if (fxrand() < n) {
        features.pixels.data[index] = {
          x,
          y
        }
      }
    }
  }

  features.maps = []
  // Loop through the floor sizes and generate a map for each
  for (let i = 0; i < features.mapSize.floorSizes.length; i++) {
    features.maps.push(generateMap({
      width: features.mapSize.floorSizes[i],
      height: features.mapSize.floorSizes[i],
      floor: '#',
      wall: ' ',
      minRoomSize: features.mapSize.minRoomSizes[i],
      maxRoomSize: features.mapSize.maxRoomSizes[i],
      roomCount: features.mapSize.roomCounts[i],
      floorColour: features.palette.tiles[Math.floor(fxrand() * features.palette.tiles.length)]
    }))
  }
  // Now build up a long list of all the colours we'll use, about 10,000 of them
  features.colours = []
  for (let i = 0; i < 10000; i++) {
    features.colours.push(features.palette.tiles[Math.floor(fxrand() * features.palette.tiles.length)])
  }

  // Now that we have made all the "floors" we need to go through them all fitting them into
  // the middle of the full sized map. So if our full sized map is 48x48 and our first floor
  // is 22x22 then we need to put it at 13,13. If our next floor is 32x32 then we need to
  // put it at 8,8. So we need loop through the floors and make a new map that is 48x48 and
  // then copy the floor into the middle of it.
  for (let i = 0; i < features.maps.length; i++) {
    const map = features.maps[i].map
    const mapSize = features.mapSize.floorSizes[i]
    const newMap = []
    for (let y = 0; y < features.mapSize.height; y++) {
      newMap.push([])
      for (let x = 0; x < features.mapSize.width; x++) {
        newMap[y].push(' ')
      }
    }
    const xOffset = Math.floor((features.mapSize.width - mapSize) / 2)
    const yOffset = Math.floor((features.mapSize.height - mapSize) / 2)
    for (let y = 0; y < mapSize; y++) {
      for (let x = 0; x < mapSize; x++) {
        newMap[y + yOffset][x + xOffset] = map[y][x]
      }
    }
    // We also need to update the rooms to reflect the new position
    for (let j = 0; j < features.maps[i].rooms.length; j++) {
      features.maps[i].rooms[j].x += xOffset
      features.maps[i].rooms[j].y += yOffset
    }
    features.maps[i].map = newMap
  }

  // Now we need to sort the rooms by x and y so that we can draw them in the right order
  for (let i = 0; i < features.maps.length; i++) {
    features.maps[i].rooms.sort((a, b) => {
      if (a.x + a.y < b.x + b.y) {
        return -1
      }
      return 0
    })
  }
  // Now we need to go through each room on each floor, to see if the corner matches
  // the corner of another room on a floor below it. If it does then we need to
  // add a line between the two, we'll have an entry for each corner that describes
  // what happens
  // First loop through each floor, except the last one
  for (let i = 0; i < features.maps.length - 1; i++) {
    // Now loop through each room on this floor
    for (let j = 0; j < features.maps[i].rooms.length; j++) {
      // Add a corners object to each room
      const thisRoom = features.maps[i].rooms[j]
      thisRoom.corners = {
        tl: [],
        tlDecoration: [],
        tr: [],
        trDecoration: [],
        bl: [],
        blDecoration: [],
        br: [],
        brDecoration: []
      }
      // Now we string together instructions for each corner
      const cornerNames = ['tl', 'tr', 'bl', 'br']
      for (const cornerName of cornerNames) {
        // Work out if we are going to do anything with this corner
        let cornerDoChance = 0.2
        let doneFirstPick = false
        while (fxrand() < cornerDoChance) {
          const validDirections = ['up', 'down', 'ne', 'nw', 'se', 'sw', 'ne', 'nw', 'se', 'sw', 'ne', 'nw', 'se', 'sw']
          // If the current corner is empty, then remove the 'up' direction
          if (thisRoom.corners[cornerName].length === 0) {
            validDirections.splice(validDirections.indexOf('up'), 1)
          } else {
            // grab the most recent direction
            const lastDirection = thisRoom.corners[cornerName][thisRoom.corners[cornerName].length - 1]
            // Remove the opposite direction, so we can't go back on ourselves
            // do this three times
            for (let i = 0; i <= 6; i++) {
              if (lastDirection === 'up') validDirections.splice(validDirections.indexOf('down'), 1)
              if (lastDirection === 'down') validDirections.splice(validDirections.indexOf('up'), 1)
              if (lastDirection === 'ne') validDirections.splice(validDirections.indexOf('sw'), 1)
              if (lastDirection === 'nw') validDirections.splice(validDirections.indexOf('se'), 1)
              if (lastDirection === 'se') validDirections.splice(validDirections.indexOf('nw'), 1)
              if (lastDirection === 'sw') validDirections.splice(validDirections.indexOf('ne'), 1)
            }
          }
          // Pick a random direction
          const direction = validDirections[Math.floor(fxrand() * validDirections.length)]
          // const direction = 'ne'
          thisRoom.corners[cornerName].push(direction)
          // Maybe add a decoration, but not on the first pass
          if (!doneFirstPick) {
            thisRoom.corners[`${cornerName}Decoration`].push(null)
          } else {
            if (fxrand() < 0.5) {
              thisRoom.corners[`${cornerName}Decoration`].push(null)
            } else {
              thisRoom.corners[`${cornerName}Decoration`].push('ball')
            }
          }
          // If this is the first run, then we increase the chance of doing something
          // otherwise we decrease it
          if (!doneFirstPick) {
            cornerDoChance = 0.9
            doneFirstPick = true
          } else {
            cornerDoChance *= 1
          }
        }
      }
    }
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

  // During this whole thing we may do things differently depending on the mode
  ctx.fillStyle = '#333'
  if (features.backgroundMode === 'coloured') ctx.fillStyle = features.backgroundColour
  if (features.backgroundMode === 'gradient') {
    const grd = ctx.createLinearGradient(0, 0, 0, h)
    grd.addColorStop(0, features.firstColour)
    grd.addColorStop(1, features.secondColour)
    ctx.fillStyle = grd
  }
  ctx.fillRect(0, 0, w, h)

  // Set the origin to the center of the canvas
  ctx.save()
  ctx.translate(w / 2, h / 2)

  if (features.sunGlow) {
    // Now I want to save the canvas again, scale it down vertically, grab a radial gradient
    // and then restore the canvas to the original size
    ctx.save()
    ctx.scale(1, 2)
    // Make a white to black radial gradient
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, w / 2)
    grd.addColorStop(0, 'rgba(255,255,255,0.9)')
    grd.addColorStop(0.2, 'rgba(255,255,255,0.8)')
    grd.addColorStop(1, 'rgba(0,0,0,0.8)')
    ctx.fillStyle = grd
    // make the composite operation "screen"
    ctx.globalCompositeOperation = 'screen'
    ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.restore()
  }
  // turn the composite operation back to normal
  ctx.globalCompositeOperation = 'source-over'

  if (features.showPixels) {
    // Now we need to draw the pixels in the background
    // So we'll work out the pixel size, and then loop through the pixels
    // remembering to take into account we are now in the center of the canvas
    const pixelSize = w / features.pixels.across
    const halfMapWidth = w / 2
    const halfMapHeight = h / 2
    // I want to create a linear gradient for the pixels
    // That goes from the bottom to the top of the canvas
    // remember we are in the center of the canvas
    const grd = ctx.createLinearGradient(0, h / 2, 0, -h)
    grd.addColorStop(0, features.firstColour)
    grd.addColorStop(1, features.secondColour)
    ctx.fillStyle = grd
    // Loop through the pixels
    Object.entries(features.pixels.data).forEach(([key, pixel]) => {
      // We need to work out the x and y position of the pixel
      const x = pixel.x * pixelSize - halfMapWidth
      const y = pixel.y * pixelSize - halfMapHeight
      // Calculate the y distance from 0 as a percentage of half the height of the canvas
      const yDist = Math.abs(y) / halfMapHeight
      const pixelMod = 0.15 * yDist
      const pixelBorder = (pixelSize - (pixelSize * pixelMod)) / 2
      ctx.fillRect(x + pixelBorder, y + pixelBorder, pixelSize * pixelMod, pixelSize * pixelMod)
    })
  }

  // We need to work out how much we're going to offset the map by, the size of the map
  // is the width of the canvas divided by features.mapData.width / 2
  const tileSize = w / features.mapSize.width * 0.71
  const mapOffset = -(tileSize * features.mapSize.width / 4)

  // Loop through the maps
  // We are also going to keep track of the "floor" of the map, so we can draw the, we'll start
  // at the bottom and work up
  const floors = features.maps.length - 1
  const floorOffset = w / (features.mapSize.floorSizes.length - 1) * 0.9
  let floor = floors - 1

  for (const map of features.maps) {
    // If the features.currentFloor is different to -1, then we only want to draw that floor
    // otherwise we'll draw all of them
    if (features.currentFloor !== -1 && features.currentFloor !== floor + 1) {
      floor--
      continue
    }
    const thisFloorOffset = floorOffset * (floor - 0.5 - (floors / 2))

    // Loop through the rooms and draw them
    for (const room of map.rooms) {
      const corners = {
        tl: {
          x: room.x * tileSize + mapOffset,
          y: room.y * tileSize + mapOffset
        },
        tr: {
          x: (room.x + room.width) * tileSize + mapOffset,
          y: room.y * tileSize + mapOffset
        },
        bl: {
          x: room.x * tileSize + mapOffset,
          y: (room.y + room.height) * tileSize + mapOffset
        },
        br: {
          x: (room.x + room.width) * tileSize + mapOffset,
          y: (room.y + room.height) * tileSize + mapOffset
        }
      }
      // Rotate all the points 45 degrees
      const angle = Math.PI / 4
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      // Rotate the top left
      corners.tl = {
        x: corners.tl.x * cos - corners.tl.y * sin,
        y: corners.tl.x * sin + corners.tl.y * cos
      }
      // Rotate the top right
      corners.tr = {
        x: corners.tr.x * cos - corners.tr.y * sin,
        y: corners.tr.x * sin + corners.tr.y * cos
      }
      // Rotate the bottom left
      corners.bl = {
        x: corners.bl.x * cos - corners.bl.y * sin,
        y: corners.bl.x * sin + corners.bl.y * cos
      }
      // Rotate the bottom right
      corners.br = {
        x: corners.br.x * cos - corners.br.y * sin,
        y: corners.br.x * sin + corners.br.y * cos
      }
      // Squash the room to make it look more isometric, by dividing the y by 2
      corners.tl.y /= 2
      corners.tr.y /= 2
      corners.bl.y /= 2
      corners.br.y /= 2
      // Now move by the floor offset
      corners.tl.y += thisFloorOffset
      corners.tr.y += thisFloorOffset
      corners.bl.y += thisFloorOffset
      corners.br.y += thisFloorOffset

      let floorColour = hexToHsl(map.data.floorColour)
      if (features.mode === 1) floorColour = hexToHsl('#FFFFFF')
      const skewAngle = Math.atan2(corners.tl.y - corners.tr.y, corners.tl.x - corners.tr.x)

      if (features.showCorridors && (features.mode === 0 || features.mode > 5)) {
        // Now check to check to see if the corners have any instructions
        ctx.lineWidth = w / 200
        ctx.lineCap = 'round'
        ctx.strokeStyle = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%, 0.333)`
        if (room.corners) {
          // Do the top left corner
          const cornerNames = ['tl', 'tr', 'bl', 'br']
          // const cornerNames = ['tr']
          for (const cornerName of cornerNames) {
            if (room.corners[cornerName].length) {
              // save the context of the canvas
              ctx.save()
              // Move the origin to the top left corner
              ctx.translate(corners[cornerName].x, corners[cornerName].y)
              // Now draw a thin rectangle that extends slightly to the right
              ctx.beginPath()
              const oldPoint = { x: 0, y: 0 }
              // If we are the tl corner, then move the start point a bit
              if (cornerName === 'tl') oldPoint.y += tileSize / 2
              if (cornerName === 'br') oldPoint.y -= tileSize / 2
              if (cornerName === 'tr') oldPoint.x -= tileSize
              if (cornerName === 'bl') oldPoint.x += tileSize

              ctx.moveTo(oldPoint.x, oldPoint.y)
              // Now loop through the instructions
              for (const instruction of room.corners[cornerName]) {
                // Now draw the line
                if (instruction === 'down') {
                  oldPoint.y += floorOffset / 2
                }
                if (instruction === 'up') {
                  oldPoint.y -= floorOffset / 2
                }
                if (instruction === 'ne') {
                  oldPoint.x += tileSize * 2
                  oldPoint.y -= tileSize
                }
                if (instruction === 'se') {
                  oldPoint.x += tileSize * 2
                  oldPoint.y += tileSize
                }
                if (instruction === 'nw') {
                  oldPoint.x -= tileSize * 2
                  oldPoint.y -= tileSize
                }
                if (instruction === 'sw') {
                  oldPoint.x -= tileSize * 2
                  oldPoint.y += tileSize
                }
                ctx.lineTo(oldPoint.x, oldPoint.y)
              }
              ctx.stroke()
              ctx.restore()
            }
          }
        }

        // Now we're going to go through the line again, this time adding decorations

        ctx.fillStyle = `hsl(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%, 0.333)`
        if (room.corners) {
          // Do the top left corner
          const cornerNames = ['tl', 'tr', 'bl', 'br']
          // const cornerNames = ['tr']
          for (const cornerName of cornerNames) {
            if (room.corners[cornerName].length) {
              // save the context of the canvas
              ctx.save()
              // Move the origin to the top left corner
              ctx.translate(corners[cornerName].x, corners[cornerName].y)
              const oldPoint = { x: 0, y: 0 }
              // If we are the tl corner, then move the start point a bit
              if (cornerName === 'tl') oldPoint.y += tileSize / 2
              if (cornerName === 'br') oldPoint.y -= tileSize / 2
              if (cornerName === 'tr') oldPoint.x -= tileSize
              if (cornerName === 'bl') oldPoint.x += tileSize

              // Now loop through the instructions
              let decorationIndex = 0
              for (const instruction of room.corners[cornerName]) {
                if (instruction === 'down') {
                  oldPoint.y += floorOffset / 2
                }
                if (instruction === 'up') {
                  oldPoint.y -= floorOffset / 2
                }
                if (instruction === 'ne') {
                  oldPoint.x += tileSize * 2
                  oldPoint.y -= tileSize
                }
                if (instruction === 'se') {
                  oldPoint.x += tileSize * 2
                  oldPoint.y += tileSize
                }
                if (instruction === 'nw') {
                  oldPoint.x -= tileSize * 2
                  oldPoint.y -= tileSize
                }
                if (instruction === 'sw') {
                  oldPoint.x -= tileSize * 2
                  oldPoint.y += tileSize
                }
                decorationIndex++
                // If we have a decoration, then draw it
                if (room.corners[`${cornerName}Decoration`][decorationIndex]) {
                  // Draw a circle
                  ctx.beginPath()
                  ctx.arc(oldPoint.x, oldPoint.y, tileSize / 2, 0, 2 * Math.PI)
                  ctx.fill()
                }
              }
              ctx.restore()
            }
          }
        }
      }

      // Draw the top of the room
      ctx.fillStyle = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%)`
      ctx.strokeStyle = 'black'
      ctx.lineWidth = w / 400
      ctx.beginPath()
      ctx.moveTo(corners.tl.x, corners.tl.y)
      ctx.lineTo(corners.tr.x, corners.tr.y)
      ctx.lineTo(corners.br.x, corners.br.y)
      ctx.lineTo(corners.bl.x, corners.bl.y)
      ctx.lineTo(corners.tl.x, corners.tl.y)
      if (features.mode >= 1 && features.mode <= 3) ctx.stroke()
      ctx.fill()

      if (features.mode === 0 || features.mode >= 3) {
        // Now draw the sides, the height of the room is half the floorOffset
        const sideHeight = floorOffset / 2
        // Draw the first side
        // Now we want to make a rectangle that is filled with that gradient from the corners br, tr, br + sideHeight, tr + sideHeight
        // to do this we need to make a normal rectangle that is the x distance from the x value of br and tr, but we need to skew
        // the canvas to make it look like it's at an angle
        // We need to skew the canvas by the angle of the room, which is the angle of the top left corner
        ctx.save()
        ctx.translate(corners.br.x, corners.br.y)

        // We want to make a gradient of the side colour, from a darker version of the top colour to an even darker version
        // of the top colour
        let rightFaceTop = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%, 0.5)`
        let rightFaceBottom = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%, 0.0)`
        if (features.mode === 5 || features.mode === 6) {
          rightFaceTop = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l * 0.8}%, 1)`
          rightFaceBottom = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l * 0.2}%, 1)`
        }
        // Now make a gradient
        const rightFaceGrad = ctx.createLinearGradient(0, 0, 0, sideHeight)
        rightFaceGrad.addColorStop(0, rightFaceTop)
        rightFaceGrad.addColorStop(1, rightFaceBottom)

        // Shear the canvas by the angle
        ctx.save()
        ctx.transform(1, Math.tan(-skewAngle), 0, 1, 0, 0)
        // Now draw the rectangle
        ctx.fillStyle = rightFaceGrad
        if (features.mode === 3) ctx.fillStyle = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%, 1)`
        if (features.mode === 4) ctx.fillStyle = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l * 0.9}%, 1)`
        ctx.strokeStyle = 'black'
        ctx.lineWidth = w / 400
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(corners.tr.x - corners.br.x, 0)
        ctx.lineTo(corners.tr.x - corners.br.x, sideHeight)
        ctx.lineTo(0, sideHeight)
        ctx.lineTo(0, 0)
        ctx.fill()
        if (features.mode === 3) ctx.stroke()
        ctx.restore()

        // Now do the same for the left side
        let leftFaceTop = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%, 0.5)`
        let leftFaceBottom = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%, 0.0)`
        if (features.mode === 5 || features.mode === 6) {
          leftFaceTop = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l * 0.8 * 0.8}%, 1)`
          leftFaceBottom = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l * 0.2 * 0.8}%, 1)`
        }

        // Now make a gradient
        const leftFaceGrad = ctx.createLinearGradient(corners.bl.x - corners.br.x, 0, corners.bl.x - corners.br.x, sideHeight)
        leftFaceGrad.addColorStop(0, leftFaceTop)
        leftFaceGrad.addColorStop(1, leftFaceBottom)

        // Shear the canvas by the angle
        ctx.save()
        ctx.transform(1, Math.tan(skewAngle), 0, 1, 0, 0)
        // Now draw the rectangle
        ctx.fillStyle = leftFaceGrad
        if (features.mode === 3) ctx.fillStyle = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%, 1)`
        if (features.mode === 4) ctx.fillStyle = `hsla(${floorColour.h}, ${floorColour.s}%, ${floorColour.l * 0.8}%, 1)`
        ctx.strokeStyle = 'black'
        ctx.lineWidth = w / 400
        ctx.beginPath()
        ctx.moveTo(corners.bl.x - corners.br.x, 0)
        ctx.lineTo(0, 0)
        ctx.lineTo(0, sideHeight)
        ctx.lineTo(corners.bl.x - corners.br.x, sideHeight)
        ctx.lineTo(corners.bl.x - corners.br.x, 0)
        ctx.fill()
        if (features.mode === 3) ctx.stroke()
        ctx.restore()
        ctx.restore()
      }
    }
    // Move up to the next floor
    floor--
  }

  // Restore the origin to 0,0
  ctx.restore()

  // If we are dumping outputs, then we want to download the image
  if (dumpOutputs) {
    await autoDownloadCanvas()
    window.location.reload()
  }
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

  // Toggle a floor
  if (e.key === 'f') {
    features.currentFloor--
    // If we've gone past the end of the maps, then reset to -1
    if (features.currentFloor < -1) features.currentFloor = features.maps.length - 1
    console.log('Current map is now', features.currentFloor)
    await layoutCanvas()
  }

  // If the user presses the [] or ,. arrow keys, change the current floor
  if (e.key === ']' || e.key === '.') {
    features.currentFloor--
    // If we've gone past the end of the maps, then reset to -1
    if (features.currentFloor < -1) features.currentFloor = features.maps.length - 1
    console.log('Current map is now', features.currentFloor)
    await layoutCanvas()
  }
  if (e.key === '[' || e.key === ',') {
    features.currentFloor++
    // If we've gone past the end of the maps, then reset to -1
    if (features.currentFloor > features.maps.length - 1) features.currentFloor = -1
    console.log('Current map is now', features.currentFloor)
    await layoutCanvas()
  }

  // Change the mode
  if (e.key === 'm') {
    features.mode++
    if (features.mode > 7) features.mode = 0
    console.log('Mode is now', features.mode)
    await layoutCanvas()
  }

  // If the user presses the keys 1-7 or 0 change the mode to be that value
  if (['0', '1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
    features.mode = parseInt(e.key)
    console.log('Mode is now', features.mode)
    await layoutCanvas()
  }

  // Toggle corridors
  if (e.key === 'c') {
    features.showCorridors = !features.showCorridors
    console.log('Corridors are now', features.showCorridors)
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
