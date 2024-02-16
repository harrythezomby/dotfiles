import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';


const Apps = () => Widget.Button({
    className: 'apps',
    onClicked: () =>  App.toggleWindow('applauncher'),
    child: Widget.Label({
        label: '󰣇',
    }),
});

export default () => Apps({})