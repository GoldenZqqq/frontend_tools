export class TrafficLight {
  constructor(lights) {
    this._lights = lights
    this._currentIndex = 0
    this._time = Date.now()
  }

  _update() {
    while (1) {
      if (this._disTime() <= this.currentLight.lasts) {
        break
      }
      this._time += this.currentLight.lasts
      this._currentIndex = (this._currentIndex + 1) % this._lights.length
    }
  }

  get currentLight() {
    return this._lights[this._currentIndex]
  }

  _disTime() {
    return Date.now() - this._time
  }

  getCurrentLight() {
    // 更新一下灯的状态
    this._update()
    return {
      color: this.currentLight.color,
      remain: this.currentLight.lasts - this._disTime()
    }
  }
}
