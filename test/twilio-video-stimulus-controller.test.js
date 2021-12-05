import { Application } from 'stimulus'
import StimulusTwilioController from '../src/twilio-video-stimulus-controller'

const buildView = () => {
  const html = `
  <div id="controller"
    data-controller="video-call"
    data-video-call-access-token-value="twilio-jwt"
    data-video-call-room-id-value="room-id"
    data-video-call-buddy-video-width-value="video-width"
  >
    <div id="local-video" data-video-call-target="localVideo"></div>
    <div id="buddy-video" data-video-call-target="buddyVideo"></div>

    <div id="btn-join-call" data-action="click->video-call#joinCall"></div>
    <div id="btn-end-call" data-action="click->video-call#endCall"></div>
  </div>`
  document.body.innerHTML = html
}

const runSoon = async callback => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      callback()
      resolve()
    }, 100)
  })
}

describe('TwilioVideoStimulusController', () => {
  let application

  beforeEach(() => {
    buildView()
    application = Application.start()
    application.register('video-call', StimulusTwilioController)
  })

  describe('#joinCall', () => {
    it('adds a video element to the localVideo target', async () => {
      const localVideo = document.getElementById('local-video')

      await runSoon(() => {
        const joinCallButton = document.getElementById('btn-join-call')
        joinCallButton.click()
      })
      expect(localVideo.innerHTML).toMatch('<video')
    })

    it('triggers #callStarted', async () => {
      const controllerEl = document.getElementById('controller')
      const controller = application.getControllerForElementAndIdentifier(controllerEl, 'video-call')

      const callStarted = jest.fn()
      controller.callStarted = callStarted

      await runSoon(() => {
        const joinCallButton = document.getElementById('btn-join-call')
        joinCallButton.click()
      })
      expect(callStarted.mock.calls.length).toBe(1)
    })
  })
})
