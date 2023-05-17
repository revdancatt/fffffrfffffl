const fs = require('fs')

const WIDTH = 30
const HEIGHT = 40
const FLOOR = '#'
const WALL = ' '
const MIN_ROOM_SIZE = 4
const MAX_ROOM_SIZE = 8
const ROOM_COUNT = 5

class Room {
  constructor (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}

function generateMap () {
  let map = null

  let mapFilledPercentage = 100
  let mapEscape = 0
  // While the map is more than 40% filled or we've tried 100 times
  while (mapFilledPercentage > 40 && mapEscape < 100) {
    map = new Array(HEIGHT).fill(null).map(() => new Array(WIDTH).fill(WALL))
    const rooms = []
    let escapeCounter = 0
    // Keep looping until we have enough rooms, the mapFilledPercentage is above 50% or we've tried 100 times
    while (rooms.length < ROOM_COUNT && escapeCounter < 100) {
      // Empty the rooms array
      rooms.length = 0

      for (let i = 0; i < ROOM_COUNT; i++) {
        const width = MIN_ROOM_SIZE + Math.floor(Math.random() * (MAX_ROOM_SIZE - MIN_ROOM_SIZE))
        const height = MIN_ROOM_SIZE + Math.floor(Math.random() * (MAX_ROOM_SIZE - MIN_ROOM_SIZE))
        const x = Math.floor(Math.random() * (WIDTH - width - 1)) + 1
        const y = Math.floor(Math.random() * (HEIGHT - height - 1)) + 1

        const newRoom = new Room(x, y, width, height)
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
          for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
              map[newRoom.y + y][newRoom.x + x] = FLOOR
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
        map[y][x] = FLOOR

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
        if (cell === FLOOR) {
          floorFiles++
        }
      }
    }

    mapFilledPercentage = Math.floor((floorFiles / (WIDTH * HEIGHT)) * 100)
    mapEscape++
  }
  return map
}

function saveMap (map) {
  const output = map.map(row => row.join('')).join('\n')
  fs.writeFileSync('map.txt', output)
}

const map = generateMap()
saveMap(map)
