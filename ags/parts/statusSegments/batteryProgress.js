import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

const batteryProgress = () => {
    const batteryAvailable = Battery.available;
    if (batteryAvailable) {
      return Widget.Button({
        className: 'battery',
        child: Widget.Label({
            label: '  PC',
        })
      });
    }
  
    return Widget.Button({
    className: 'battery',
      hpack: 'center',
      connections:[
        [Battery, function(self, timeRemaining) {
            self.tooltipText = `${Battery.timeRemaining}`;

        }],
    ],
      
      child: Widget.Box({
        children: [
            Widget.Icon({
                binds: [['icon', Battery, 'icon-name']],
            }),
          Widget.Label({
            hpack: 'center',
            connections:[
                [Battery, function(self, percent) {
                    self.label = `${Battery.percent}%`;
                }]
            ]
          }),
        ]
      })
    });
  };

  export default () => batteryProgress({})