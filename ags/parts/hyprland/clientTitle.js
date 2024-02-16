import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

const ClientTitle = () => Widget.Label({
    maxWidthChars: 60,
    truncate: 'end',
    wrap: false,
    className: 'client-title',
    binds: [
      ['label', Hyprland.active.client, 'title', p => p || 'Hyprland | Harija'],
    ],
  });

  export default () => ClientTitle({})