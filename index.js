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
  features.squaresAcross = Math.floor(fxrand() * 2) + 2
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
  ctx.globalCompositeOperation = 'multiply'
  // Draw the squares

  for (let layer = 0; layer < features.layers; layer++) {
    ctx.strokeStyle = features.palette[layer]

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

      ctx.beginPath()
      ctx.moveTo(-square.size / 2 * w, -square.size / 2 * w)
      ctx.lineTo(square.size / 2 * w, -square.size / 2 * w)
      ctx.lineTo(square.size / 2 * w, square.size / 2 * w)
      ctx.lineTo(-square.size / 2 * w, square.size / 2 * w)
      ctx.lineTo(-square.size / 2 * w, -square.size / 2 * w)
      ctx.clip()

      // Now we're going to draw 30 vertical lines, moving our way from the corners
      const lines = 20
      const lineStep = (outterCorners.tr.x - outterCorners.tl.x) / lines
      ctx.save()
      ctx.rotate(square.rotate * Math.PI / 180)
      for (let j = 0; j < 30; j++) {
        ctx.beginPath()
        ctx.moveTo(outterCorners.tl.x + (j * lineStep), outterCorners.tl.y)
        ctx.lineTo(outterCorners.tl.x + (j * lineStep), outterCorners.bl.y)
        ctx.stroke()
      }
      ctx.restore()
      ctx.restore()
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
