// Write some IoT
import NeoPixel from 'neopixel'
import Timer from 'timer'

interface Level {
  level0: number
  duration0: number
  level1: number
  duration1: number
}
interface Timing {
  mark: Level
  space: Level
  reset: Level
}
type Color = number
interface NeoMatrixConstructorParam {
  height: number
  width: number
  pin: number
  order?: string
  timing?: Timing
}

class NeoMatrix {
  private neoPixel: NeoPixel
  public readonly width: number
  public readonly height: number
  public readonly length: number
  public constructor({ height, width, pin, timing, order }: NeoMatrixConstructorParam) {
    this.length = height * width
    this.height = height
    this.width = width
    this.neoPixel = new NeoPixel({
      length: this.length,
      pin,
      // timing,
      order,
    })
  }
  public setPixel(x: number, y: number, color: Color): void {
    const a = x * this.width
    const b = x & 1 ? this.height - y - 1 : y
    const i = a + b
    this.neoPixel.setPixel(i, color)
  }
  public fill(color: Color, index?: number, count?: number): void {
    if (index == null) {
      this.neoPixel.fill(color)
    } else if (count == null) {
      this.neoPixel.fill(color, index)
    } else {
      this.neoPixel.fill(color, index, count)
    }
  }
  public update(): void {
    this.neoPixel.update()
  }
  public set brightness(b: number) {
    this.neoPixel.brightness = b
  }
  public makeRGB(r: number, g: number, b: number, w?: number): Color {
    return this.neoPixel.makeRGB(r, g, b, w)
  }
  public makeHSB(h: number, s: number, b: number, w?: number): Color {
    return this.neoPixel.makeHSB(h, s, b, w)
  }
  public close(): void {
    this.neoPixel.close()
  }
}

const np = new NeoMatrix({
  width: 16,
  height: 16,
  pin: 21,
  order: 'GRB',
})

// np.brightness = 16
np.brightness = 255

let count = 0
const r = 6
const c = 7.5
const black = np.makeRGB(0, 0, 0)
const red = np.makeRGB(255, 30, 0)
const blue = np.makeRGB(0, 30, 240)
function plot(np: NeoMatrix, rad: number, r: number, color: number): void {
  const y = Math.round(c + r * Math.sin(rad))
  const x = Math.round(c + r * Math.cos(rad))
  np.setPixel(x, y, color)
}
Timer.repeat((): void => {
  count++
  np.fill(black)
  const rad = Math.PI * (count / 30)
  plot(np, rad, r, red)
  const rad2 = Math.PI * (count / 15)
  plot(np, rad2, r / 2, blue)
  np.update()
}, 30)
