[![https://nodei.co/npm/stimulus-twilio-video.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/stimulus-twilio-video.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/stimulus-twilio-video)

# Stimulus Twilio Video
A [Stimulus](https://stimulus.hotwired.dev/) controller for video calls using [Twilio](https://www.twilio.com/)'s [video](https://www.twilio.com/docs/video) API

## Install

For `yarn`:
```bash
yarn add stimulus-twilio-video
```
For `npm`:
```bash
npm add stimulus-twilio-video
```

## [Register](https://stimulus.hotwired.dev/reference/controllers#registration) the controller with your Stimulus application

```js
import { Application } from "stimulus"
import TwilioVideoController from 'stimulus-twilio-video'

const application = Application.start()
application.register('video-call', TwilioVideoController)
```

## Add Stimulus [values](https://stimulus.hotwired.dev/reference/values), [targets](https://stimulus.hotwired.dev/reference/targets) and [actions](https://stimulus.hotwired.dev/reference/actions) to your HTML

### 1. The wrapper container
The wrapper container needs the `data-controller` attribute, as well as a few **[values](https://stimulus.hotwired.dev/reference/values)**. The examples below assume assume that you registered the controller with the name `video-call`, as above.

```html
<div data-controller="video-call"
     data-video-call-access-token-value="YOUR TWILIO JWT"
     data-video-call-room-id-value="YOUR ROOM ID"
     data-video-call-buddy-video-width-value="200"
     >
...
</div>
```

#### Values
- `access-token` - a JWT which you have already prepared on your server. See the [Twilio API documentation](https://www.twilio.com/docs/video/tutorials/user-identity-access-tokens#generate-helper-lib)
- `room-id` - an ID which you have already generated on your server. It should be a unique string identifying the video call
- `buddy-video-width` - the *optional* width in pixels for the element showing the user's chat buddy's webcam video. (Default: 640)

### 2. The video [targets](https://stimulus.hotwired.dev/reference/targets)

This target will be used to attach and display the user's chat buddy's webcam video:
```html
<div data-video-call-target="buddyVideo"></div>

This target will be used to attach and display the user's own webcam video:
```html
<div data-video-call-target="localVideo"></div>
```

### 3. The call buttons

To allow the user to join and end the video call, you should add code similar to this. It uses Stimulus [actions](https://stimulus.hotwired.dev/reference/actions) to trigger the `joinCall` and `endCall` events which are defined in the controller.

```html
<div class="btn-call-start" data-action="click->video-call#joinCall">Call</div>
<div class="btn-call-end" data-action="click->video-call#endCall">End call</div>
```

## Responding to events

You might want your code to do something when an event happens, eg. show/hide part of the DOM when a buddy joins the call. This is possible if you **extend** the controller with a class of your own. You can implement the following methods:
- `callStarted()` - will be triggered when the user has successfully connected to the Twilio video call
- `callEnded()` - will be triggered when a buddy has disconnected, or when the user ends the call
- `buddyJoined()` - will be triggered when a buddy joins the call
- `buddyLeft()` - will be triggered when the buddy leaves the call

**Note**: If you choose to inherit the stimulus-twilio-video controller, you should **remove** the code above which registers that controller with the application. Instead, add your own controller along these lines:

```js
// ./controllers/video_call_controller.js
import TwilioVideoController from 'stimulus-twilio-video'

export default class extends TwilioVideoController {
  callStarted() {
    console.log('Call started!')
    // Do something interesting here, eg. hide the 'start call' button
  }

  callEnded() {
    console.log('Call ended!')
    // Do something interesting here, eg. show a message
  }

  buddyJoined() {
    console.log('Buddy has joined the call')
  }

  buddyLeft() {
    console.log('Buddy has left the call')
  }
}

```

## Demo App
[Here](https://github.com/bluepostit/twilio-demo-stimulus) is a Rails application which uses this package to build a simple one-to-one chat application.
