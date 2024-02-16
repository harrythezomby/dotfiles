import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';


const Volume = () => Widget.Button({
    className: 'volume',
    onClicked: () => Audio.speaker.isMuted = !Audio.speaker.isMuted,
    onScrollUp: () => Audio.speaker.volume +=0.01,
    onScrollDown: () => Audio.speaker.volume -=0.01,
    onSecondaryClick: () => Utils.execAsync(['pavucontrol'])
    .then(out => print(out))
    .catch(err => print(err)),
    child: Widget.Box({
        spacing: 8,
        homogeneous: false,
        vertical: false,
        children: [
            Widget.Icon({
                className: 'icon',
                connections: [[Audio, self => {
                    if (!Audio.speaker)
                        return;

                    const vol = Audio.speaker.volume * 100;
                    const icon = [
                        [101, 'overamplified'],
                        [67,  'high'],
                        [34,  'medium'],
                        [1,   'low'],
                        [0,   'muted'],
                    ].find(([threshold]) => threshold <= vol)[1];

                    self.label = `Volume ${Math.floor(vol)}%`;
                    self.icon = `audio-volume-${icon}-symbolic`;
                    self.tooltipText = `Volume ${Math.floor(vol)}%`;
                }, 'speaker-changed']],
            }),
            Widget.Label({
                connections: [[Audio, self => {
                    if (!Audio.speaker)
                        return;

                    const vol = Audio.speaker.volume * 100;
                    const icon = [
                        [101, 'overamplified'],
                        [67,  'high'],
                        [34,  'medium'],
                        [1,   'low'],
                        [0,   'muted'],
                    ].find(([threshold]) => threshold <= vol)[1];

                    self.label = `${Math.floor(vol)}%`;
                    self.icon = `audio-volume-${icon}-symbolic`;
                    self.tooltipText = `${Audio.speaker.description}`;
                }, 'speaker-changed']],
            }),
        ],
    }),
});

export default () => Volume({})