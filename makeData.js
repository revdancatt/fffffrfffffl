const fs = require('fs')
const path = require('path')
const {
  createCanvas,
  loadImage
} = require('canvas')

// These are the sizes we need to make
const sizes = [
  {
    width: 24,
    height: 24 / 3 * 4
  },
  {
    width: 24 * 2,
    height: 24 * 2 / 3 * 4
  },
  {
    width: 24 * 3,
    height: 24 * 3 / 3 * 4
  }
]

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

// Now we need to read in all the images from the source folder, only grab pngs
const sourceDir = path.join(__dirname, 'source')
const targetDir = path.join(__dirname, 'data')
const stagingDir = path.join(__dirname, 'staging')
const images = fs.readdirSync(sourceDir).filter(file => file.endsWith('.png'))
// Properly shuffle the array of images
for (let i = images.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  const temp = images[i]
  images[i] = images[j]
  images[j] = temp
}

// Set a counter so we can give the files the correct name
let index = 0
// This is the max density which we know to be 35
const maxDensity = 35
const microColours = ['#000000', '#FF0000', '#00FF00', '#FFFF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFFFF']

const doIt = async () => {
  // Loop through all the images
  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    const indexPadded = index.toString().padStart(4, '0')
    const filePath = path.join(sourceDir, image)
    console.log(`Processing ${filePath}`)
    // We need to make a file for each size
    for (let s = 0; s < sizes.length; s++) {
      const size = sizes[s]
      const outputPath = path.join(targetDir, `${indexPadded}_${size.width}.js`)
      // Create a canvas to draw on
      const canvas = createCanvas(size.width, size.height)
      const ctx = canvas.getContext('2d')
      // Load the image
      const image = await loadImage(filePath)
      // Draw the image on the canvas
      await ctx.drawImage(image, 0, 0, size.width, size.height)
      // Now we want to inline base64 encode the image we have just scaled down onto the canvas
      const base64Canvas = canvas.toDataURL('image/png').split(';base64,')[1]
      const outPNG = fs.createWriteStream(path.join(stagingDir, `${indexPadded}_${size.width}.png`))
      const streamPNG = canvas.createPNGStream()
      // Pipe the output as a PNG, but do it as a promise that we can await
      await new Promise((resolve, reject) => {
        streamPNG.pipe(outPNG)
        outPNG.on('finish', () => {
          resolve()
        })
      })
      const outputJS = `const data_${indexPadded} = '${base64Canvas}'
data.push(data_${indexPadded})
loadedOrder.push('${indexPadded}_${size.width}.js')
      `
      // Now we need to write the file
      fs.writeFileSync(outputPath, outputJS, 'utf-8')

      /*
      // Get the image data
      const imageData = ctx.getImageData(0, 0, size.width, size.height)
      const data = imageData.data
      // convert microColours into hsl
      const microHsl = []
      for (let i = 0; i < microColours.length; i++) {
        const hsl = rgbToHsl(hexToRgb(microColours[i]))
        microHsl.push(hsl)
      }

      // Build up the map
      const colourMap = {}
      let x = 0
      let y = 0
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
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
        const mapIndex = `${x},${y}`
        const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)
        const thisDensity = Math.floor(luminance / 255 * (maxDensity + 1))
        colourMap[mapIndex] = {
          originalRGB: { r, g, b },
          originalHSL: hsl,
          closestRGB: closestRgb,
          closestHSL: colour,
          newRGB: newRgb,
          newHSL: { h: colour.h, s: 100, l: hsl.l },
          density: thisDensity,
          size: 1,
          updateOnFrame: null,
          frame: 0,
          lastLetter: null,
          lastColour: null
        }
        data[i] = newRgb.r
        data[i + 1] = newRgb.g
        data[i + 2] = newRgb.b
        x++
        if (x >= size.width) {
          x = 0
          y++
        }
      }
      const outputJS = `const data_${indexPadded} = ${JSON.stringify(colourMap, null, 2)}
      data.push(data_${indexPadded})`
      // Now we need to write the file
      fs.writeFileSync(outputPath, outputJS)
      */
    }
    index++
  }
}
doIt()
