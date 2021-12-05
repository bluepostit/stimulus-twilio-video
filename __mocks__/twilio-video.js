'use strict'

const tv = jest.createMockFromModule('twilio-video')

const connect = () => {
  const room = new Room()
  return new Promise((resolve, reject) => {
    resolve(room)
  })
}

class Track {
  constructor() {
    this.video = document.createElement('video')
  }

  attach() {
    return this.video
  }
}

class Room {
  constructor() {
    this.participants = []
  }

  on(key, _func) {
    // console.log(`${key} called`)
  }

  disconnect() {}

  get localParticipant() {
    return {
      tracks: []
    }
  }
}

const createLocalVideoTrack = () => {
  const track = new Track()
  return new Promise((resolve, _reject) => {
    resolve(track)
  })
}

tv.connect = connect
tv.createLocalVideoTrack = createLocalVideoTrack
module.exports = tv
