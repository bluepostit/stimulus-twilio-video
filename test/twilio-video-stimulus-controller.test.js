import { Application } from 'stimulus'
import StimulusTwilioController from '../src/twilio-video-stimulus-controller'

const buildView = () => {
  const html = `
  <div data-controller="video-call"
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

describe('TwilioVideoStimulusController', () => {
  describe('#joinCall', () => {
    it('adds a video element to the localVideo target', async () => {
      buildView()
      const localVideo = document.getElementById('local-video')
      expect(localVideo.innerHTML).toBe('')

      const application = Application.start()
      application.register('video-call', StimulusTwilioController)

      await new Promise((resolve, _reject) => {
        setTimeout(() => {
          const joinCallButton = document.getElementById('btn-join-call')
          joinCallButton.click()

          resolve()
        }, 100);
      })
      expect(localVideo.innerHTML).toMatch('<video')
    })
  })
})
