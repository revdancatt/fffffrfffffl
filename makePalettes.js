const fs = require('fs')
const path = require('path')
const palettes = require('./palettes.js')

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

const keepPalettes = []

// Loop through palettes
for (const palette of palettes.default) {
  // Grab all the colours
  const colours = palette.colors.map(colour => {
    return colour.value
  })
  let darkestLum = 99999
  let darkestColour = null
  // Loop through colours
  for (const colour of colours) {
    // Convert to HSL
    const hsl = hexToHsl(colour)
    // If the colour is darker than the darkest colour
    if (hsl.l < darkestLum) {
      // Set the darkest colour to this colour
      darkestLum = hsl.l
      darkestColour = colour
    }
  }
  // Remove the darkest colour from the palette
  colours.splice(colours.indexOf(darkestColour), 1)
  keepPalettes.push({
    background: darkestColour,
    tiles: colours
  })
}
// write out the file
fs.writeFileSync(path.join(__dirname, 'palettes.json'), JSON.stringify(keepPalettes, null, 2))
