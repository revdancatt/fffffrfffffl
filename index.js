/* global R data preloadImagesTmr Image hash thisSize maxImage datasToUse noise story */

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
let fontMapLoaded = null
let fontLoading = false
const dumpOutputs = false
let fontCtx = null
let fontMap = null
let maxDensity = 0
const densityMap = {}
const colourMaps = []
const keepMaps = []
let startTime = null
let frames = 0
let lastFrameTime = 0
let failCounter = 0
let imagesLoaded = 0

const fps = 1000 / 24

function hexToRgb (hex) {
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
  r /= 255
  g /= 255
  b /= 255
  return { r, g, b }
}
// A function to convert a hex colour to a hsl colour
function rgbToHsl (rgb) {
  const { r, g, b } = rgb
  // Then to HSL
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

// We need a hsl to rgb function
function hslToRgb (hsl) {
  let { h, s, l } = hsl
  s /= 100
  l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return {
    r: Math.floor(255 * f(0)),
    g: Math.floor(255 * f(8)),
    b: Math.floor(255 * f(4))
  }
}

const microColours = ['#000000', '#FF0000', '#00FF00', '#FFFF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFFFF']
// convert the microColours in to rgb in a new array
const microColoursRgb = microColours.map(hex => {
  const rgb = hexToRgb(hex)
  return {
    r: Math.floor(rgb.r * 255),
    g: Math.floor(rgb.g * 255),
    b: Math.floor(rgb.b * 255)
  }
})

const qfont =
  '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eGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuNSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMTAtMDRUMTM6Mzg6NTkrMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMTAtMDRUMTM6Mzg6NTkrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTEwLTA0VDEzOjM4OjU5KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5Y2E5NDk0My01YWUyLTQ4ZDEtOWQwYS1iZTRlZGIzODBhYjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OWNhOTQ5NDMtNWFlMi00OGQxLTlkMGEtYmU0ZWRiMzgwYWIzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OWNhOTQ5NDMtNWFlMi00OGQxLTlkMGEtYmU0ZWRiMzgwYWIzIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIyIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iRGlzcGxheSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWNhOTQ5NDMtNWFlMi00OGQxLTlkMGEtYmU0ZWRiMzgwYWIzIiBzdEV2dDp3aGVuPSIyMDIxLTEwLTA0VDEzOjM4OjU5KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNSAoTWFjaW50b3NoKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5T7ATaAAACCElEQVRIid1WybLbMAwDOu//fxk9mLvExNNeOtU4sSlxpwSKyEHo+R8fz4J9A0R+qQviTwaBYibpmHf7yIVKn/ynBV2oKcdUN2knAR12CdkPTQHLrwShmPtg76CHvqJD5zwA6NeLxPP5+WcI97rGtDPH+4tq6JF0KaNj3hcgSc4Q1IX/sNLrHVq7XMoftCfLLD7vaU+CO4aemPSDjVrtNTr0vhzm5c/KwOcRIQqxOZtn3X2RtsNeHt56dgDlmazvzAanE4uZ4VgBgkfr46em/ctoge3ryzjc8637ukxfGGnRTEZCl8L6fpMdc5ENa8U4oXdnCoTU0HrZgA95zVI42pjkk2APJP2B7H2L3qwUy3I9sYkaMhyJGvOxzgrSlzG0iHKou+rt9KVgi5WeB4trh2L6I8GxwcW4BxPoOSFEcigLxuNw9oUCxc1cQHeDYoT2/o7GQdI7yv0oFblreG4gDXV7x1iSNNlDH9sW1OZHqm/pUa1rK2x3UPbQTiwh75pqaJK9FdFi+g6cO5TJfQnUC8YStt507CmZ3pqe7Mo9Xm2l2TbCRyfCz6MuS8BF1ivLPV6BDYRmr7fFCsV3//1el7DF0XQmsn31v3Mxb7l0bLAWMPDzClFBr8g1WmS53t971LQzr9HDbkrBW1fvzV1ukxfZHF3jVNZVy2XxHYb/7Xhx1P4ru//G+A0Ba373Wo6y7gAAAABJRU5ErkJggg=='

//  Work out what all our features are
const makeFeatures = () => {
  features.width = thisSize
  features.height = Math.floor(features.width * ratio)

  features.sourceImages = []
  const imagesToUse = Math.floor(R.prng() * 3) + 3
  while (features.sourceImages.length < imagesToUse) {
    const image = `${Math.floor(R.prng() * maxImage)}`.padStart(4, '0')
    // If the image isn't already in the array, add it
    if (!features.sourceImages.includes(image)) {
      features.sourceImages.push(image)
    }
  }
  features.currentImage = 0
  features.xShift = (R.prng() * 100 + 10) * (R.prng() < 0.5 ? -1 : 1)
  features.yShift = (R.prng() * 10 + 100) * (R.prng() < 0.5 ? -1 : 1)
  // Sometimes we swap the x and y shift
  if (R.prng() < 0.5) {
    const temp = features.xShift
    features.xShift = features.yShift
    features.yShift = temp
  }
  // Sometimes we make them both the same
  if (R.prng() < 0.1) features.yShift = features.xShift
  if (R.prng() < 0.1) features.xShift = features.yShift
  // Sometimes we modify them a bit
  if (R.prng() < 0.1) features.xShift *= R.prng() * 0.4 - 0.2
  if (R.prng() < 0.1) features.yShift *= R.prng() * 0.4 - 0.2

  // sometimes we'll trash the shifts
  if (R.prng() < 0.1) {
    if (R.prng() < 0.5) {
      features.xShift *= R.prng() * 0.3 + 0.1
    } else {
      features.yShift *= R.prng() * 0.3 + 0.1
    }
  }

  features.xPhase = (R.prng() * 1000 + 3000) * (R.prng() < 0.5 ? -1 : 1)
  features.yPhase = (R.prng() * 3000 + 1000) * (R.prng() < 0.5 ? -1 : 1)
  // Sometimes we swap the x and y phase
  if (R.prng() < 0.5) {
    const temp = features.xPhase
    features.xPhase = features.yPhase
    features.yPhase = temp
  }
  // Sometimes we make them both the same
  if (R.prng() < 0.1) features.yPhase = features.xPhase
  if (R.prng() < 0.1) features.xPhase = features.yPhase
  // Sometimes we modify them a bit
  if (R.prng() < 0.1) features.xPhase *= R.prng() * 0.4 - 0.2
  if (R.prng() < 0.1) features.yPhase *= R.prng() * 0.4 - 0.2

  // sometimes we'll trash the phases
  if (R.prng() < 0.0) {
    if (R.prng() < 0.5) {
      features.xPhase *= R.prng() * 2 + 1
    } else {
      features.yPhase *= R.prng() * 2 + 1
    }
  }

  features.blackAndWhite = R.prng() < 0.04

  // Set all the text stuff here
  features.killSceenShowOffset = R.prng() * 10000 + 10000
  features.killSceenShowMod = R.prng() * 1000 + 500
  features.killScreenCurrentMode = false
  features.killSceenCurrentPosition = 0
  features.killScreenChance = 0.1

  features.gotoPhase = R.prng() * 4000 + 1000
  features.gogoOffset = R.prng() * 4000 + 1000

  features.story1 = story[0]
  features.story2 = story[1]
  features.story3 = story[2]
  features.storyPointer = 3
  features.storyTick = 0
  features.oneThirdSize = Math.floor(features.width * features.height / 3)
  features.story1Position = Math.floor(R.prng() * (features.oneThirdSize - features.story1.length))
  features.story2Position = Math.floor(R.prng() * (features.oneThirdSize - features.story2.length)) + features.oneThirdSize
  features.story3Position = Math.floor(R.prng() * (features.oneThirdSize - features.story3.length)) + (features.oneThirdSize * 2)
  features.storyToChange = 1
}

//  Call the above make features, so we'll have the window.$fxhashFeatures available
//  for fxhash
makeFeatures()

console.table(features)

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

// This function will write a letter at the given position
const writeLetter = (ctx, letter, position, colour) => {
  const char = fontMap[letter]
  const pixelSize = {
    width: position.width / 8,
    height: position.height / 8
  }
  // console.log(colour)
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (char[y][x] === 1) {
        ctx.fillStyle = colour
        ctx.fillRect(position.x + (x * pixelSize.width), position.y + (y * pixelSize.height), pixelSize.width, pixelSize.height)
      }
    }
  }
}

const drawCanvas = async () => {
  let msDiff = 0
  if (!startTime) {
    startTime = Date.now()
  } else {
    // Check to see how much time has passed since the last tick
    msDiff = Date.now() - startTime
  }
  msDiff += 5000
  let framesAdvanced = 0
  // Set the frames advance
  frames = Math.floor(msDiff / (1000 / fps))
  if (frames !== lastFrameTime) {
    framesAdvanced = frames - lastFrameTime
    lastFrameTime = frames
  }

  //  Let the preloader know that we've hit this function at least once
  drawn = true
  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  // During this whole thing we may do things differently depending on the mode
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, w, h)

  // Work out the size of a "tile" in pixels
  const tileWidth = w / features.width
  const tileHeight = h / features.height
  const colAdjustSpeed = 1
  const newRGBColourAdjuster = (Math.sin(msDiff / (765 * colAdjustSpeed)) + 1) / 2 * 0.8 + 0.1
  const closestRGBColourAdjuster = (Math.sin(msDiff / (987 * colAdjustSpeed)) + 1) / 2 * 0.8 + 0.1
  const microColoursRgbAdjuster = ((Math.sin(msDiff / (1000 * colAdjustSpeed)) + 1) / 2) * 0.8 + 0.1

  // Make an array filled with the value null, that's the size of the features.width * features.height
  const specialCharacters = Array(features.width * features.height).fill(null)

  // Put the GOTO 10 in
  const gotoStr = '> GOTO 10'
  if (Math.sin((msDiff + features.gogoOffset) / features.gotoPhase) > 0.33) {
    for (let y = 0; y < features.height; y++) {
      if (Math.sin((msDiff / 300) + (y / features.height * 4000)) > 0.95) {
        for (let c = 0; c < gotoStr.length; c++) {
          specialCharacters[(y * features.width) + c] = gotoStr[c]
        }
      }
    }
  }

  const killScreen = noise.perlin2(features.killSceenShowOffset, msDiff / features.killSceenShowMod) > 0.1
  const killScreenText = '256 KILL SCREEN'
  if (features.killScreenCurrentMode !== killScreen) {
    features.killScreenCurrentMode = killScreen
    features.killSceenCurrentPosition = Math.floor(R.prng() * (features.height * features.width - killScreenText.length))
  }

  if (features.killScreenCurrentMode === true) {
    for (let p = 0; p < killScreenText.length; p++) {
      specialCharacters[features.killSceenCurrentPosition + p] = killScreenText[p]
    }
  }
  let positionPointer = 0

  // Add in the story
  for (let p = 0; p < features.story1.length; p++) specialCharacters[features.story1Position + p] = features.story1[p]
  for (let p = 0; p < features.story2.length; p++) specialCharacters[features.story2Position + p] = features.story2[p]
  for (let p = 0; p < features.story3.length; p++) specialCharacters[features.story3Position + p] = features.story3[p]

  // Now loop through the tiles based on the height and width for y and x
  for (let y = 0; y < features.height; y++) {
    for (let x = 0; x < features.width; x++) {
      const tweakX = x + Math.floor(noise.perlin3(x / 10, y / 10, msDiff / 1000) * 8)
      const tweakY = y + Math.floor(noise.perlin3(x / 10, y / 10, msDiff * 0.763 / 1000) * 8)
      const whichImage = Math.floor(((Math.sin((msDiff + (tweakY * features.yShift)) / features.yPhase) + Math.cos((msDiff + (tweakX * features.xShift)) / features.xPhase)) + 2) / 4 * colourMaps.length)
      const thisColourMap = colourMaps[whichImage]

      // Grab the tile position
      const position = {
        x: x * tileWidth,
        y: y * tileHeight,
        width: tileWidth,
        height: tileHeight
      }
      const index = `${x},${y}`
      let colour = { r: 0, g: 0, b: 0 }
      try {
        colour = thisColourMap[index].originalRGB
      } catch (e) {
        console.log('Trouble at colour mill')
        console.log('Length of colourMaps: ', colourMaps.length)
        console.log('whichImage: ', whichImage)
        console.log('thisColourMap...')
        console.log(thisColourMap)
      }
      if (R.prng() < 0.5 * newRGBColourAdjuster) colour = thisColourMap[index].newRGB
      if (R.prng() < 0.4 * closestRGBColourAdjuster) colour = thisColourMap[index].closestRGB
      if (R.prng() < 0.3 * microColoursRgbAdjuster) colour = microColoursRgb[Math.floor(R.prng() * (microColoursRgb.length - 2)) + 1]

      // if we are black and white then we need to do some extra stuff
      if (features.blackAndWhite) {
        const grey = Math.floor((colour.r + colour.g + colour.b) / 3)
        colour = {
          r: grey,
          g: grey,
          b: grey
        }
      }

      let finalColour = `rgb(${colour.r},${colour.g},${colour.b})`
      const density = thisColourMap[index].density
      let possibleLetters = densityMap[density]
      // If the density is greater then 0 then add the previous row of letters to the possible letters
      if (density > 0) possibleLetters = [...possibleLetters, ...densityMap[density - 1]]
      // If the density is less then 35 then add the next row of letters to the possible letters
      if (density < 35) possibleLetters = [...possibleLetters, ...densityMap[density + 1]]
      // remove any duplicates
      possibleLetters = [...new Set(possibleLetters)]
      let letter = possibleLetters[Math.floor(R.prng() * possibleLetters.length)]
      // If we are showing the killScreen, set the colour and letter here
      let fullSizeSpecial = false

      if (specialCharacters[positionPointer]) {
        finalColour = 'rgb(255, 255, 255)'
        letter = specialCharacters[positionPointer]
        fullSizeSpecial = true
      }

      // if we don't have a last letter in this position, then we need to set it
      if (!thisColourMap[index].lastColour || thisColourMap[index].frame > thisColourMap[index].updateOnFrame || specialCharacters[positionPointer]) {
        thisColourMap[index].lastLetter = letter
        thisColourMap[index].lastColour = finalColour
        thisColourMap[index].frame -= thisColourMap[index].updateOnFrame
      }

      if (!fullSizeSpecial) {
        position.width = Math.floor(position.width * (thisColourMap[index].originalHSL.l + 25) / 100)
        position.height = Math.floor(position.height * (thisColourMap[index].originalHSL.l + 25) / 100)
        position.x = Math.floor(position.x - ((position.width - tileWidth) / 2))
        position.y = Math.floor(position.y - ((position.height - tileHeight) / 2))
      }

      // Write the letter
      writeLetter(ctx, thisColourMap[index].lastLetter, position, thisColourMap[index].lastColour)

      for (let i = 0; i < colourMaps.length; i++) {
        colourMaps[i][index].frame += framesAdvanced
      }

      positionPointer++
    }
  }

  // Corrupter
  for (let i = 0; i < framesAdvanced; i++) {
    if (R.prng() < 0.2) {
      const fromImage = Math.floor(R.prng() * colourMaps.length)
      const toImage = Math.floor(R.prng() * colourMaps.length)
      const thisIndex = `${Math.floor(R.prng() * features.width)},${Math.floor(R.prng() * features.height)}`
      const tempHolder = colourMaps[fromImage][thisIndex]
      colourMaps[fromImage][thisIndex] = colourMaps[toImage][thisIndex]
      colourMaps[toImage][thisIndex] = tempHolder
    }

    features.storyTick++
    if (features.storyTick > 2.4 * 12) {
      // Move the story along
      if (features.storyToChange === 1) {
        features.story1 = story[features.storyPointer]
        features.story1Position = Math.floor(R.prng() * (features.oneThirdSize - features.story1.length))
      }
      if (features.storyToChange === 2) {
        features.story2 = story[features.storyPointer]
        features.story2Position = Math.floor(R.prng() * (features.oneThirdSize - features.story2.length)) + features.oneThirdSize
      }
      if (features.storyToChange === 3) {
        features.story3 = story[features.storyPointer]
        features.story3Position = Math.floor(R.prng() * (features.oneThirdSize - features.story3.length)) + (features.oneThirdSize * 2)
      }
      features.storyPointer++
      // If we have gone off the end of the story go back to the start
      if (features.storyPointer >= story.length) features.storyPointer = 0
      features.storyTick = 0
      features.storyToChange++
      if (features.storyToChange > 3) features.storyToChange = 1
      features.story1Position += features.width
      features.story2Position += features.width
      features.story3Position += features.width
    }
  }

  // If we are dumping outputs, then we want to download the image
  if (dumpOutputs) await autoDownloadCanvas()

  // Redraw in the next animation frame
  window.requestAnimationFrame(drawCanvas)
}

const autoDownloadCanvas = async (showHash = false) => {
  const element = document.createElement('a')
  element.setAttribute('download', `fffffrfffffl_${hash}`)
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
  if (!fontLoading) {
    fontLoading = true
    const fontBuffer = document.createElement('canvas')
    fontBuffer.width = 472
    fontBuffer.height = 8
    fontCtx = fontBuffer.getContext('2d')

    const fontImage = new Image()
    fontImage.onload = function () {
      fontMapLoaded = true
      fontCtx.drawImage(fontImage, 0, 0)
      fontMap = {}
      for (let o = 0; o < 472 / 8; o++) {
        const charCode = String.fromCharCode(32 + o)
        const iData = fontCtx.getImageData(o * 8, 0, 8, 8)
        const charArray = []
        for (let y = 0; y < 8; y++) {
          const row = []
          for (let x = 0; x < 8; x++) {
            row.push(iData.data[(y * 8 + x) * 4] === 255 ? 1 : 0)
          }
          charArray.push(row)
        }
        fontMap[charCode] = charArray
      }

      // Now we want to work out the pixel density of each chat in the fontMap
      // First turn the keys into an array
      const fontMapKeys = Object.keys(fontMap)
      const fontMapDensity = {}
      // Now loop through the keys and work out the density
      for (let i = 0; i < fontMapKeys.length; i++) {
        const letter = fontMapKeys[i]
        const char = fontMap[letter]
        let density = 0
        for (let y = 0; y < char.length; y++) {
          for (let x = 0; x < char[y].length; x++) {
            if (char[y][x] === 1) density++
          }
        }
        fontMapDensity[letter] = density
      }
      // Now go the other way and make a new densityMap

      // Loop throight the fontMapDensity
      const lowestDensity = 0
      let highestDensity = 0
      const fontMapDensityKeys = Object.keys(fontMapDensity)
      for (let i = 0; i < fontMapDensityKeys.length; i++) {
        const letter = fontMapDensityKeys[i]
        const density = fontMapDensity[letter]
        if (density > highestDensity) highestDensity = density
        if (!densityMap[density]) densityMap[density] = []
        densityMap[density].push(letter)
      }
      // Now we want to loop from the lowest density to the highest density
      // making sure we have something in each one
      for (let i = lowestDensity; i <= highestDensity; i++) {
        // Check to see if we DON'T have an entry for this density
        if (!densityMap[i]) {
          // Grab the previous row
          const previousRow = densityMap[i - 1]
          let nextRow = []
          // Loop through next rows until we find one with something in it
          for (let j = i + 1; j <= highestDensity; j++) {
            if (densityMap[j] && nextRow.length === 0) {
              // We have found an empty row, so we can use this
              nextRow = densityMap[j]
            }
          }
          // Now we have a previousRow and nextRow, we can put the contents of both into the densityMap
          densityMap[i] = previousRow.concat(nextRow)
          // Remove subplicates from the array
          densityMap[i] = [...new Set(densityMap[i])]
        }
      }
      // Grab the highest key value from the densityMap
      const densityMapKeys = Object.keys(densityMap)
      maxDensity = parseInt(densityMapKeys[densityMapKeys.length - 1], 10)
    }
    fontImage.src = `data:image/png;base64,${qfont}`
  }

  //  If paper1 has loaded and we haven't draw anything yet, then kick it all off
  console.log(`Loading: ${failCounter} : ${data.length}/${datasToUse} (${fontMapLoaded}))`)
  if (!drawn && fontMapLoaded && (data.length === datasToUse || failCounter > 1 * 3 * 60 * 20)) {
    // Create a new canvas element which is the width and height of the image
    // Loop through each data item
    for (let i = 0; i < data.length; i++) {
      const canvas = document.createElement('canvas')
      canvas.width = thisSize
      canvas.height = thisSize * ratio
      // Get the context of the canvas
      const ctx = canvas.getContext('2d')
      // Now grab the base64 encoded data from the first element of the data array
      const base64Data = data[i]
      // This is a png encoded image, now decode it back onto the canvas
      const image = new Image()
      // Can we load the image in an async way?
      image.onload = function () {
        ctx.drawImage(image, 0, 0)
        console.log('Loaded image', i)

        const imageData = ctx.getImageData(0, 0, features.width, features.height)
        const pixelData = imageData.data
        // convert microColours into hsl
        const microHsl = []
        for (let i = 0; i < microColours.length; i++) {
          const hsl = rgbToHsl(hexToRgb(microColours[i]))
          microHsl.push(hsl)
        }
        const colourMapData = {}
        let x = 0
        let y = 0
        for (let j = 0; j < pixelData.length; j += 4) {
          const r = pixelData[j]
          const g = pixelData[j + 1]
          const b = pixelData[j + 2]
          // convert to hsl
          const hsl = rgbToHsl({ r: r / 255, g: g / 255, b: b / 255 })
          // Work out which microColour this is closest to using only the hue, remember that hue is a circle
          // and we wrap around at 100
          let closest = 0
          let closestDistance = 1000
          for (let j = 0; j < microHsl.length; j++) {
            const distance = Math.abs(microHsl[j].h - hsl.h) + Math.abs(microHsl[j].s - hsl.s) + Math.abs(microHsl[j].l - hsl.l)
            if (distance < closestDistance) {
              closestDistance = distance
              closest = j
            }
          }
          // Now we have the closest microColour, we can set the pixel to that colour
          const colour = rgbToHsl(hexToRgb(microColours[closest]))
          const closestRgb = hexToRgb(microColours[closest])
          closestRgb.r = Math.floor(closestRgb.r * 255)
          closestRgb.g = Math.floor(closestRgb.g * 255)
          closestRgb.b = Math.floor(closestRgb.b * 255)
          const newRgb = hslToRgb({ h: colour.h, s: 100, l: hsl.l })
          const index = `${x},${y}`
          const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)
          const thisDensity = Math.floor(luminance / 255 * (maxDensity + 1))
          colourMapData[index] = {
            originalRGB: { r, g, b },
            originalHSL: hsl,
            closestRGB: closestRgb,
            closestHSL: colour,
            newRGB: newRgb,
            newHSL: { h: colour.h, s: 100, l: hsl.l },
            density: thisDensity,
            size: 1,
            updateOnFrame: Math.floor(R.prng() * 4 + 1) * 15,
            frame: 0,
            lastLetter: null,
            lastColour: null
          }
          x++
          if (x >= features.width) {
            x = 0
            y++
          }
        }
        colourMaps.push(colourMapData)
        keepMaps.push(colourMapData)

        // update the number of images loaded
        imagesLoaded++
        if (imagesLoaded === data.length) {
          console.log('All images loaded')
          init()
        }
      }
      image.src = `data:image/png;base64,${base64Data}`
    }

    // Attach it to the body

    // Loop through each data item
    /*
    colourMaps = []
    for (let i = 0; i < data.length; i++) {
      Object.entries(data[i]).forEach(([key, value]) => {
        data[i][key].updateOnFrame = Math.floor(R.prng() * 4 + 1) * 15
      })
      colourMaps.push(data[i])
      keepMaps.push(JSON.parse(JSON.stringify(data[i])))
    }
    */
    clearInterval(preloadImagesTmr)
    // init()
  }

  failCounter++
}
