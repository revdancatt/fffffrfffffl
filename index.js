/* global preloadImagesTmr fxhash fxrand paper1Loaded noise palettes */

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

const ratio = 1.414 // 1.414 is the golden ratio

// const startTime = new Date().getTime() // so we can figure out how long since the scene started
let drawn = false
let highRes = false // display high or low res
let drawPaper = true
const features = {}
let resizeTmr = null

window.$fxhashFeatures = {}

// This decides if we're going to keep the square or subdivide it
const subDivideSquare = (corners, depth, layer) => {
  // Work out the middle of the square
  const middle = {
    x: corners.tl.x + ((corners.tr.x - corners.tl.x) / 2),
    y: corners.tl.y + ((corners.bl.y - corners.tl.y) / 2)
  }
  // Grab a value from the perlin noise for the middle of the square
  const perlinValue = (1 + noise.perlin2(features.perlinOffsets[layer].x + (middle.x * features.perlinOffsets[layer].scale), features.perlinOffsets[layer].y + (middle.y * features.perlinOffsets[layer].scale))) / 2

  // Work out the chance of it being subdivided
  let subChance = 0.9
  for (let i = 0; i < depth; i++) subChance *= 0.666
  // Don't let his carry on forever
  if (subChance < 0.2) subChance = -1

  // Now work out if we're going to subdivide it
  if (perlinValue < subChance) {
    // We are going to subdivide it, first work out the length of half the square
    const halfLength = (corners.tr.x - corners.tl.x) / 2
    // Now do two loops to work out the four corners of the new squares
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 2; x++) {
        const newCorners = {
          tl: {
            x: corners.tl.x + (x * halfLength),
            y: corners.tl.y + (y * halfLength)
          },
          tr: {
            x: corners.tl.x + ((x + 1) * halfLength),
            y: corners.tl.y + (y * halfLength)
          },
          bl: {
            x: corners.tl.x + (x * halfLength),
            y: corners.tl.y + ((y + 1) * halfLength)
          },
          br: {
            x: corners.tl.x + ((x + 1) * halfLength),
            y: corners.tl.y + ((y + 1) * halfLength)
          }
        }
        subDivideSquare(newCorners, depth + 1, layer)
      }
    }
  } else {
    const newSquare = {
      corners
    }
    newSquare.middle = {
      x: corners.tl.x + ((corners.tr.x - corners.tl.x) / 2),
      y: corners.tl.y + ((corners.bl.y - corners.tl.y) / 2)
    }
    newSquare.rotate = 180 * noise.perlin2(features.perlinRotationOffsets[layer].x + (newSquare.middle.x * features.perlinRotationOffsets[layer].scale), features.perlinRotationOffsets[layer].y + (newSquare.middle.y * features.perlinRotationOffsets[layer].scale))
    features.squares[layer].push(newSquare)
  }
}

//  Work out what all our features are
const makeFeatures = () => {
  features.paperOffset = {
    paper1: {
      x: fxrand(),
      y: fxrand()
    },
    paper2: {
      x: fxrand(),
      y: fxrand()
    }
  }

  features.layers = 6

  // We need something to hold all the lines
  features.lineHolder = []

  // got through the palettes, deleting any that are too small
  for (let i = 0; i < palettes.length; i++) {
    if (palettes[i].colors.length < features.layers) {
      palettes.splice(i, 1)
      i--
    }
  }

  // Go grab a palette
  features.palette = []
  while (features.palette.length < features.layers) {
    features.paletteIndex = Math.floor(fxrand() * palettes.length)
    features.palette = palettes[features.paletteIndex].colors.map((c) => c.value)
  }

  // We are going to have some perlin noise so we'll have some offsets and scale
  features.perlinOffsets = []
  features.perlinRotationOffsets = []

  for (let i = 0; i < features.layers; i++) {
    //   Push the lines into the line holder
    features.lineHolder.push({
      lines: [],
      colour: features.palette[i]
    })

    // If we are on the first layer, make it random, otherwise copy the values over
    if (i === 0) {
      features.perlinOffsets.push({
        x: fxrand() * 1000 + 4000,
        y: fxrand() * 1000 + 4000,
        scale: 8
      })

      features.perlinRotationOffsets.push({
        x: fxrand() * 1000 + 4000,
        y: fxrand() * 1000 + 4000,
        scale: 2
      })
    } else {
      // Copy them over
      features.perlinOffsets.push({
        x: features.perlinOffsets[0].x + (i * 0.25),
        y: features.perlinOffsets[0].y + (i * 0.125),
        scale: features.perlinOffsets[0].scale + (i * 0.0)
      })
      features.perlinRotationOffsets.push({
        x: features.perlinRotationOffsets[0].x + (i * 0.01),
        y: features.perlinRotationOffsets[0].y + (i * 0.005),
        scale: features.perlinRotationOffsets[0].scale + (i * 0.0)
      })
    }
  }

  // We are going to be using a 1 by 1 * ratio co-ordinate system, so we need to work within that
  // I want to work out a grid that nicely fills the page, making sure to have a border
  features.sideBorder = 0.05
  // Pick a number of squares across the page, somewhere between 4 and 7
  const possibleSquaresAcross = [3, 5, 6, 7, 10]
  features.squaresAcross = possibleSquaresAcross[Math.floor(fxrand() * possibleSquaresAcross.length)]
  // Work out the size of the squares
  features.squareSize = (1 - (features.sideBorder * 2)) / features.squaresAcross
  // Work out the number of squares down the page
  features.squaresDown = Math.floor(((1 * ratio) - (features.sideBorder * 2)) / features.squareSize)
  // Work out the topBottomBorder
  features.topBottomBorder = ((1 * ratio) - (features.squaresDown * features.squareSize)) / 2

  // Now have an array of all the squares
  features.squares = []
  for (let i = 0; i < features.layers; i++) {
    features.squares.push([])
    for (let y = 0; y < features.squaresDown; y++) {
      for (let x = 0; x < features.squaresAcross; x++) {
        // Work out the four corners of the square
        const corners = {
          tl: {
            x: x * features.squareSize + features.sideBorder,
            y: y * features.squareSize + features.topBottomBorder
          },
          tr: {
            x: (x * features.squareSize + features.sideBorder) + features.squareSize,
            y: y * features.squareSize + features.topBottomBorder
          },
          bl: {
            x: x * features.squareSize + features.sideBorder,
            y: (y * features.squareSize + features.topBottomBorder) + features.squareSize
          },
          br: {
            x: (x * features.squareSize + features.sideBorder) + features.squareSize,
            y: (y * features.squareSize + features.topBottomBorder) + features.squareSize
          }
        }
        subDivideSquare(corners, 0, i)
      }
    }
  }
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
  let cWidth = wWidth
  let cHeight = cWidth * ratio
  if (cHeight > wHeight) {
    cHeight = wHeight
    cWidth = wHeight / ratio
  }
  const canvas = document.getElementById('target')
  if (highRes) {
    canvas.height = 8192
    canvas.width = 8192 / ratio
  } else {
    canvas.width = Math.min((8192 / 2), cWidth * 2)
    canvas.height = Math.min((8192 / ratio / 2), cHeight * 2)
    //  Minimum size to be half of the high rez cersion
    if (Math.min(canvas.width, canvas.height) < 8192 / 2) {
      if (canvas.width < canvas.height) {
        canvas.height = 8192 / 2
        canvas.width = 8192 / 2 / ratio
      } else {
        canvas.width = 8192 / 2
        canvas.height = 8192 / 2 / ratio
      }
    }
  }

  canvas.style.position = 'absolute'
  canvas.style.width = `${cWidth}px`
  canvas.style.height = `${cHeight}px`
  canvas.style.left = `${(wWidth - cWidth) / 2}px`
  canvas.style.top = `${(wHeight - cHeight) / 2}px`

  //  Re-Create the paper pattern
  const paper1 = document.createElement('canvas')
  paper1.width = canvas.width / 2
  paper1.height = canvas.height / 2
  const paper1Ctx = paper1.getContext('2d')
  await paper1Ctx.drawImage(paper1Loaded, 0, 0, 1920, 1920, 0, 0, paper1.width, paper1.height)
  features.paper1Pattern = paper1Ctx.createPattern(paper1, 'repeat')

  const paper2 = document.createElement('canvas')
  paper2.width = canvas.width / (22 / 7)
  paper2.height = canvas.height / (22 / 7)
  const paper2Ctx = paper2.getContext('2d')
  await paper2Ctx.drawImage(paper1Loaded, 0, 0, 1920, 1920, 0, 0, paper2.width, paper2.height)
  features.paper2Pattern = paper2Ctx.createPattern(paper2, 'repeat')

  //  And draw it!!
  drawCanvas()
}

// A function that finds the intersection point of two lines
const faultyLineIntersectsEdge = (line1, line2) => {
  // Get the points of the lines
  const p1 = line1.p1
  const p2 = line1.p2
  const p3 = line2.p1
  const p4 = line2.p2
  // Get the x and y values of the lines
  const x1 = p1.x
  const x2 = p2.x
  const x3 = p3.x
  const x4 = p4.x
  const y1 = p1.y
  const y2 = p2.y
  const y3 = p3.y
  const y4 = p4.y
  // Calculate the denominator
  const denominator = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4))
  // If the denominator is 0, the lines are parallel
  if (denominator === 0) {
    return null
  }
  // Calculate the intersection point
  const x = (((x1 * y2) - (y1 * x2)) * (x3 - x4) - ((x1 - x2) * (x3 * y4 - y3 * x4))) / denominator
  const y = (((x1 * y2) - (y1 * x2)) * (y3 - y4) - ((y1 - y2) * (x3 * y4 - y3 * x4))) / denominator
  // Check if the intersection point is on the line segments
  if (x < Math.min(x1, x2) || x > Math.max(x1, x2) || x < Math.min(x3, x4) || x > Math.max(x3, x4)) {
    return null
  }
  if (y < Math.min(y1, y2) || y > Math.max(y1, y2) || y < Math.min(y3, y4) || y > Math.max(y3, y4)) {
    return null
  }
  // Return the point of intersection
  return {
    x,
    y
  }
}

// We need a function that calculates if a line intersects a polygon
const faultyLineIntersectsPoly = (line, poly) => {
  let intersection1 = null
  let intersection2 = null
  // Loop through the points of the poly grabbing the edges
  for (let i = 0; i < poly.length; i++) {
    const p1 = poly[i]
    const p2 = (i < poly.length - 1) ? poly[i + 1] : poly[0]
    const edge = {
      p1: {
        x: p1[0],
        y: p1[1]
      },
      p2: {
        x: p2[0],
        y: p2[1]
      }
    }
    // Get the intersection point of the line and the edge
    const intersection = faultyLineIntersectsEdge(line, edge)
    // If there is an intersection, set it
    if (intersection) {
      if (!intersection1) {
        intersection1 = intersection
      } else {
        intersection2 = intersection
      }
    }
  }
  if (intersection1 && intersection2) {
    return {
      p1: intersection1,
      p2: intersection2
    }
  }
  return null
}

const getTransformToScreen = (x, y, rotation, posX, posY) => {
  const xAx = Math.cos(rotation) // x axis x
  const xAy = Math.sin(rotation) // x axis y
  // the equivalent to
  // ctx setTransform(xAx, xAy ,-xAy, xAx, posX, posY);
  // second two values (y Axis) is at 90 deg of x Axis if it is
  // not at 90 (skewed) then you need to calculate the skewed axis (y axis) direction
  return {
    x: x * xAx - y * xAy + posX,
    y: x * xAy + y * xAx + posY
  }
}

const drawCanvas = async () => {
  //  Let the preloader know that we've hit this function at least once
  drawn = true

  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  //  Lay down the paper texture
  if (drawPaper) {
    ctx.fillStyle = features.paper1Pattern
    ctx.save()
    ctx.translate(-w * features.paperOffset.paper1.x, -h * features.paperOffset.paper1.y)
    ctx.fillRect(0, 0, w * 2, h * 2)
    ctx.restore()
  } else {
    ctx.fillStyle = '#F9F9F9'
    ctx.fillRect(0, 0, w, h)
  }

  // Set the line width and colour
  ctx.lineWidth = w / 400
  // Set the blend mode to multiply
  // ctx.globalCompositeOperation = 'multiply'
  // Draw the squares

  for (let layer = 0; layer < features.layers; layer++) {
    ctx.strokeStyle = features.palette[layer]
    features.lineHolder[layer].colour = features.palette[layer]

    for (let i = 0; i < features.squares[layer].length; i++) {
      const square = features.squares[layer][i]
      // Calculate the square size
      square.size = square.corners.tr.x - square.corners.tl.x
      // Now I want to draw lines from square.size off from the corners
      const outterCorners = {
        tl: {
          x: -square.size / 2 * w - square.size * w,
          y: -square.size / 2 * w - square.size * w
        },
        tr: {
          x: square.size / 2 * w + square.size * w,
          y: -square.size / 2 * w - square.size * w
        },
        bl: {
          x: -square.size / 2 * w - square.size * w,
          y: square.size / 2 * w + square.size * w
        },
        br: {
          x: square.size / 2 * w + square.size * w,
          y: square.size / 2 * w + square.size * w
        }
      }

      ctx.save()
      ctx.translate(square.middle.x * w, square.middle.y * w)

      const cullingPoly = [
        [-square.size / 2 * w, -square.size / 2 * w],
        [square.size / 2 * w, -square.size / 2 * w],
        [square.size / 2 * w, square.size / 2 * w],
        [-square.size / 2 * w, square.size / 2 * w]
      ]

      // Now we're going to draw 30 vertical lines, moving our way from the corners
      const lines = 20
      const lineStep = (outterCorners.tr.x - outterCorners.tl.x) / lines
      ctx.save()
      ctx.rotate(square.rotate * Math.PI / 180)
      for (let j = 0; j < 30; j++) {
        const line = {
          p1: {
            x: outterCorners.tl.x + (j * lineStep),
            y: outterCorners.tl.y
          },
          p2: {
            x: outterCorners.bl.x + (j * lineStep),
            y: outterCorners.bl.y
          }
        }
        const newLine = faultyLineIntersectsPoly(line, cullingPoly)
        // console.log(screenLine)
        if (newLine) {
          const screenLine = {
            p1: getTransformToScreen(newLine.p1.x, newLine.p1.y, square.rotate * Math.PI / 180, square.middle.x * w, square.middle.y * w),
            p2: getTransformToScreen(newLine.p2.x, newLine.p2.y, square.rotate * Math.PI / 180, square.middle.x * w, square.middle.y * w)
          }
          features.lineHolder[layer].lines.push(screenLine)
        }
      }
      ctx.restore()
      ctx.restore()
    }
  }

  // Now that we have it all go through the lines and draw them
  for (let layer = 0; layer < features.layers; layer++) {
    ctx.strokeStyle = features.lineHolder[layer].colour
    for (let i = 0; i < features.lineHolder[layer].lines.length; i++) {
      const line = features.lineHolder[layer].lines[i]
      ctx.beginPath()
      if (line.p1.y < (w - (features.sideBorder * w) || line.p2.y < w - (features.sideBorder * w))) {
        ctx.moveTo(line.p1.y - (features.topBottomBorder * w) + (features.sideBorder * w), line.p1.x)
        ctx.lineTo(line.p2.y - (features.topBottomBorder * w) + (features.sideBorder * w), line.p2.x)
      } else {
        ctx.moveTo(line.p1.x, line.p1.y)
        ctx.lineTo(line.p2.x, line.p2.y)
      }
      ctx.stroke()
    }
  }

  // Call the draw function again
  // aniFrame = window.requestAnimationFrame(drawCanvas)
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

  // Toggle the paper texture
  if (e.key === 't') {
    drawPaper = !drawPaper
    await layoutCanvas()
  }
})

//  This preloads the images so we can get access to them
// eslint-disable-next-line no-unused-vars
const preloadImages = () => {
  //  If paper1 has loaded and we haven't draw anything yet, then kick it all off
  if (paper1Loaded !== null && !drawn) {
    clearInterval(preloadImagesTmr)
    init()
  }
}
