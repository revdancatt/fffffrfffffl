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

// Now I need to add wobble points
features.wobblePoints = {}

// We want to have four wobble points for each position
const areas = ['backLine', 'rightSide', 'leftSide', 'skylightBack', 'skyLightRight', 'skyLightFront', 'skyLightLeft']
areas.forEach(area => {
  features.wobblePoints[area] = {
    top: [],
    bottom: []
  }
})
for (let i = 0; i < 4; i++) {
  areas.forEach(area => {
    features.wobblePoints[area].top.push({
      x: fxrand() - 0.5,
      y: fxrand() - 0.5
    })
    features.wobblePoints[area].bottom.push({
      x: fxrand() - 0.5,
      y: fxrand() - 0.5
    })
  })
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

// We need a function to calculate the point on the ceiling based on two points along the back lines
// For this we'll need the back lines, the vanishing points and the right and left % positions
const calculateFloorCeilingPoint = (backRightLine, backLeftLine, rightVanishingPoint, leftVanishingPoint, rightPercent, leftPercent, w, h) => {
  const topRightMeasurePoint = {
    x: backRightLine[0].x + ((backRightLine[1].x - backRightLine[0].x) * rightPercent),
    y: backRightLine[0].y + ((backRightLine[1].y - backRightLine[0].y) * rightPercent)
  }
  const topLeftMeasurePoint = {
    x: backLeftLine[0].x + ((backLeftLine[1].x - backLeftLine[0].x) * leftPercent),
    y: backLeftLine[0].y + ((backLeftLine[1].y - backLeftLine[0].y) * leftPercent)
  }
  // Work out the gradients on the lines to the vanishing point
  const topRightMeasurePointGradient = (rightVanishingPoint.y - topRightMeasurePoint.y) / (rightVanishingPoint.x - topRightMeasurePoint.x)
  const topLeftMeasurePointGradient = (leftVanishingPoint.y - topLeftMeasurePoint.y) / (leftVanishingPoint.x - topLeftMeasurePoint.x)

  // Workout the end points of the measure point lines
  const topRightMeasureEndPoint = {
    x: topRightMeasurePoint.x - w * 2,
    y: topRightMeasurePoint.y - (topRightMeasurePointGradient * w * 2)
  }
  const topLeftMeasureEndPoint = {
    x: topLeftMeasurePoint.x + w * 2,
    y: topLeftMeasurePoint.y + (topLeftMeasurePointGradient * w * 2)
  }
  // Now we need to find the intersection of the two lines
  const thisPoint = findIntersection(topRightMeasurePoint, topRightMeasureEndPoint, topLeftMeasurePoint, topLeftMeasureEndPoint)
  return thisPoint
}

const drawLine = (p1, p2, ctx) => {
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
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

  // ##########################################################################
  //
  // Work out where all the points are
  //
  // ##########################################################################
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

  // Now I want to work out the position of a sky light, which is the first percent of the way away from the top of the wall
  const skyLightPercent1 = features.skylight.back
  const skyLightPercent2 = features.skylight.back + features.skylight.size

  // Find the intersection of the lines
  // const skyLightBackPoint = findIntersection(topRightMeasurePoint1, topRightMeasurePoint1EndPoint, topLeftMeasurePoint1, topLeftMeasurePoint1EndPoint)
  const skyLightBackPoint = calculateFloorCeilingPoint([topPoint, rightWallTopPoint], [topPoint, leftWallTopPoint], rightVanishingPoint, leftVanishingPoint, skyLightPercent1, skyLightPercent1, w, h)
  const skyLightFrontPoint = calculateFloorCeilingPoint([topPoint, rightWallTopPoint], [topPoint, leftWallTopPoint], rightVanishingPoint, leftVanishingPoint, skyLightPercent2, skyLightPercent2, w, h)
  const skyLightLeftPoint = calculateFloorCeilingPoint([topPoint, rightWallTopPoint], [topPoint, leftWallTopPoint], rightVanishingPoint, leftVanishingPoint, skyLightPercent1, skyLightPercent2, w, h)
  const skyLightRightPoint = calculateFloorCeilingPoint([topPoint, rightWallTopPoint], [topPoint, leftWallTopPoint], rightVanishingPoint, leftVanishingPoint, skyLightPercent2, skyLightPercent1, w, h)

  // ##########################################################################
  //
  // Now fill in the areas
  //
  // ##########################################################################

  const leftWallColour = features.backwall.colours.left.hsl
  const rightWallColour = features.backwall.colours.right.hsl
  const floorColour = features.backwall.colours.floor.hsl
  const ceilingColour = {
    h: 0,
    s: 0,
    l: 95
  }
  ctx.fillStyle = 'white'
  ctx.beginPath()
  // Fill in the back left wall
  ctx.moveTo(leftWallTopPoint.x, leftWallTopPoint.y)
  ctx.lineTo(leftWallBottomPoint.x, leftWallBottomPoint.y)
  ctx.lineTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(topPoint.x, topPoint.y)
  ctx.closePath()
  // ctx.fillStyle = `hsl(${leftWallColour.h}, ${leftWallColour.s}%, ${leftWallColour.l}%)`

  // Fill in the back right wall
  ctx.moveTo(rightWallTopPoint.x, rightWallTopPoint.y)
  ctx.lineTo(rightWallBottomPoint.x, rightWallBottomPoint.y)
  ctx.lineTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(topPoint.x, topPoint.y)
  ctx.closePath()
  // ctx.fillStyle = `hsl(${rightWallColour.h}, ${rightWallColour.s}%, ${rightWallColour.l}%)`

  // Fill in the floor
  ctx.moveTo(leftWallBottomPoint.x, leftWallBottomPoint.y)
  ctx.lineTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(rightWallBottomPoint.x, rightWallBottomPoint.y)
  ctx.lineTo(rightWallBottomPoint.x, h * 10)
  ctx.lineTo(leftWallBottomPoint.x, h * 10)
  ctx.closePath()
  // ctx.fillStyle = `hsl(${floorColour.h}, ${floorColour.s}%, ${floorColour.l}%)`

  // Fill in the ceiling in just off white
  ctx.moveTo(leftWallTopPoint.x, leftWallTopPoint.y)
  ctx.lineTo(topPoint.x, topPoint.y)
  ctx.lineTo(rightWallTopPoint.x, rightWallTopPoint.y)
  ctx.lineTo(rightWallTopPoint.x, -h * 10)
  ctx.lineTo(leftWallTopPoint.x, -h * 10)
  ctx.closePath()
  // ctx.fillStyle = `hsl(${ceilingColour.h}, ${ceilingColour.s}%, ${ceilingColour.l}%)`
  ctx.fill()

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

  // restore
  ctx.restore()

  // ##########################################################################
  //
  // Now draw the lines
  //
  // ##########################################################################

  ctx.strokeStyle = 'hsl(0, 0%, 0%)'
  ctx.lineWidth = w / 500
  ctx.beginPath()

  // Loop through the wobble points and draw a line between them
  let wobbleDiv = 50
  for (let i = 0; i < features.wobblePoints.backLine.top.length - 1; i++) {
    // Back wall
    const pBackTop = {
      x: topPoint.x + features.wobblePoints.backLine.top[i].x * w / wobbleDiv,
      y: topPoint.y + features.wobblePoints.backLine.top[i].y * w / wobbleDiv
    }
    const pBackBottom = {
      x: bottomPoint.x + features.wobblePoints.backLine.bottom[i].x * w / wobbleDiv,
      y: bottomPoint.y + features.wobblePoints.backLine.bottom[i].y * w / wobbleDiv
    }
    const pRightTop = {
      x: rightWallTopPoint.x + features.wobblePoints.rightSide.top[i].x * w / wobbleDiv,
      y: rightWallTopPoint.y + features.wobblePoints.rightSide.top[i].y * w / wobbleDiv
    }
    const pRightBottom = {
      x: rightWallBottomPoint.x + features.wobblePoints.rightSide.bottom[i].x * w / wobbleDiv,
      y: rightWallBottomPoint.y + features.wobblePoints.rightSide.bottom[i].y * w / wobbleDiv
    }
    const pLeftTop = {
      x: leftWallTopPoint.x + features.wobblePoints.leftSide.top[i].x * w / wobbleDiv,
      y: leftWallTopPoint.y + features.wobblePoints.leftSide.top[i].y * w / wobbleDiv
    }
    const pLeftBottom = {
      x: leftWallBottomPoint.x + features.wobblePoints.leftSide.bottom[i].x * w / wobbleDiv,
      y: leftWallBottomPoint.y + features.wobblePoints.leftSide.bottom[i].y * w / wobbleDiv
    }

    drawLine(pBackTop, pBackBottom, ctx)
    drawLine(pBackTop, pRightTop, ctx)
    drawLine(pBackBottom, pRightBottom, ctx)
    drawLine(pBackTop, pLeftTop, ctx)
    drawLine(pBackBottom, pLeftBottom, ctx)
  }
  ctx.stroke()

  // Set a mask from the four points
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(skyLightBackPoint.x, skyLightBackPoint.y)
  ctx.lineTo(skyLightRightPoint.x, skyLightRightPoint.y)
  ctx.lineTo(skyLightFrontPoint.x, skyLightFrontPoint.y)
  ctx.lineTo(skyLightLeftPoint.x, skyLightLeftPoint.y)
  ctx.closePath()
  ctx.clip()

  ctx.strokeStyle = 'hsl(0, 0%, 66%)'
  ctx.lineWidth = w / 500
  ctx.beginPath()
  wobbleDiv = 100

  for (let i = 0; i < features.wobblePoints.backLine.top.length - 1; i++) {
    const pBackBottom = {
      x: skyLightBackPoint.x + features.wobblePoints.skylightBack.bottom[i].x * w / wobbleDiv,
      y: skyLightBackPoint.y + features.wobblePoints.skylightBack.bottom[i].y * w / wobbleDiv
    }
    const pBackTop = {
      x: skyLightBackPoint.x + features.wobblePoints.skylightBack.top[i].x * w / wobbleDiv,
      y: skyLightBackPoint.y + features.wobblePoints.skylightBack.top[i].y * w / wobbleDiv - h * skylightHeight
    }
    const pRightTop = {
      x: skyLightRightPoint.x + features.wobblePoints.skyLightRight.top[i].x * w / wobbleDiv,
      y: skyLightRightPoint.y + features.wobblePoints.skyLightRight.top[i].y * w / wobbleDiv - h * skylightHeight
    }
    const pLeftTop = {
      x: skyLightLeftPoint.x + features.wobblePoints.skyLightLeft.top[i].x * w / wobbleDiv,
      y: skyLightLeftPoint.y + features.wobblePoints.skyLightLeft.top[i].y * w / wobbleDiv - h * skylightHeight
    }
    drawLine(pBackTop, pBackBottom, ctx)
    drawLine(pBackTop, pRightTop, ctx)
    drawLine(pBackTop, pLeftTop, ctx)
  }
  ctx.stroke()

  ctx.restore()

  // Draw around the edge of the sky light
  ctx.strokeStyle = 'hsl(0, 0%, 66%)'
  ctx.lineWidth = w / 500
  ctx.beginPath()

  for (let i = 0; i < features.wobblePoints.backLine.top.length - 1; i++) {
    const pSLBack = {
      x: skyLightBackPoint.x + features.wobblePoints.skylightBack.bottom[i].x * w / wobbleDiv,
      y: skyLightBackPoint.y + features.wobblePoints.skylightBack.bottom[i].y * w / wobbleDiv
    }
    const pSLRight = {
      x: skyLightRightPoint.x + features.wobblePoints.skyLightRight.bottom[i].x * w / wobbleDiv,
      y: skyLightRightPoint.y + features.wobblePoints.skyLightRight.bottom[i].y * w / wobbleDiv
    }
    const pSLFront = {
      x: skyLightFrontPoint.x + features.wobblePoints.skyLightFront.bottom[i].x * w / wobbleDiv,
      y: skyLightFrontPoint.y + features.wobblePoints.skyLightFront.bottom[i].y * w / wobbleDiv
    }
    const pSLLeft = {
      x: skyLightLeftPoint.x + features.wobblePoints.skyLightLeft.bottom[i].x * w / wobbleDiv,
      y: skyLightLeftPoint.y + features.wobblePoints.skyLightLeft.bottom[i].y * w / wobbleDiv
    }
    drawLine(pSLBack, pSLRight, ctx)
    drawLine(pSLRight, pSLFront, ctx)
    drawLine(pSLFront, pSLLeft, ctx)
    drawLine(pSLLeft, pSLBack, ctx)
  }
  ctx.stroke()

  /*
  const rightLineTop = [topPoint, rightWallTopPoint]
  const rightLineBottom = [bottomPoint, rightWallBottomPoint]
  const leftLineTop = [topPoint, leftWallTopPoint]
  const leftLineBottom = [bottomPoint, leftWallBottomPoint]

  // Draw a grid of points along the cleaning every 10% of the way
  const dist = 14
  for (let r = 0; r < dist; r++) {
    for (let l = 0; l < dist; l++) {
      const CeilingPoint = calculateFloorCeilingPoint(rightLineTop, leftLineTop, rightVanishingPoint, leftVanishingPoint, r / 10, l / 10, w, h)
      const floorPoint = calculateFloorCeilingPoint(rightLineBottom, leftLineBottom, rightVanishingPoint, leftVanishingPoint, r / 10, l / 10, w, h)
      ctx.fillStyle = 'hsl(0, 0%, 0%)'
      ctx.beginPath()
      ctx.arc(CeilingPoint.x, CeilingPoint.y, w * Math.sqrt(r * l / 500000), 0, 2 * Math.PI)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(floorPoint.x, floorPoint.y, w * Math.sqrt(r * l / 500000), 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  for (let r = 0; r < dist; r++) {
    const startPointRight = calculateFloorCeilingPoint(rightLineTop, leftLineTop, rightVanishingPoint, leftVanishingPoint, r / 10, 0, w, h)
    const endPointRight = calculateFloorCeilingPoint(rightLineTop, leftLineTop, rightVanishingPoint, leftVanishingPoint, r / 10, dist / 10, w, h)
    const startPointLeft = calculateFloorCeilingPoint(rightLineTop, leftLineTop, rightVanishingPoint, leftVanishingPoint, 0, r / 10, w, h)
    const endPointLeft = calculateFloorCeilingPoint(rightLineTop, leftLineTop, rightVanishingPoint, leftVanishingPoint, dist / 10, r / 10, w, h)
    ctx.strokeStyle = 'hsl(0, 0%, 50%)'
    ctx.lineWidth = w / 500
    ctx.beginPath()
    ctx.moveTo(startPointRight.x, startPointRight.y)
    ctx.lineTo(endPointRight.x, endPointRight.y)
    ctx.moveTo(startPointLeft.x, startPointLeft.y)
    ctx.lineTo(endPointLeft.x, endPointLeft.y)
    ctx.stroke()
  }
  */
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
