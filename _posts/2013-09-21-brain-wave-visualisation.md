---
layout: post
title: Visualising mind activity with a hacked toy EEG
category: hardware
tags: arduino eeg featured
---
The MindFlex toy includes a headset that reads EEG wave data. There's
lots of information on hacking this toy to create a simple EEG machine
using the limited data the headset provides by default. In this project
I have extracted the full RAW EEG data using the same toy headset from
the MindFlex game.

<!--break-->

<strong>Update: </strong> I've posted an update to this blog, where I provide
details of how to extract the <a href="/blog/2013/10/07/mindflex-raw-eeg-data/">
full RAW EEG data from the MindFlex headset</a>.

<strong>Friendly Warning and Disclaimer:</strong>
Hack your toys at your own risk. I'm not responsible for any damage you do
to yourself or your belongings. This information is provided here for
information and education only. If you use the original hack and just use the
data available in normal mode then the MindFlex still works as a game as
originally intended. If you enable RAW EEG output then you break the toy!

## Reading brain waves

An obvious place for us to start on this project might have been with the
excellent OpenEEG project, but while being open, it still has substantial
costs and complexity in getting up and running. For this project we looked
for a simpler approach.

EEG technology has been incorporated into various toys and household items
before. There are various commercial options available based on NeuroSky's
ThinkGear chip.

The original <a href="http://frontiernerds.com/brain-hack">Frontier Nerds</a>
blog post from 2010 provides a great starting point, but I've made a few
changes along the way, including successfully extracting the RAW EEG values
from the MindFlex toy.

## Budget EEG with the TGAM1

The TGAM1 is the controller board responsible for processing the EEG signals
in all of the products based on the NeuroSky ThinkGear chip. NeuroSky no longer
sell the boards in small quantities (I've had confirmation of this from
their business development team that this is due to support resources) and
instead recommend that you buy the BrainWave starter kit. This is probably a
good idea if you want easy access to EEG data, but they are still over 100 GBP
to buy in the UK, and the toys are available for only 40.

When you open the left compartment on the MindFlex you will see this:

<img src="/img/project/mindflex-inner.jpg" alt="Inside the MindFlex">

The small board located on the top at the bottom right is the TGAM1 board.

The basic hack needs just two solder points. You solder on to the <strong>T</strong>
pin to get the data out, and another connection for a common ground between
your arduino circuit and the TGAM1. I have also solder two more connections on,
which I will explain later.

<img src="/img/project/mindflex-hack.png" alt="Connection on the TGAM1">

## Simple EEG reading

The basic data that comes out of the MindFlex headset by default actually gives
us quite a lot of information for only &pound;40. In the default configuration
you have soldered on only two connections, one for a common ground and one for
the serial data stream. I connect this to a SoftwareSerial pin on the Arduino
and read in the packets. Here's what data you get:

 * Signal strength (0 - 200) where 0 means good signal, and 200 indicates a problem with the connection.
 * Attention and Meditation eSense values. These are a proprietary measure that is calculated by the TGAM1 using NeuroSky's own algorithm. The toys based on this technology use the attention measure.
 * EEG power band values: A measure of the various power bands that has been pre-calculated by the chip, this updates once per second.

The <a href="https://github.com/kitschpatrol/Arduino-Brain-Library/">Arduino
Brain Library</a> already includes functionality for working with these
values.

## TGAM1 Region Change

If you bought the EU version and you're in EU then skip this bit.

The MindFlex, MindSet, Necomimi, etc all based on the TGAM1 that includes a
notch filter on the EEG wave to remove electrical noise from the data. If you
bought a MindFlex from a different region then you will need to adapt it to
work for you. For example, if you've bought a headset from the US it will have
a notch filter at 60Hz. In Europe our "mains hum" is at 50Hz. You can switch
the notch filter to work at the correct frequency with a bit of soldering.

## Getting full RAW EEG data

Now on to getting the full raw EEG data from the MindFlex headset. In addition
to the two connections you soldered on before there are two extra connections
required. This allows you to configure the TGAM1 board that is in the MindFlex
to switch between two modes. The 'configure' connection is actually called B1
on the TGAM1 board. In the MindFlex headset B1 is connected to GND via a 10K
resistor. I have marked this resistor with an X on the image.

You need to remove this 10K resistor from the circuit board, and connect B2 to
VCC via a 10K resistor to enable full raw EEG data output.

The full EEG data is output at the higher baud rate of 57600. You also get the
same packets as in normal mode.

You can switch back to normal mode, with just the basic data output at baud
rate of 9600 by connecting B1 back to GND with the 10K resistor instead of the
VCC connection.

## Signal strength

The normal data and raw data modes both give you the summary packet once every second. In this is a measure of signal strength. It should be zero to indicate that the board is getting good measurements. Anything more than 0 indicates poor signal, and 200 is used to indicate a problem.

When I had the Arduino hooked up to the computer serial port I struggled to get the signal strength to 0. When running off batteries (I have an Arduino Pro mini connected to the headset's battery pack) I have had no issues with
signal strength.

The issues were resolved by adding an extra GND connection from the Arduino and connecting to the body of the person being tested. I don't recommend this
approach and running the headset completely off batteries is recommended.

This requires no wired connection to the computer, hence the RF link that has been implemented.

## RF data link

I am using a cheap low-power RF transceiver to send the EEG packets to the computer. This makes the headset wireless and solves the signal strength problem that required the extra ground connection.

## Receiving the data

The <a href="https://github.com/kitschpatrol/Processing-Brain-Grapher">Processing Brain Grapher</a> is a good starting point to check everything is working but it only works when the headset is in normal mode and sending
the data via the serial port.

I am working on a Processing library that will work with the updated headset in full EEG mode, this giving access to the eSense meters, the EEG power band values, and the full EEG raw data. I'll be expanding this section as I make more progress with the libraries and visualisations.
