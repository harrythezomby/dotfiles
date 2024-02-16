import Variable from 'resource:///com/github/Aylur/ags/variable.js';
import execAsync from 'resource:///com/github/Aylur/ags/utils.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

const brightnessLevel = Variable('0', {
    poll: [5000, ['bash', '-c', 'brightnessctl | grep -oE \'[0-9]+%\'']],
  });

const brightnessLevelLabel = () => Widget.Label({
    binds: [['label', brightnessLevel]],
    hpack: 'center',
})

function sh(cmd) {
    return function() {
      Utils.execAsync(['bash', '-c', cmd]);
    }; 
  }

const brightness = () => Widget.Button({
    onScrollUp: sh('brightnessctl set +1%'),
    onScrollDown: sh('brightnessctl set 1%-'),
    className: 'backlight',
    child: Widget.Box({
        children: [
            Widget.Label({
                label: " ",
            }),
            brightnessLevelLabel()
        ]

    })
})

export default () => brightness({})