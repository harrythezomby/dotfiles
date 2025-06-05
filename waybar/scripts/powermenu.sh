#!/bin/bash

# Define options
options="🔒 Lock\n⏾ Suspend\n⏻  Shutdown"

# Use rofi to get user choice
choice=$(echo -e "$options" | rofi -dmenu -p "Power" -theme-str 'window { width: 20em; }')

case "$choice" in
    "🔒 Lock")
        hyprlock
        ;;
    "⏾ Suspend")
        systemctl suspend
        ;;
    "⏻  Shutdown")
        systemctl poweroff
        ;;
    *)
        exit 1
        ;;
esac