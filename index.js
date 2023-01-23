/* global preloadImagesTmr fxhash fxrand paper1Loaded noise palettes PAPER Line page Blob */

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

  features.layers = Math.floor((fxrand() * 6 + fxrand() * 6) / 2) + 2

  // We need something to hold all the lines
  features.lineHolder = []
  features.linesSet = false

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
    features.paletteName = palettes[features.paletteIndex].name
    features.palette = palettes[features.paletteIndex].colors.map((c) => c.value)
    features.paletteNames = palettes[features.paletteIndex].colors.map((c) => c.name)
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
        scale: features.perlinRotationOffsets[0].scale + (i * 0.01)
      })
    }
  }

  // We are going to be using a 1 by 1 * ratio co-ordinate system, so we need to work within that
  // I want to work out a grid that nicely fills the page, making sure to have a border
  features.sideBorder = 0.075
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

  features.emptyBoxes = []

  // Now work out the warps
  features.displacement = {
    big: {
      weighting: 0,
      invert: false,
      xNudge: fxrand() * 1000 + 4000,
      yNudge: fxrand() * 1000 + 4000,
      zNudge: 0,
      resolution: fxrand() * 200 + 800,
      amplitude: 200,
      xScale: 1,
      yScale: 1
    },
    small: {
      weighting: 0,
      invert: false,
      xNudge: fxrand() * 1000 + 4000,
      yNudge: fxrand() * 1000 + 4000,
      zNudge: 0,
      resolution: fxrand() * 2 + 0.5,
      amplitude: fxrand() * 2 + 0.5,
      xScale: 1,
      yScale: 1
    }
  }
  if (fxrand() > 0.5) {
    features.displacement.big.amplitude = 50
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
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, w, h)
  }

  // Calculate all the line positions
  if (!features.linesSet) {
    for (let layer = 0; layer < features.layers; layer++) {
      // Set the line colour
      features.lineHolder[layer].colour = features.palette[layer]
      //   Loop through the squares
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

        // These translation is from when we were drawing the squares
        // here, but now we are drawing them later. We should probably
        // get rid of this. But for the moment, it's fine.
        ctx.save()
        ctx.translate(square.middle.x * w, square.middle.y * w)

        // This is the polygon that we're going to use to cull the lines
        const cullingPoly = [
          [-square.size / 2 * w, -square.size / 2 * w],
          [square.size / 2 * w, -square.size / 2 * w],
          [square.size / 2 * w, square.size / 2 * w],
          [-square.size / 2 * w, square.size / 2 * w]
        ]

        // Now we're going to make 30 vertical lines, moving our way from the corners
        const lines = 30
        const lineStep = (outterCorners.tr.x - outterCorners.tl.x) / lines

        // Now the rotation
        ctx.save()
        ctx.rotate(square.rotate * Math.PI / 180)
        // Make the lines
        for (let j = 0; j < lines; j++) {
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
          // Keep the stuff inside the cullingPoly, throw away the ends that
          // all outside of them.
          // Note, this is totally bugged and sometimes makes _all_ the lines
          // disappear. But, I like the result, so I'm going to leave it for now.
          const newLine = faultyLineIntersectsPoly(line, cullingPoly)
          // We need to reverse all the transformations and lines to get _back_
          // to the actual screen coordinates.
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

    // Now we're going to reposition the top square of lines to rotate
    // then by 90 degrees, because I like how it looks
    const positionedLineHolder = []
    // Now that we have it all go through the lines shoft around the
    // top ones
    for (let layer = 0; layer < features.layers; layer++) {
      positionedLineHolder.push({
        lines: [],
        colour: features.palette[layer]
      })
      // This allows us to rotate the top lines
      for (let i = 0; i < features.lineHolder[layer].lines.length; i++) {
        const line = features.lineHolder[layer].lines[i]
        //   Push the points of the line into the array
        const thisLine = []
        if (line.p1.y < (w - (features.sideBorder * w) || line.p2.y < w - (features.sideBorder * w))) {
          thisLine.push({
            x: (line.p1.y - (features.topBottomBorder * w) + (features.sideBorder * w)) / w,
            y: line.p1.x / h
          })
          thisLine.push({
            x: (line.p2.y - (features.topBottomBorder * w) + (features.sideBorder * w)) / w,
            y: line.p2.x / h
          })
        } else {
          thisLine.push({
            x: line.p1.x / w,
            y: line.p1.y / h
          })
          thisLine.push({
            x: line.p2.x / w,
            y: line.p2.y / h
          })
        }
        positionedLineHolder[layer].lines.push(thisLine)
      }
    }
    // Now we store all the lines with their points in the line holder
    // so we can draw them later
    features.lineHolder = positionedLineHolder

    // Now we're going to turn all the lines into a single object, so we can do some manipulation
    // before we turn them back into their original format
    const allLines = []
    for (let layer = 0; layer < features.lineHolder.length; layer++) {
      for (let i = 0; i < features.lineHolder[layer].lines.length; i++) {
        const line = features.lineHolder[layer].lines[i]
        line.layer = layer
        allLines.push(line)
      }
    }

    // Now we're going to do some manipulation on the lines
    // We are going to make an object that holds a "bin" for each main grid square
    // Then we are going to put all the lines that have a center point in that square into that bin
    const lineBins = {}
    // Loop through the squares down
    for (let y = 0; y < features.squaresDown; y++) {
      // Loop through the squares across
      for (let x = 0; x < features.squaresAcross; x++) {
        // Create the bin
        lineBins[`${x},${y}`] = {
          lines: []
        }
        // Grab the corners of the square
        const square = {
          top: (y * features.squareSize + features.topBottomBorder) * w,
          bottom: ((y + 1) * features.squareSize + features.topBottomBorder) * w,
          left: (x * features.squareSize + features.sideBorder) * w,
          right: ((x + 1) * features.squareSize + features.sideBorder) * w
        }
        square.center = {
          x: (square.left + square.right) / 2,
          y: (square.top + square.bottom) / 2
        }
        lineBins[`${x},${y}`].square = square
        // Draw the square
        /*
        ctx.beginPath()
        ctx.rect(square.left, square.top, square.right - square.left, square.bottom - square.top)
        ctx.strokeStyle = 'rgba(0,0,0,0.1)'
        ctx.lineWidth = 10
        ctx.stroke()
        */
      }
    }

    // Now loop through all the lines and put them in the correct bin
    for (let i = 0; i < allLines.length; i++) {
      const line = allLines[i]
      // Convert the line points to the canvas size
      line[0].x = (line[0].x + features.sideBorder) * w
      line[0].y = (line[0].y + features.topBottomBorder) * h
      line[1].x = (line[1].x + features.sideBorder) * w
      line[1].y = (line[1].y + features.topBottomBorder) * h

      // Get the center point of the line
      const centerPoint = {
        x: (line[0].x + line[1].x) / 2,
        y: (line[0].y + line[1].y) / 2
      }
      // Loop through lineBins and find the one that the center point is in
      for (const bin in lineBins) {
        const square = lineBins[bin].square
        if (centerPoint.x > square.left && centerPoint.x < square.right && centerPoint.y > square.top && centerPoint.y < square.bottom) {
          lineBins[bin].lines.push(line)
        }
      }
    }

    // Make a list of all the bins
    const binList = []
    for (const bin in lineBins) binList.push(bin)

    // Randomly pick 30% of the bins to rotate
    const binsToRotate = []
    for (let i = 0; i < binList.length * 0.3; i++) {
      const bin = binList[Math.floor(fxrand() * binList.length)]
      binsToRotate.push(bin)
      binList.splice(binList.indexOf(bin), 1)
    }
    // add the bins to rotate back to the bin list
    for (let i = 0; i < binsToRotate.length; i++) binList.push(binsToRotate[i])

    // Now we need to rotate the lines in the bins
    for (let i = 0; i < binsToRotate.length; i++) {
      const binKey = binsToRotate[i]
      const bin = lineBins[binKey]
      const angle = Math.floor(fxrand() * 4) * 90
      // we want to subtract the bin.center from each point in the lines
      // then rotate the points by the angle
      // then add the bin.center back to each point
      for (let j = 0; j < bin.lines.length; j++) {
        const line = bin.lines[j]
        // Subtract the bin center from each point
        line[0].x -= bin.square.center.x
        line[0].y -= bin.square.center.y
        line[1].x -= bin.square.center.x
        line[1].y -= bin.square.center.y
        // Rotate the points, the long but faster way
        const x1 = line[0].x
        const y1 = line[0].y
        const x2 = line[1].x
        const y2 = line[1].y
        if (angle === 90) {
          line[0].x = y1
          line[0].y = -x1
          line[1].x = y2
          line[1].y = -x2
        } else if (angle === 180) {
          line[0].x = -x1
          line[0].y = -y1
          line[1].x = -x2
          line[1].y = -y2
        } else if (angle === 270) {
          line[0].x = -y1
          line[0].y = x1
          line[1].x = -y2
          line[1].y = x2
        }
        // Add the bin center back to each point
        line[0].x += bin.square.center.x
        line[0].y += bin.square.center.y
        line[1].x += bin.square.center.x
        line[1].y += bin.square.center.y
      }
    }

    // Now we want to know how many non-empty bins there are
    const fullBinsList = []
    for (const bin in lineBins) {
      if (lineBins[bin].lines.length > 0) fullBinsList.push(bin)
    }
    // Now we want to randomly pick 10% of the full bins
    const binsToSwap = []
    for (let i = 0; i < fullBinsList.length * 0.1; i++) {
      const bin = fullBinsList[Math.floor(fxrand() * fullBinsList.length)]
      binsToSwap.push(bin)
      fullBinsList.splice(fullBinsList.indexOf(bin), 1)
    }
    // Now we want to build up a list of where we are going to swap from and to
    const swapList = []
    for (let i = 0; i < binsToSwap.length; i++) {
      const bin = binsToSwap[i]
      // Pick a random bin from binList to swap to, but not the same as the bin we are swapping from
      let swapTo = bin
      while (swapTo === bin) {
        swapTo = binList[Math.floor(fxrand() * binList.length)]
      }
      swapList.push({
        from: bin,
        to: swapTo
      })
    }
    // Now we want to swap the lines from the bins
    for (let i = 0; i < swapList.length; i++) {
      const swap = swapList[i]
      const fromBin = lineBins[swap.from]
      const toBin = lineBins[swap.to]
      // Swap the lines, by working out the difference between the bin centers
      const xDiff = fromBin.square.center.x - toBin.square.center.x
      const yDiff = fromBin.square.center.y - toBin.square.center.y
      // Now we want to move the lines in the fromBin to the toBin
      const toLines = []
      for (let j = 0; j < fromBin.lines.length; j++) {
        const line = fromBin.lines[j]
        line[0].x -= xDiff
        line[0].y -= yDiff
        line[1].x -= xDiff
        line[1].y -= yDiff
        toLines.push(line)
      }
      // Now we want to move the lines in the toBin to the fromBin
      const fromLines = []
      for (let j = 0; j < toBin.lines.length; j++) {
        const line = toBin.lines[j]
        line[0].x += xDiff
        line[0].y += yDiff
        line[1].x += xDiff
        line[1].y += yDiff
        fromLines.push(line)
      }
      // Now we want to swap the lines
      fromBin.lines = toLines
      toBin.lines = fromLines
    }

    // Recalculate the fullBinsList, emptying it first
    fullBinsList.length = 0
    for (const bin in lineBins) {
      if (lineBins[bin].lines.length > 0) fullBinsList.push(bin)
    }

    // Now we want to randomly pick 10% of the full bins to empty
    const binsToEmpty = []
    for (let i = 0; i < fullBinsList.length * 0.1; i++) {
      const bin = fullBinsList[Math.floor(fxrand() * fullBinsList.length)]
      binsToEmpty.push(bin)
      fullBinsList.splice(fullBinsList.indexOf(bin), 1)
    }
    // Now we want to empty the bins
    for (let i = 0; i < binsToEmpty.length; i++) {
      const bin = binsToEmpty[i]
      lineBins[bin].lines.length = 0
    }

    // Now we want to remove any lines where the middle of them is outside of the borders
    for (const bin in lineBins) {
      const lines = lineBins[bin].lines
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const midX = line[0].x + (line[1].x - line[0].x) / 2
        const midY = line[0].y + (line[1].y - line[0].y) / 2
        if (midX < w * features.sideBorder || midX > w - w * features.sideBorder || midY < h * features.topBorder || midY > h - h * features.bottomBorder) {
          lines.splice(i, 1)
          i--
        }
      }
    }

    // Work out the bounding box of all the lines
    const boundingBox = {
      min: {
        x: 9999999,
        y: 9999999
      },
      max: {
        x: -9999999,
        y: -9999999
      }
    }
    for (const bin in lineBins) {
      for (let i = 0; i < lineBins[bin].lines.length; i++) {
        const line = lineBins[bin].lines[i]
        if (line[0].x < boundingBox.min.x) boundingBox.min.x = line[0].x
        if (line[0].y < boundingBox.min.y) boundingBox.min.y = line[0].y
        if (line[0].x > boundingBox.max.x) boundingBox.max.x = line[0].x
        if (line[0].y > boundingBox.max.y) boundingBox.max.y = line[0].y
        if (line[1].x < boundingBox.min.x) boundingBox.min.x = line[1].x
        if (line[1].y < boundingBox.min.y) boundingBox.min.y = line[1].y
        if (line[1].x > boundingBox.max.x) boundingBox.max.x = line[1].x
        if (line[1].y > boundingBox.max.y) boundingBox.max.y = line[1].y
      }
    }
    // Get the center of the bounding box
    boundingBox.center = {
      x: boundingBox.min.x + (boundingBox.max.x - boundingBox.min.x) / 2,
      y: boundingBox.min.y + (boundingBox.max.y - boundingBox.min.y) / 2
    }
    // Work out the difference between the bounding box and the canvas
    const xDiff = w / 2 - boundingBox.center.x
    const yDiff = h / 2 - boundingBox.center.y

    // Now we want to move all the lines by the difference
    for (const bin in lineBins) {
      for (let i = 0; i < lineBins[bin].lines.length; i++) {
        const line = lineBins[bin].lines[i]
        line[0].x += xDiff
        line[0].y += yDiff
        line[1].x += xDiff
        line[1].y += yDiff
      }
    }

    // Now we need to go through all the lineBins putting the lines back into the line holder
    // in the correct format
    features.lineHolder = []
    for (let layer = 0; layer < features.layers; layer++) {
      // Loop through all the bins
      features.lineHolder.push({
        lines: [],
        colour: features.palette[layer]
      })
    }
    for (const bin in lineBins) {
      // Loop through all the lines in the bin
      for (let i = 0; i < lineBins[bin].lines.length; i++) {
        const line = lineBins[bin].lines[i]
        line.binIndex = bin
        line.bin = lineBins[bin]
        features.lineHolder[line.layer].lines.push(line)
      }
    }

    //  Now we need to work out the empty boxes for the features, so we
    // can fill them in with colours
    // First find all the empty bins
    const emptyBins = []
    for (const bin in lineBins) {
      if (lineBins[bin].lines.length === 0) emptyBins.push(bin)
    }
    // Now loop through the emptyBins, pitting the details into the features
    for (let i = 0; i < emptyBins.length; i++) {
      const bin = emptyBins[i]
      const square = lineBins[bin].square
      // Pick a random colour for the square
      square.colour1 = Math.floor(fxrand() * features.layers)
      square.colour2 = Math.floor(fxrand() * features.layers)
      square.hasSolid = fxrand() < 0.5
      square.hasDots = fxrand() < 0.5
      if (!square.hasSolid && !square.hasDots) square.hasDots = true
      features.emptyBoxes.push(square)
      // Now we are going to slam some lines into the line holder
      if (square.hasSolid) {
        const numberOfLines = Math.floor((24 - (features.squaresAcross * 2)) * 4) + Math.floor(fxrand() * 4 - 2)
        const lineStep = (square.bottom - square.top) / numberOfLines
        for (let x = 0; x <= numberOfLines; x++) {
          const line = [
            { x: square.left - (fxrand() * w / features.squaresAcross / 10), y: square.top + x * lineStep - (fxrand() * h / features.squaresAcross / 40) },
            { x: square.right + (fxrand() * w / features.squaresAcross / 10), y: square.top + x * lineStep - (fxrand() * h / features.squaresAcross / 40) }
          ]
          features.lineHolder[square.colour1].lines.push(line)
        }
      }

      // If we have dots then we need to make lots of dots which we will draw later
      if (square.hasDots) {
        const numberOfDots = 24 - (features.squaresAcross * 2)
        const dotSize = (square.bottom - square.top) / numberOfDots
        // We are going to make a circle out of a number of points, the circle will
        // have a radius of the dotSize, and then we'll move it to the correct position
        // We'll then draw a circle at each point
        const circlePoints = []
        const numberOfCirclePoints = 10
        for (let x = 0; x < numberOfCirclePoints; x++) {
          const angle = x / numberOfCirclePoints * Math.PI * 2
          circlePoints.push({
            x: Math.cos(angle) * dotSize / 8,
            y: Math.sin(angle) * dotSize / 8
          })
        }
        for (let x = 0; x < numberOfDots; x++) {
          for (let y = 0; y < numberOfDots; y++) {
            // Make a copy of the circle points
            const points = JSON.parse(JSON.stringify(circlePoints))
            // Move the points to the correct position
            for (let i = 0; i < points.length; i++) {
              points[i].x += square.left + x * dotSize + dotSize / 2
              points[i].y += square.top + y * dotSize + dotSize / 2
              points[i].z = 0
            }
            // Add the first point to the end of the array
            points.push(points[0])

            // Add the points to the line holder
            features.lineHolder[square.colour2].lines.push(points)
          }
        }
      }
    }

    // Now we need to convert the lines to ones we deal with, with the page functions
    const pageLines = []
    for (let layer = 0; layer < features.layers; layer++) {
      pageLines.push([])
      const lines = []
      // Loop through the lines
      for (let i = 0; i < features.lineHolder[layer].lines.length; i++) {
        const line = features.lineHolder[layer].lines[i]
        const newLine = new Line()
        // Loop through the points
        for (let j = 0; j < line.length; j++) {
          const point = line[j]
          newLine.addPoint(point.x, point.y)
        }
        lines.push(newLine)
      }
      // pageLines[layer] = lines
      pageLines[layer] = page.displace(page.doDecimate(lines, w / 1000), features.displacement.big)
      // Go through all the points in all the lines so we can set z to 0
      for (let i = 0; i < pageLines[layer].length; i++) {
        const line = pageLines[layer][i]
        for (let j = 0; j < line.points.length; j++) {
          const point = line.points[j]
          point.z = 0
        }
      }

      pageLines[layer] = page.displace(pageLines[layer], features.displacement.small)
    }

    // Now we need to convert the lines back to the format we want
    for (let layer = 0; layer < features.layers; layer++) {
      features.lineHolder[layer].lines = []
      for (let i = 0; i < pageLines[layer].length; i++) {
        const line = pageLines[layer][i]
        const newLine = []
        for (let j = 0; j < line.points.length; j++) {
          const point = line.points[j]
          newLine.push({ x: point.x, y: point.y })
        }
        features.lineHolder[layer].lines.push(newLine)
      }
    }

    features.linesSet = true
  }

  // Now we need to draw all the lines
  // Set the line width
  ctx.lineWidth = w / 400
  ctx.lineJoin = 'round'
  // Set the blend mode to multiply
  const startTime = new Date().getTime()
  for (let layer = 0; layer < features.layers; layer++) {
    // If we are in the top half of the layers, we want to use the multiply blend mode
    if (layer > features.layers / 2) ctx.globalCompositeOperation = 'multiply'
    ctx.strokeStyle = features.lineHolder[layer].colour
    ctx.beginPath()
    for (let i = 0; i < features.lineHolder[layer].lines.length; i++) {
      const line = features.lineHolder[layer].lines[i]
      // Only draw it if the first and line point are within the canvas
      if (line[0].x > w * features.sideBorder && line[0].x < w - (w * features.sideBorder) && line[0].y > h * features.topBottomBorder && line[0].y < h - (h * features.topBottomBorder)) {
      // Draw the line by moving to the first point, then looping through the rest
        ctx.moveTo(line[0].x, line[0].y)
        for (let j = 1; j < line.length; j++) {
          ctx.lineTo(line[j].x, line[j].y)
        }
      }
    }
    ctx.stroke()
    // Reset the blend mode
    ctx.globalCompositeOperation = 'source-over'
  }
  const elapsedTime = new Date().getTime() - startTime
  console.log(`Drawing ${features.lineHolder[0].lines.length} lines took ${elapsedTime}ms`)
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

const downloadSVG = async size => {
  // Loop through the layers and download each one
  for (let layer = 0; layer < features.layers; layer++) {
    await wrapSVG(features.lineHolder[layer].lines, PAPER[size], `fffffrfffffl_${size}_${layer}_${features.paletteName}_${features.paletteNames[layer]}_${features.palette[layer]}_${fxhash}`)
  }
  // We also want to make a swatch file, first create a canvas
  const swatchCanvas = document.createElement('canvas')
  swatchCanvas.width = 480
  swatchCanvas.height = 640
  const swatchCtx = swatchCanvas.getContext('2d')
  // work out how high each swatch should be
  const swatchHeight = swatchCanvas.height / features.layers
  // Now draw a rectangle for each colour in the layer
  for (let layer = 0; layer < features.layers; layer++) {
    swatchCtx.fillStyle = features.palette[layer]
    swatchCtx.fillRect(0, layer * swatchHeight, swatchCanvas.width, swatchHeight)
  }
  // Now we can download the swatch
  const element = document.createElement('a')
  element.setAttribute('download', `fffffrfffffl_swatch_${size}_${fxhash}`)
  element.style.display = 'none'
  document.body.appendChild(element)
  let imageBlob = null
  imageBlob = await new Promise(resolve => swatchCanvas.toBlob(resolve, 'image/png'))
  element.setAttribute('href', window.URL.createObjectURL(imageBlob, {
    type: 'image/png'
  }))
  element.click()
  document.body.removeChild(element)
}

const wrapSVG = async (lines, size, filename) => {
  let output = `<?xml version="1.0" standalone="no" ?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
      "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg version="1.1" id="lines" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0" y="0"
      viewBox="0 0 ${size[0]} ${size[1]}"
      width="${size[0]}cm"
      height="${size[1]}cm" 
      xml:space="preserve">`

  output += `
      <g>
      <path d="`
  lines.forEach(points => {
    output += `M ${points[0].x * size[0]} ${points[0].y * size[1]} `
    for (let p = 1; p < points.length; p++) {
      output += `L ${points[p].x * size[0]} ${points[p].y * size[1]} `
    }
  })
  output += `"  fill="none" stroke="black" stroke-width="0.05"/>
    </g>`
  output += '</svg>'

  const element = document.createElement('a')
  element.setAttribute('download', `${filename}.svg`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.setAttribute('href', window.URL.createObjectURL(new Blob([output], {
    type: 'text/plain;charset=utf-8'
  })))
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

  if (e.key === '1') downloadSVG('A1')
  if (e.key === '2') downloadSVG('A2')
  if (e.key === '3') downloadSVG('A3')
  if (e.key === '4') downloadSVG('A4')
  if (e.key === '5') downloadSVG('A5')
  if (e.key === '6') downloadSVG('A6')
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
