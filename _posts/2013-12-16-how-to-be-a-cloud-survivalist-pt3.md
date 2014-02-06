---
layout: post
title: How to Be a Cloud Survivalist (part 3)
feed: true
category: misc
tags: misc featured
---

This is the third post in a series where I document the process of
implementing your own suite of cloud services. I covered the requirements
in the [previous post](/blog/2013/12/12/how-to-be-a-cloud-survivalist-pt2/),
and in this instalment I take a deeper look at what it takes to run your own email service.

<!--break-->

### Email server overview

Setting up an email server has a reputation for being
incredibly complicated, and needing a lot of work to keep safe and secure.
The reasons for this are two fold: There are a lot of bits of
technology involved in sending and delivering email, and secondly,
there are a lot of criminals out there looking for vulnerable servers to
exploit in order to send spam.

The main components of a mail system are

 * Mail User Agent (MUA) is the application you use to create, view, send and receive mail.
 * Mail Transfer Agent (MTA) is the SMTP bit of email. Simple Mail Transfer
 Protocol (SMTP) is the protocol for passing messages between servers. Common
 Linux MTAs are Postfix, Exim or Sendmail.
 * A Mail Delivery Agent (MDA) deal with getting the messages to the local mail
 storage (mailboxes). On Linux MDA this could be procmail, maildrop, or part of what Dovecot does.
 * Mail Storage Server (MSS) deals with delivering mail to the MUA. This is the bit
 that implements the other mail protocols you're familiar with such as IMAP and POP.
 On Linux this could be Dovecot or Courier.

You will also need:

 * Some way to manage users, domains and mailboxes. You can use OS user accounts
 but more commonly you would use a more scalable option such as LDAP.
 * Virus and malware scanning.
 * A database for storing settings and other info, SQLite, MariaDB or MySQL.

While researching the various options, and looking at how to configure them
to work together I came across <a href="http://www.iredmail.org/">iRedMail</a>,
a fully-fledged email solution. It doesn't re-implement any existing technology
and instead builds on top of popular and robust open-source projects, it uses
your OS package manager to install the requirements, and then configures
each bit to work together. It can be configured to use LDAP or MySQL as a
back-end for storing user accounts.

### Getting started

I'm going to demonstrate the process of setting up an email server using a
VPS server at Digital Ocean, and I'm going to use Ubuntu 12.04 because that
is the OS I'm most familiar with. The process should be pretty similar for your
own choice of host and OS.


### Deliverability

In [How to Be a Cloud Survivalist (part 1)]({% post_url 2013-12-11-how-to-be-a-cloud-survivalist %}),
I mentioned that when you run your own mail server there is a higher chance that
receiving servers will flag your email as spam. There are various mechanisms
that have been developed for identifying bogus email, and we have to configure
various things to get around this and prevent our email being flagged as spam.

The first of these measures is to ensure you have a valid PTR record setup
for your server in the DNS. A PTR record does the opposite of what an A record
does. With a A record you are telling the DNS system what IP address to go to
for a given domain name. A PTR record registers a domain name for a given IP
address so it is also called a reverse DNS record.

A PTR record is used to check that the sending server name is actually
associated with the IP address from which the connection was initiated. So,
in email sending, the receiving server can find the server name using a
reverse DNS lookup, then check this matches against the mail server settings
for the email domain of the sender.

If you control the authoritative DNS for the IP address of the server you
are using then you will need to <a href="http://www.itworld.com/networking/362601/how-setup-reverse-dns-and-ptr-records">configure the reverse DNS records yourself</a>, otherwise you'll have
to contact your ISP or hosting company. I'm using Digital Ocean, and they
automatically configure the PTR record to match the hostname you use when
you provision your server.


### STEP 1: Provision server

As discussed above, in order to get the correct PTR record for the server,
enter a name for the server that matches the name you will be using when you
assign the server as a mail server in your email domain's DNS records.

You can't actually create the DNS settings for the domain until you've
provisioned the server and know it's IP address. I'll assume you're going to
be using <em>example.com</em> as your main domain, and so we'll use
<em>mx.example.com</em> for the server name.

<img src="/img/cloud-pt3/01-create.png" alt="Screenshot of provisioning server">

I've selected a 1GB instance as the iRedMail requirements suggest this much
memory if you are going to enable spam filtering of incoming email.


### STEP 2: Register domain, DNS settings

After you have registered your name (I'll stick to convention and use
<em>example.com</em> in the examples), you should set up some DNS settings.
The process for doing this will depend on where where you registered your domain.

I don't have any recommendations
for domain registrars. This time I used 123-reg, but I'm not going to recommend
them because they have told me they are NOT implementing
2-factor authentication and they have no plans to do so.

I'm using a separate domain
for setting up email services, so I've registered a cheap £9 SSL cert for that
domain just to get rid of browser security warnings. This only certifies one domain
so be sure to use the domain name you want to be using for your mail server
settings, and not the same as your website (if you have one) as you don't want
to tie your website to the same domain as your email as you probably want to
run them on separate servers.

So, if you're using <em>mail.example.com</em> or <em>example.com</em> (depending on your SSL cert)
create A records that point at the IP address of the server you configured in the
last step.

Also, create an A record for <em>mx.example.com</em> and point this at the IP
address of the server. Then create an MX record for your domain and point it at
<em>mx.example.com</em>.

You should check the certification process for registering your SSL certificate,
as the site I used required sending an email to the domain as part of the ownership
verification process. Obviously, you will need to have email setup in order to do this
so you may have to come back to SSL setup once you have email up and running
with a self-signed certificate.

An SPF record is another measure in the battle against spam. This is a record in
the DNS for a domain that specifies which hosts are allowed to send email on
behalf of this domain. You will need to create this (as a TXT record) in the
DNS for every domain name you will be hosting email for.
The SPF record should look like this, but with x.x.x.x replaced with your
server IP address:

    "v=spf1 ip4:x.x.x.x -all"

There are also DNS records that need to be created for DKIM but I'll explain what
this is all about in a bit, as you need to configure the mail server first.

### STEP 3: Install iRedMail

I selected to add my SSH key to the server when I provisioned it, so
login is straightforward, and doesn't need a password. First thing I do
is add a Linux account for myself, so I don't have to login as the root
user, give myself sudo privileges, disable root and password logins via SSH,
and update all packages with <em>ap-get update ; apt-get upgrade</em>.

Now on to configure iRedMail. You'll need sudo access for this. So, as the root
user, download and extract the iRedMail package:

    cd /root
    wget https://bitbucket.org/zhb/iredmail/downloads/iRedMail-0.8.6.tar.bz2
    tar xjf iRedMail-0.8.6.tar.bz2

Then change into the iRedMail directory and execute the installer:

    cd iRedMail-0.8.6/
    bash iRedMail.sh

You should then be presented with this welcome screen. Please note that I
took these screenshots last week and so they are of v0.8.5.

<img src="/img/cloud-pt3/03-welcome.png" alt="iRedMail welcome screen">

Once you go past the welcome screen you will see a series of screens that
prompt you for various bits of information. First select the
location on the file system to store the mail boxes. I see no reason not
to go with the default:

<img src="/img/cloud-pt3/04-storage.png" alt="">

Select a back-end to use for storage of user accounts. I prefer LDAP for this
as I'll be using it to integrate with some of the other components of my cloud
services in addition to email.

<img src="/img/cloud-pt3/05-db.png" alt="">

When you create your LDAP suffix, work from just the domain name. So, even though
the server name is <em>mx.example.com</em>, you should just use <em>example.com</em>
to calculate your LDAP suffix. In fact, I'm going to add extra domains later
and I'm not really going to use this domain name for user accounts.

<img src="/img/cloud-pt3/06-ldap.png" alt="">

Make sure you generate a secure (truly random) password for the LDAP root:

<img src="/img/cloud-pt3/07-ldap-pass.png" alt="">

Enter the domain name for this server. This is going to be the domain name you use
in email settings later. It should match the domain name that you have (or will)
generate the SSL certificate for:

<img src="/img/cloud-pt3/08-domain.png" alt="">

There are some optional extras you can install. I'm going to install all of them
except the phpMyAdmin and phpLDAPadmin as I don't want to maintain these two
bits of software. phpMyAdmin in the past has been a source of security vulnerabilities
and I'm not going to use it anyway, so no point having it installed.

<img src="/img/cloud-pt3/09-options.png" alt="">

Once you've provided values for all the options the configuration will continue
automatically and you will see progress reported. You will see a couple of questions
along the way that you can answer y/n to.

<img src="/img/cloud-pt3/10-progress.png" alt="">

iRedMail has now finished installing and configuring the packages, during this process
it created some firewall rules. I'm just going check what they
are using <code>sudo iptables -L</code>, once I've confirmed I'm happy with them
I reboot the server.

Once the server has finished rebooting and it back online, I browse to my domain in a web browser and I
see this:

<img src="/img/cloud-pt3/11-ssl-error.png" alt="">

### Configure iRedMail to use custom SSL certificate

When you install iRedMail it creates it's own self-signed certificate
for SSL communication. In order to get rid of browser warnings I'm going to
install my own certificate.

After verifying ownership of the domain name I was given two files. The first
is my actual certificate, the second is the chain of certificates that verify
my certificate. I also have the private key I used when creating the
certificate signing request. I need all three of these files, so I upload them
to the server and move them to the appropriate places. Put the private key in
<code>/etc/ssl/private</code>, and the other two files in <code>/etc/ssl/certs</code>
so you have something that looks like this:

    /etc/ssl/private/example.com.key
    /etc/ssl/certs/example.com.crt
    /etc/ssl/certs/example.com.ca.crt

Now in your Apache configuration (<code>/etc/apache2/sites-enabled/default-ssl</code>)
find the appropriate place for SSL keys, remove the references to self-signed
certificates, and enter location of your SSL certs and keys:

    SSLCertificateFile /etc/ssl/certs/example.com.crt
    SSLCertificateKeyFile /etc/ssl/private/example.com.key
    SSLCertificateChainFile /etc/ssl/certs/example.com.ca.crt

Once you restart Apache that should remove the browser warnings. We also need to
update the certificates in use by dovecot and postfix to prevent SSL error
messages when sending and receiving email via other apps.

For dovecot and postfix we don't use separate chain and cert files, so we need
to concatenate them into a single file (eg <code>/etc/ssl/certs/example.chain.cert</code>),
in this order:

 1. Your public SSL certificate
 2. The provided CA certificate
 3. Any other root CA certificate for signer of your SSL

For incoming email
(IMAP/POP) update the dovecot configuration in <code>/etc/dovecot/dovecot.conf</code>
and update the following to point at your cert and key files:

    ssl_key_file = /etc/ssl/private/example.com.key
    ssl_cert_file = /etc/ssl/certs/example.chain.key

For outgoing email (via SMTP), change below lines in /etc/postfix/main.cf:

    smtpd_tls_key_file = /etc/ssl/private/example.com.key
    ismtpd_tls_cert_file = /etc/ssl/certs/example.chain.key

Now restart the services so the changes take effect.

    sudo service apache2 restart
    sudo service postfix restart
    sudo service dovecot restart

You should now be able to connect to iRedAdmin and Roundcube via the web
interface without getting SSL error messages.

### DomainKeys Identified Mail

One more bit of configuration that needs setting up is DKIM. This is another
change to make to the DNS records that helps ensure deliverability of emails
and that you wont get flagged as a spammer or unknown mail server.

DKIM was installed and configured by iRedMail. Logged in as root, run the following command to see
a list of the keys.

    amavisd-new showkeys

You will see something like the following output:

    ; key#1, domain example.com, /var/lib/dkim/example.com.pem
    dkim._domainkey.example.com. 3600 TXT (
      "v=DKIM1; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVS0VuiBKe
      ...T2KrIdQLMHrzm4fmUgDFk7XXoEy/KLFChxPnZazJHLpOIIOhJywIDAQAB")

In the DNS settings for your domain, create a new TXT record for dkim._domainkey
and enter the whole string that is shown between () in the output of the showkeys
command.  Once you have created the DNS record, you will need to wait a while for
the change to propagate, then you can test your keys are working correctly with
the testkeys command:

    # amavisd-new testkeys
    TESTING#1: dkim._domainkey.example.com    => pass

Once you have verified that the key is working here, you can use a verification
service to test deliverability of your email. I found the port25 service useful,
all you have to do is send an email to check-auth@verifier.port25.com and you will
get a response with lots of useful information, summarised like this:

<img src="/img/cloud-pt3/12-verify.png" alt="">

### Configure mail client

You should now be ready to start using your email server. When you setup your
account you will probably have to select "Manual configuration", or if a list
of standard email providers is listed then select "Other".

The server address is
your domain (example.com), you should select IMAP for incoming mail. Note
that the mail server is example.com and not imap.example.com which some
software defaults to. Make sure you use the full email address as the account
name, else you may be prompted for a "prefix". The outgoing email server is SMTP
and again is on example.com and not smtp.example.com as some apps will default to.

### Adding an extra domain to iRedMail

I wanted to add accounts for friends and have email hosted for some other domain
names. Here's how to add an extra domain name to iRedMail.

The first, simple, step is to add the domain to iRedAdmin. I wont explain this
as it's very straightforward. Once you've done that you need to add the domain
to the DKIM configuration.

Login as root to the server, change into the folder where DKIM keys are stored
and generate a new key for the domain:

    cd /var/lib/dkim
    amavisd-new genrsa test.com.pem
    chmod 0644 test.com.pem

Now edit the confuration file at <code>/etc/amavis/conf.d/50-user</code>
to include the new key. Find the section in the configuration file where
keys are declared and add:

    dkim_key("test.com", "dkim", "/var/lib/dkim/test.com.pem");

Then find where the local domains are defined (in the same config file) and add your new domain:

    @local_domains_maps = ['mx.example.com', 'example.com', 'test.com'];

Restart <code>amavis</code> and show the new list of keys. You should see your
new key listed. Copy the TXT record and add it to the DNS for the new domain:

    /etc/init.d/amavis restart
    amavisd-new showkeys

Also remember to add the SPF record to the new domain, and set the MX records
so they point at mx.example.com.

You may want to send an email to check-auth@verifier.port25.com from the new
domain just to check everything is working correctly.

### Check logs

Once you start using your new email server you will want to check the logs now
and again to check everything is running OK. I looked in <code>/var/log/mail.log</code>
and noticed a couple of real emails being rejected. To be fair it was actually
due to misconfiguration of the sending mail server, but I still wanted these emails
to get through.

I had comment out the following line from <code>/etc/postfix/helo_access.pcre</code>
to allow these messages through:

    /\.local$/                  REJECT Go away, bad guy (.local).

### Syncing

Now I've got email working, and thanks to IMAP, I have my email accessible
across all my devices.
In the next post in this series I'm going to take a slight detour while I look
more at what is possible now I have a working LDAP server for my domain.
Then I'm going to quickly move on to implementing other cloud services, in particular
the synchronisation of other data across my devices, like calendars and contacts.









