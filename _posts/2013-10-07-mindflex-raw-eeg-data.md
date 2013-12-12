---
layout: post
title: Full RAW EEG data from the MindFlex headset hack
category: hardware
tags: arduino eeg featured
splash: Updating the MindFlex headset hack to enable full raw EEG data output.
---
There have been many hacks posted online over the past few
years that show how to build a simple EEG machine using the
Mattel MindFlex headset.

It's simple to interface this with the Arduino to read the
basic single signal EEG data the toy produces. The toy actually
only uses one of the measures (attention) but it outputs
various useful bits of information.

<!--break-->
All of this is detailed in the original <a href="http://frontiernerds.com/brain-hack">Frontier Nerds</a> blog post and on our [Brain Wave Visualisation](/blog/2013/09/21/brain-wave-visualisation/) project page.

The original hacks are all based around the preprocessed data that the TGAM1
board in the MindFlex toy produces. I have successfully modified one of these headsets to get full raw EEG data from it. I'm in the process of writing a
library and updating the project page with full details, but in the meantime here's how it works.

## Full raw EEG values

The TGAM1 board that is inside the MindFlex can run in three modes. One of these is 9600 bits per second normal mode which is how the MindFlex is configured by default. This outputs a packet of data approximately every second that includes signal strength, attention level, meditation level, and pre-calculated values for 8 EEG power bands.


<strong>Friendly Warning and Disclaimer:</strong>
Hack your toys at your own risk. I'm not responsible for any damage you do
to yourself or your belongings. This information is provided here for
information and education only. If you use the original hack and just use the
data available in normal mode then the MindFlex still works as a game as
originally intended. If you enable RAW EEG output then you break the toy!

To enable RAW EEG you need to remove a 10K resistor from the TGAM1 board, and solder an extra connection to the board, as shown in this image:

<img src="/img/project/mindflex-hack.png" alt="Connection on the TGAM1">

Remove the 10K resistor that appears where the red X is on the photo. You should double check with a multi-meter that you're removing the correct part. It is connected to the B1 port. This B1 port forms part of the configuration
of the TGAM1 board. In the MindFlex this 10k resistor connects the B1 port
to GND which configures it in normal mode at 9600 bps.

Solder a connection on to the B1 port, then you can add a new 10K resistor that
connects the B1 port to VCC. This enables raw output mode at 57600 bps.

You connect to the Arduino in the same way, but you can't use the Arduino
Brain Library with this configuration. I'm working on an update for this.

The TGAM1 chip still sends the summary data packets that you get in normal mode
once per second, but now you will also get a packet containing the raw EEG reading 512 times per second, approximately once every 2ms.
