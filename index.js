/* global preloadImagesTmr fxhash fxrand paper1Loaded palettes */

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
let drawPaper = true
const features = {}
let resizeTmr = null
let mouseEventsSet = false

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

  // Pick a random palette to use
  features.palette = palettes[Math.floor(fxrand() * palettes.length)]
  // Loop through each colour in the palette and add a hsl value to it
  features.palette.colors.forEach((colour, index) => {
    features.palette.colors[index].hsl = hexToHsl(colour.value)
  })
  // Now sort the colors in the palette by the l value of the hsl
  features.palette.colors.sort((a, b) => {
    return a.hsl.l - b.hsl.l
  })

  features.backwall = {
    height: fxrand() * 0.15 + 0.15,
    xOffset: fxrand() * 0.4 - 0.2,
    yOffset: fxrand() * 0.1 - 0.05,
    colours: {
      left: features.palette.colors[0],
      right: features.palette.colors[features.palette.colors.length - 1],
      floor: features.palette.colors[1]
    }
  }

  // Work out the size of the skylight
  features.skylight = {
    back: fxrand() * 0.1 + 0.2,
    size: fxrand() * 0.4 + 0.2,
    height: fxrand() * 0.02 + 0.02
  }
  features.lastMousePos = {
    x: 0,
    y: 0
  }

  features.mousePos = {
    x: 0,
    y: 0
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
        canvas.height = 8192 / 2 / ratioMod
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

  // If we haven't set the mouse events yet do that here
  if (!mouseEventsSet) {
    // Grab the mouse position over the canvas taking into account the canvas position in the window
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      features.mousePos.x = ((e.clientX - rect.left) / cWidth) - 0.5
      features.mousePos.y = ((e.clientY - rect.top) / cHeight) - 0.5
    })
    mouseEventsSet = true
  }

  //  And draw it!!
  drawCanvas()
}

// A function to find the intersection of two lines made from four points
const findIntersection = (line1Point1, line1Point2, line2Point1, line2Point2) => {
  const x1 = line1Point1.x
  const y1 = line1Point1.y
  const x2 = line1Point2.x
  const y2 = line1Point2.y
  const x3 = line2Point1.x
  const y3 = line2Point1.y
  const x4 = line2Point2.x
  const y4 = line2Point2.y
  // Now we need to find the intersection of the two lines
  // First we need to find the gradient of each line
  const m1 = (y2 - y1) / (x2 - x1)
  const m2 = (y4 - y3) / (x4 - x3)
  // Now we need to find the y intercept of each line
  const c1 = y1 - (m1 * x1)
  const c2 = y3 - (m2 * x3)
  // Now we can find the intersection point
  const x = (c2 - c1) / (m1 - m2)
  const y = (m1 * x) + c1
  return { x, y }
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

  // Set the line width and colour
  ctx.lineWidth = w / 500
  ctx.strokeStyle = '#000'

  // Save the current state
  ctx.save()
  // Move the origin to the center of the canvas
  ctx.translate(w / 2, h / 2)

  // set the default mouse position to the last mouse position
  // If the mousePosition is different to the last mouse position, set the last mouse position to the current mouse position
  if (features.mousePos.x !== features.lastMousePos.x || features.mousePos.y !== features.lastMousePos.y) {
    features.lastMousePos = features.mousePos
  }

  // Draw the backwall line, starting half the height up the line
  // Work out the top and bottom point of the line
  const xOffset = w * features.backwall.xOffset + (features.lastMousePos.x * w * 0.1)
  const yOffset = h * features.backwall.yOffset + (features.lastMousePos.y * h * 0.05)

  const topPoint = {
    x: xOffset,
    y: -h * features.backwall.height / 2 + yOffset
  }
  const bottomPoint = {
    x: xOffset,
    y: h * features.backwall.height / 2 + yOffset
  }

  // Now work out the top edge of the left wall, to do this we want a vanishing point over on the right, a whole canvas width away
  const rightVanishingPoint = {
    x: w * 1.5,
    y: 0
  }
  const leftVanishingPoint = {
    x: -w * 1.5,
    y: 0
  }

  // Work out the gradient of the line between the top point and the right vanishing point
  const topLeftGradient = (rightVanishingPoint.y - topPoint.y) / (rightVanishingPoint.x - topPoint.x)
  const bottomLeftGradient = (rightVanishingPoint.y - bottomPoint.y) / (rightVanishingPoint.x - bottomPoint.x)
  const rightTopGradient = (leftVanishingPoint.y - topPoint.y) / (leftVanishingPoint.x - topPoint.x)
  const rightBottomGradient = (leftVanishingPoint.y - bottomPoint.y) / (leftVanishingPoint.x - bottomPoint.x)
  // Now draw a line from the top point to off the left side of the canvas (-w) from the top point using the gradient
  const leftWallTopPoint = {
    x: topPoint.x - w,
    y: topPoint.y - (topLeftGradient * w)
  }
  const leftWallBottomPoint = {
    x: bottomPoint.x - w,
    y: bottomPoint.y - (bottomLeftGradient * w)
  }
  const rightWallTopPoint = {
    x: topPoint.x + w,
    y: topPoint.y + (rightTopGradient * w)
  }
  const rightWallBottomPoint = {
    x: bottomPoint.x + w,
    y: bottomPoint.y + (rightBottomGradient * w)
  }

  // Fill in the back left wall
  const leftWallColour = features.backwall.colours.left.hsl
  ctx.beginPath()
  ctx.moveTo(leftWallTopPoint.x, leftWallTopPoint.y)
  ctx.lineTo(leftWallBottomPoint.x, leftWallBottomPoint.y)
  ctx.lineTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(topPoint.x, topPoint.y)
  ctx.closePath()
  ctx.fillStyle = `hsl(${leftWallColour.h}, ${leftWallColour.s}%, ${leftWallColour.l}%)`
  ctx.fill()

  // Fill in the back right wall
  const rightWallColour = features.backwall.colours.right.hsl
  ctx.beginPath()
  ctx.moveTo(rightWallTopPoint.x, rightWallTopPoint.y)
  ctx.lineTo(rightWallBottomPoint.x, rightWallBottomPoint.y)
  ctx.lineTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(topPoint.x, topPoint.y)
  ctx.closePath()
  ctx.fillStyle = `hsl(${rightWallColour.h}, ${rightWallColour.s}%, ${rightWallColour.l}%)`
  ctx.fill()

  // Fill in the floor
  const floorColour = features.backwall.colours.floor.hsl
  ctx.beginPath()
  ctx.moveTo(leftWallBottomPoint.x, leftWallBottomPoint.y)
  ctx.lineTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(rightWallBottomPoint.x, rightWallBottomPoint.y)
  ctx.lineTo(rightWallBottomPoint.x, h * 10)
  ctx.lineTo(leftWallBottomPoint.x, h * 10)
  ctx.closePath()
  ctx.fillStyle = `hsl(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%)`
  ctx.fill()

  // Fill in the ceiling in just off white
  ctx.beginPath()
  ctx.moveTo(leftWallTopPoint.x, leftWallTopPoint.y)
  ctx.lineTo(topPoint.x, topPoint.y)
  ctx.lineTo(rightWallTopPoint.x, rightWallTopPoint.y)
  ctx.lineTo(rightWallTopPoint.x, -h * 10)
  ctx.lineTo(leftWallTopPoint.x, -h * 10)
  ctx.closePath()
  ctx.fillStyle = 'hsl(0, 0%, 95%)'
  ctx.fill()

  // Draw the lines
  ctx.beginPath()

  // Back wall
  ctx.moveTo(topPoint.x, topPoint.y)
  ctx.lineTo(bottomPoint.x, bottomPoint.y)

  // Draw the top left line
  ctx.moveTo(topPoint.x, topPoint.y)
  ctx.lineTo(leftWallTopPoint.x, leftWallTopPoint.y)
  // Draw the bottom left line
  ctx.moveTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(leftWallBottomPoint.x, leftWallBottomPoint.y)
  // Draw the top right line
  ctx.moveTo(topPoint.x, topPoint.y)
  ctx.lineTo(rightWallTopPoint.x, rightWallTopPoint.y)
  // Draw the bottom right line
  ctx.moveTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(rightWallBottomPoint.x, rightWallBottomPoint.y)

  ctx.stroke()

  // Now I want to work out the position of a sky light, which is the first percent of the way away from the top of the wall
  const skyLightPercent1 = features.skylight.back
  const skyLightPercent2 = features.skylight.back + features.skylight.size
  const topRightMeasurePoint1 = {
    x: topPoint.x + (rightWallTopPoint.x - topPoint.x) * skyLightPercent1,
    y: topPoint.y + (rightWallTopPoint.y - topPoint.y) * skyLightPercent1
  }
  const topLeftMeasurePoint1 = {
    x: topPoint.x + (leftWallTopPoint.x - topPoint.x) * skyLightPercent1,
    y: topPoint.y + (leftWallTopPoint.y - topPoint.y) * skyLightPercent1
  }
  // Do the same but the second percent
  const topRightMeasurePoint2 = {
    x: topPoint.x + (rightWallTopPoint.x - topPoint.x) * skyLightPercent2,
    y: topPoint.y + (rightWallTopPoint.y - topPoint.y) * skyLightPercent2
  }
  const topLeftMeasurePoint2 = {
    x: topPoint.x + (leftWallTopPoint.x - topPoint.x) * skyLightPercent2,
    y: topPoint.y + (leftWallTopPoint.y - topPoint.y) * skyLightPercent2
  }
  // Now work out the gradients of the lines to the vanish point
  const topRightMeasurePoint1Gradient = (rightVanishingPoint.y - topRightMeasurePoint1.y) / (rightVanishingPoint.x - topRightMeasurePoint1.x)
  const topRightMeasurePoint2Gradient = (rightVanishingPoint.y - topRightMeasurePoint2.y) / (rightVanishingPoint.x - topRightMeasurePoint2.x)

  const topLeftMeasurePoint2Gradient = (leftVanishingPoint.y - topLeftMeasurePoint2.y) / (leftVanishingPoint.x - topLeftMeasurePoint2.x)
  const topLeftMeasurePoint1Gradient = (leftVanishingPoint.y - topLeftMeasurePoint1.y) / (leftVanishingPoint.x - topLeftMeasurePoint1.x)

  // Now work out the end points of the lines based on the gradient from the measure points to a position offscreen on the opposite side of the vanishing point
  const topRightMeasurePoint1EndPoint = {
    x: topRightMeasurePoint1.x - w,
    y: topRightMeasurePoint1.y - (topRightMeasurePoint1Gradient * w)
  }
  const topRightMeasurePoint2EndPoint = {
    x: topRightMeasurePoint2.x - w,
    y: topRightMeasurePoint2.y - (topRightMeasurePoint2Gradient * w)
  }
  const topLeftMeasurePoint1EndPoint = {
    x: topLeftMeasurePoint1.x + w,
    y: topLeftMeasurePoint1.y + (topLeftMeasurePoint1Gradient * w)
  }
  const topLeftMeasurePoint2EndPoint = {
    x: topLeftMeasurePoint2.x + w,
    y: topLeftMeasurePoint2.y + (topLeftMeasurePoint2Gradient * w)
  }

  // Find the intersection of the lines
  const skyLightBackPoint = findIntersection(topRightMeasurePoint1, topRightMeasurePoint1EndPoint, topLeftMeasurePoint1, topLeftMeasurePoint1EndPoint)
  const skyLightFrontPoint = findIntersection(topRightMeasurePoint2, topRightMeasurePoint2EndPoint, topLeftMeasurePoint2, topLeftMeasurePoint2EndPoint)
  const skyLightLeftPoint = findIntersection(topRightMeasurePoint1, topRightMeasurePoint1EndPoint, topLeftMeasurePoint2, topLeftMeasurePoint2EndPoint)
  const skyLightRightPoint = findIntersection(topRightMeasurePoint2, topRightMeasurePoint2EndPoint, topLeftMeasurePoint1, topLeftMeasurePoint1EndPoint)

  // Draw circles on the skyLight points
  // Set a mask from the four points
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(skyLightBackPoint.x, skyLightBackPoint.y)
  ctx.lineTo(skyLightRightPoint.x, skyLightRightPoint.y)
  ctx.lineTo(skyLightFrontPoint.x, skyLightFrontPoint.y)
  ctx.lineTo(skyLightLeftPoint.x, skyLightLeftPoint.y)
  ctx.closePath()
  ctx.clip()

  // Fill in the whole thing in sky blue
  ctx.fillStyle = 'hsl(200, 100%, 90%)'
  ctx.fill()

  const skylightHeight = features.skylight.height
  // Now draw the sky light, right side, in white
  ctx.fillStyle = 'hsl(0, 0%, 100%)'
  ctx.beginPath()
  ctx.moveTo(skyLightBackPoint.x, skyLightBackPoint.y)
  ctx.lineTo(skyLightRightPoint.x, skyLightRightPoint.y)
  ctx.lineTo(skyLightRightPoint.x, skyLightRightPoint.y - h * skylightHeight)
  ctx.lineTo(skyLightBackPoint.x, skyLightBackPoint.y - h * skylightHeight)
  ctx.closePath()
  ctx.fill()
  // Do the left side in darker grey
  ctx.fillStyle = 'hsl(0, 0%, 90%)'
  ctx.beginPath()
  ctx.moveTo(skyLightBackPoint.x, skyLightBackPoint.y)
  ctx.lineTo(skyLightLeftPoint.x, skyLightLeftPoint.y)
  ctx.lineTo(skyLightLeftPoint.x, skyLightLeftPoint.y - h * skylightHeight)
  ctx.lineTo(skyLightBackPoint.x, skyLightBackPoint.y - h * skylightHeight)
  ctx.closePath()
  ctx.fill()

  // Draw a line at the back in black
  ctx.strokeStyle = 'hsl(0, 0%, 66%)'
  ctx.lineWidth = w / 500
  ctx.beginPath()
  ctx.moveTo(skyLightBackPoint.x, skyLightBackPoint.y)
  ctx.lineTo(skyLightBackPoint.x, skyLightBackPoint.y - h * skylightHeight)
  ctx.lineTo(skyLightRightPoint.x, skyLightRightPoint.y - h * skylightHeight)
  ctx.moveTo(skyLightBackPoint.x, skyLightBackPoint.y - h * skylightHeight)
  ctx.lineTo(skyLightLeftPoint.x, skyLightLeftPoint.y - h * skylightHeight)
  ctx.stroke()

  // restore
  ctx.restore()

  // Draw around the edge of the sky light
  ctx.strokeStyle = 'hsl(0, 0%, 66%)'
  ctx.lineWidth = w / 500
  ctx.beginPath()
  ctx.moveTo(skyLightBackPoint.x, skyLightBackPoint.y)
  ctx.lineTo(skyLightRightPoint.x, skyLightRightPoint.y)
  ctx.lineTo(skyLightFrontPoint.x, skyLightFrontPoint.y)
  ctx.lineTo(skyLightLeftPoint.x, skyLightLeftPoint.y)
  ctx.closePath()
  ctx.stroke()

  // restore the state
  ctx.restore()

  // draw again on the next window animation frame
  window.requestAnimationFrame(drawCanvas)
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
