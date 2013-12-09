---
layout: post
title: Sending Base64 Encoded Data via HTTP in C++ using openFrameworks and Poco Net Libraries
feed: true
category: creative-coding
tags: c++ openFrameworks featured
---
I needed a simple way to submit data to a server using C++, this example shows
how you can make use of the Poco libraries provided in openFrameworks to
simplify this task.

<!--break-->

The process is quite straightforward, if you've got your head around how the
Poco libraries work. This took a bit of googling, but eventually I came up
with a working example.

My first attempt was to add the image (binary) data as a part, thus using
a multipart form encoding, but I could not get this to work. Until I've worked
out how to get multipart form encoding working with Poco::Net::HTMLForm I
guess I'll stick with this.

This code passes the binary data buffer (with the image data in it) to
a base64 encoder (also provided in the Poco libraries) and then adds it as
a standard form item to the form.

Code is available in this <a href="https://gist.github.com/darrenmothersele/7597016">Gist</a>.

<script src="https://gist.github.com/darrenmothersele/7597016.js"></script>
