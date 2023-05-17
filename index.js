/* global preloadImagesTmr fxhash fxrand */

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
    background: '#e51531',
    tiles: [
      '#f9f0de'
    ]
  },
  {
    background: '#392b24',
    tiles: [
      '#f9f0de',
      '#e51531'
    ]
  },
  {
    background: '#392b24',
    tiles: [
      '#fab511',
      '#f9f0de'
    ]
  },
  {
    background: '#392b24',
    tiles: [
      '#f9f0de',
      '#d0bba3'
    ]
  },
  {
    background: '#392b24',
    tiles: [
      '#f9f0de',
      '#e94d26',
      '#726c5d'
    ]
  },
  {
    background: '#392b24',
    tiles: [
      '#f9f0de',
      '#e51531',
      '#2a70ae',
      '#fab511'
    ]
  },
  {
    background: '#392b24',
    tiles: [
      '#d2452b',
      '#385d32',
      '#fab511',
      '#f9f0de'
    ]
  },
  {
    background: '#1d1d1b',
    tiles: [
      '#d7312e',
      '#f9f0de',
      '#f0ac00',
      '#0c7e45',
      '#2c52a0',
      '#f7bab6',
      '#5ec5ee'
    ]
  },
  {
    background: '#1d1d1b',
    tiles: [
      '#d2b0a3',
      '#efd1ae',
      '#f39b00',
      '#ec6907',
      '#2c52a0',
      '#f9f0de'
    ]
  },
  {
    background: '#1d1d1b',
    tiles: [
      '#f9f0de',
      '#224870',
      '#d83715',
      '#f7f8e6'
    ]
  },
  {
    background: '#1d1e1b',
    tiles: [
      '#f9f0de',
      '#bc9a56',
      '#b76f30',
      '#d80f15'
    ]
  },
  {
    background: '#1d1d1b',
    tiles: [
      '#f9f0de',
      '#8e8780',
      '#fab515',
      '#d7312e',
      '#2a71af',
      '#ad7347'
    ]
  },
  {
    background: '#1d1d1b',
    tiles: [
      '#d2b0a3',
      '#ffd200',
      '#e51f23',
      '#e6007b',
      '#005aa7',
      '#5ec5ee',
      '#f9f0de'
    ]
  },
  {
    background: '#084698',
    tiles: [
      '#f299a5',
      '#1a86c8',
      '#74afe0',
      '#a0d6da',
      '#f8f9f2'
    ]
  },
  {
    background: '#412147',
    tiles: [
      '#7b2776',
      '#bb2a17',
      '#e94e23',
      '#f49700',
      '#bd8b5f',
      '#f9f0de'
    ]
  },
  {
    background: '#1d1d1b',
    tiles: [
      '#2760ab',
      '#f6bcd2',
      '#e73d1f',
      '#ffcf00',
      '#f9f0de'
    ]
  },
  {
    background: '#f08b00',
    tiles: [
      '#efe7d3',
      '#e9cda9',
      '#4972b7',
      '#e63212',
      '#f29591'
    ]
  },
  {
    background: '#2b292b',
    tiles: [
      '#786e66',
      '#3f3e3a',
      '#cac6c3',
      '#afa69e'
    ]
  },
  {
    background: '#201c1d',
    tiles: [
      '#f2f5ee',
      '#e0ddd8',
      '#dc3638',
      '#757472'
    ]
  },
  {
    background: '#2d3c1f',
    tiles: [
      '#a6243c',
      '#f21d56',
      '#f2bf27',
      '#f29422'
    ]
  },
  {
    background: '#140f0c',
    tiles: [
      '#29361b',
      '#f39233',
      '#f3e3d6',
      '#cc3314'
    ]
  },
  {
    background: '#112233',
    tiles: [
      '#adabae',
      '#16474a',
      '#133536',
      '#c26646'
    ]
  },
  {
    background: '#0c0c0e',
    tiles: [
      '#837560',
      '#e28a27',
      '#9d5d24',
      '#f8fdfe'
    ]
  },
  {
    background: '#2f2a26',
    tiles: [
      '#fffeff',
      '#a58c68',
      '#8c847a',
      '#df3f36'
    ]
  },
  {
    background: '#4e5925',
    tiles: [
      '#4b7ba6',
      '#f2b138',
      '#f2e8dc',
      '#f25749'
    ]
  },
  {
    background: '#0d0d0d',
    tiles: [
      '#f0eee2',
      '#a18a6b',
      '#61574e',
      '#3f3f3d'
    ]
  },
  {
    background: '#0e0e0e',
    tiles: [
      '#c20a29',
      '#d6a4b5',
      '#0d1e5a',
      '#023f36'
    ]
  },
  {
    background: '#592f56',
    tiles: [
      '#bf0326',
      '#f2d441',
      '#f2eadc',
      '#bf775d'
    ]
  },
  {
    background: '#8b3305',
    tiles: [
      '#d9831a',
      '#9f724b',
      '#ece3de',
      '#cf9071'
    ]
  },
  {
    background: '#143c21',
    tiles: [
      '#dfd4cb',
      '#816c4b',
      '#e0a7b8',
      '#f8623b'
    ]
  },
  {
    background: '#04504e',
    tiles: [
      '#281740',
      '#f29d35',
      '#f27405',
      '#f24c3d'
    ]
  },
  {
    background: '#1a1921',
    tiles: [
      '#cd2525',
      '#c04483',
      '#2d8579',
      '#ddd8d4'
    ]
  },
  {
    background: '#415237',
    tiles: [
      '#eecb05',
      '#cb9d56',
      '#fffbff',
      '#f22a13'
    ]
  },
  {
    background: '#50566c',
    tiles: [
      '#eaddcd',
      '#e0c694',
      '#7d8f9c',
      '#dbb48d'
    ]
  },
  {
    background: '#325952',
    tiles: [
      '#517369',
      '#91caaf',
      '#838c7d',
      '#9ca692'
    ]
  },
  {
    background: '#5c7346',
    tiles: [
      '#d1d2aa',
      '#eeaf24',
      '#d9771e',
      '#d7481e'
    ]
  },
  {
    background: '#133536',
    tiles: [
      '#e7cfdf',
      '#adabae',
      '#16474a',
      '#c26646'
    ]
  },
  {
    background: '#b87332',
    tiles: [
      '#ee9b0f',
      '#ff7518',
      '#fe8c68',
      '#ff5001'
    ]
  },
  {
    background: '#65136c',
    tiles: [
      '#f66689',
      '#f22e0e',
      '#00a75e',
      '#d7d7d7'
    ]
  },
  {
    background: '#f2cb05',
    tiles: [
      '#d9d7bf',
      '#f2b705',
      '#f29f05',
      '#f27405'
    ]
  },
  {
    background: '#35342e',
    tiles: [
      '#f2ede9',
      '#fddbd2',
      '#b2b3ad',
      '#bd887a'
    ]
  },
  {
    background: '#401323',
    tiles: [
      '#6a2e43',
      '#8c3a60',
      '#a65866',
      '#d9a7b0'
    ]
  },
  {
    background: '#380140',
    tiles: [
      '#a60a33',
      '#a61c5c',
      '#f27329',
      '#d91604'
    ]
  },
  {
    background: '#be9820',
    tiles: [
      '#06c2ec',
      '#f0d10b',
      '#f15a38',
      '#f1f1f0'
    ]
  },
  {
    background: '#e1adb9',
    tiles: [
      '#fdc9a4',
      '#f5b1a6',
      '#eca6a8',
      '#d0bfd7'
    ]
  },
  {
    background: '#7d8846',
    tiles: [
      '#ead8c4',
      '#bb9e40',
      '#ce906b',
      '#c3c7a6'
    ]
  },
  {
    background: '#1c2137',
    tiles: [
      '#284555',
      '#de4639',
      '#db6528',
      '#f5ad0d'
    ]
  },
  {
    background: '#3c401d',
    tiles: [
      '#bf4974',
      '#f257a0',
      '#d971aa',
      '#aebf8a'
    ]
  },
  {
    background: '#000000',
    tiles: [
      '#FF00D0',
      '#8101D7',
      '#04D1FF',
      '#03FFEA'
    ]
  },
  {
    background: '#008C4E',
    tiles: [
      '#25AFE7',
      '#024DC0',
      '#EE4B86',
      '#AF1303',
      '#E19401'
    ]
  }
]

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
    floorSizes: [22, 32, 40, 44, 46, 46, 44, 40, 32, 22],
    minRoomSizes: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    maxRoomSizes: [4, 6, 8, 10, 12, 12, 10, 8, 6, 4],
    roomCounts: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
  }
  features.extendLineDownChance = 0.01
  features.currentFloor = -1

  // Pick a random palette
  features.palette = palettes[Math.floor(fxrand() * palettes.length)]
  features.backgroundColour = '#333'
  if (fxrand() < 0.333) {
    features.backgroundColour = features.palette.background
    // Sometimes we'll swap the background colour for one of the other colours in the palette
    if (fxrand() < 0.25) {
      const oldBackground = features.backgroundColour
      // randomly remove a colour from the palette and store is in newBackground
      const newBackground = features.palette.tiles.splice(Math.floor(fxrand() * features.palette.tiles.length), 1)[0]
      // Add the old background colour back into the palette
      features.palette.tiles.push(oldBackground)
      features.backgroundColour = newBackground
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

  ctx.fillStyle = features.backgroundColour
  ctx.fillRect(0, 0, w, h)

  ctx.lineWidth = w / 400
  // Set the origin to the center of the canvas
  ctx.save()
  ctx.translate(w / 2, h / 2)

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

  let mapIndex = 0
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

      const topColour = hexToHsl(map.data.floorColour)
      const skewAngle = Math.atan2(corners.tl.y - corners.tr.y, corners.tl.x - corners.tr.x)
      ctx.lineWidth = w / 200
      ctx.lineCap = 'round'
      ctx.strokeStyle = `hsla(${topColour.h}, ${topColour.s}%, ${topColour.l}%, 0.333)`

      // Now check to check to see if the corners have any instructions
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

      ctx.fillStyle = `hsl(${topColour.h}, ${topColour.s}%, ${topColour.l}%, 0.333)`
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
      // Draw the top of the room
      ctx.fillStyle = `hsla(${topColour.h}, ${topColour.s}%, ${topColour.l}%)`
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      ctx.moveTo(corners.tl.x, corners.tl.y)
      ctx.lineTo(corners.tr.x, corners.tr.y)
      ctx.lineTo(corners.br.x, corners.br.y)
      ctx.lineTo(corners.bl.x, corners.bl.y)
      ctx.lineTo(corners.tl.x, corners.tl.y)
      // ctx.stroke()
      ctx.fill()

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
      const rightFaceTop = `hsla(${topColour.h}, ${topColour.s}%, ${topColour.l}%, 0.5)`
      const rightFaceBottom = `hsla(${topColour.h}, ${topColour.s}%, ${topColour.l}%, 0.0)`
      // Now make a gradient
      const rightFaceGrad = ctx.createLinearGradient(0, 0, 0, sideHeight)
      rightFaceGrad.addColorStop(0, rightFaceTop)
      rightFaceGrad.addColorStop(1, rightFaceBottom)

      // Shear the canvas by the angle
      ctx.save()
      ctx.transform(1, Math.tan(-skewAngle), 0, 1, 0, 0)
      // Now draw the rectangle
      ctx.fillStyle = rightFaceGrad
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(corners.tr.x - corners.br.x, 0)
      ctx.lineTo(corners.tr.x - corners.br.x, sideHeight)
      ctx.lineTo(0, sideHeight)
      ctx.lineTo(0, 0)
      ctx.fill()
      // ctx.stroke()
      ctx.restore()

      // Now do the same for the left side
      const leftFaceTop = `hsla(${topColour.h}, ${topColour.s}%, ${topColour.l}%, 0.5)`
      const leftFaceBottom = `hsla(${topColour.h}, ${topColour.s}%, ${topColour.l}%, 0.0)`
      // Now make a gradient
      const leftFaceGrad = ctx.createLinearGradient(corners.bl.x - corners.br.x, 0, corners.bl.x - corners.br.x, sideHeight)
      leftFaceGrad.addColorStop(0, leftFaceTop)
      leftFaceGrad.addColorStop(1, leftFaceBottom)

      // Shear the canvas by the angle
      ctx.save()
      ctx.transform(1, Math.tan(skewAngle), 0, 1, 0, 0)
      // Now draw the rectangle
      ctx.fillStyle = leftFaceGrad
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      ctx.moveTo(corners.bl.x - corners.br.x, 0)
      ctx.lineTo(0, 0)
      ctx.lineTo(0, sideHeight)
      ctx.lineTo(corners.bl.x - corners.br.x, sideHeight)
      ctx.lineTo(corners.bl.x - corners.br.x, 0)
      ctx.fill()
      // ctx.stroke()
      ctx.restore()
      ctx.restore()
    }
    // Move up to the next floor
    floor--
    mapIndex++
  }

  // Restore the origin to 0,0
  ctx.restore()
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
