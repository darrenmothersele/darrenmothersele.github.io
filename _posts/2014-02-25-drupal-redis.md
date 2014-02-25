---
layout: post
title: Drupal, Redis
feed: true
category: web-dev
tags: drupal featured drupal-planet
---

The easiest performance boost for any Drupal site is to install Redis.
This is a key-value store that you can use as a cache to drastically cut
down on the number of database calls Drupal is making. These instructions
are for Ubuntu 12.04.

<!--break-->

###Prerequisites

You need to install compilation tools as we'll be compiling the most recent
version of Redis from source. TCL is also a requirement.

    sudo apt-get install build-essential
    sudo apt-get install tcl8.5

###Download and Compile Redis

First download the most recent stable Redis version. At the time of writing
this is 2.8.6. Extract the source code and compile. Do this as root:

    wget http://download.redis.io/releases/redis-2.8.6.tar.gz
    cs redis-2.8.6
    make

After compilation it's a good idea to run the tests. You'll fail at this point
if you didn't install TCL.

    make test

Then install Redis on your system, again as root:

    make install

There is a script provided that will install the Redis service on Ubuntu.

    sudo ./utils/install_server.sh

###Drupal configuration

First download the Predis PHP library for Redis into your sites Libraries folder.
Predis library can be downloaded [here](https://github.com/nrk/predis) and should
be installed in `sites/all/libraries/predis`.

Download an install the [Redis Drupal module](https://drupal.org/project/redis).

Add the connection details to `settings.php` and the configuration required to
allow Drupal's cache system to use Redis, rather than the database.
Append this to `settings.php`...

    $conf['redis_client_interface'] = 'Predis';
    $conf['redis_client_host']      = '127.0.0.1';
    $conf['lock_inc']               = 'sites/all/modules/contrib/redis/redis.lock.inc';
    $conf['cache_backends'][]       = 'sites/all/modules/contrib/redis/redis.autoload.inc';
    $conf['cache_default_class']    = 'Redis_Cache';

Now enjoy super fast Drupal!

