[![CI Status](https://github.com/vufind-org/vufind/actions/workflows/ci.yaml/badge.svg?branch=dev)](https://github.com/vufind-org/vufind/actions/workflows/ci.yaml)
# Center for Research Libraries VuFind®

This is the Center for Research Libraries instance of VuFind®.


## About
VuFind® is an open source discovery environment for searching a collection of
records.  To learn more, visit https://vufind.org.

## MAMP Setup

CRL uses MAMP for local development.

### MAMP Development Requirements

* MAMP

* Java JDK

* Git

* Globally-installed Composer

* Copy of SQL Database

### MAMP Local Development Steps

1. First, `git clone` this repository.
1. If necessary, adjust MAMP's PHP version based on [compatibility with VuFind](https://vufind.org/wiki/installation:requirements).
1. Ensure that your command line is using MAMP's PHP. For example:
```
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH="/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH"
```
1. Edit /Applications/MAMP/bin/php/php7.4.12/conf/php.ini. Uncomment the (last?) line to enable XDebug and add the following contents at the end:
```
memory_limit = 2048M
error_reporting = E_ALL
display_errors = On
sendmail_path = "env -i /usr/sbin/sendmail -t -i"    
date.timezone = "Europe/Helsinki"
error_log = /Users/[your id]/Library/Logs/php_errors.log
```
```
[opcache]    
opcache.enable=0
```
```
[XDebug]
xdebug.remote_enable=true
xdebug.remote_autostart=true
xdebug.remote_host=127.0.0.1
xdebug.remote_port=9000
xdebug.remote_handler=dbgp
xdebug.show_exception_trace=0
```
1. Copy VuFind's `local/httpd-vufind.conf.sample` to `/Applications/MAMP/conf/apache/extra/httpd-vufind.conf`
1. Add the following line to the end of `/Applications/MAMP/conf/apache/httpd.conf:`
```
Include /Users/crl/Projects/vufind/local/httpd-vufind.conf
```
1. Restart MAMP

#### Environment Startup

```
composer install
php install.php
```

#### Start-up SOLR

```
./solr.sh start
```

Navigate to: http://localhost/vufind/Install/Home.


If the installation was successful, you should see an "Auto Configure" screen (pictured below). Some items on the list will be marked “Failed” with “Fix” links next to them. Review each item and follow the prompts.

---

**Auto Configure**

* Basic Configuration...<span style="color:green">*OK*
* Cache...<span style="color:green">*OK*
* Database...<span style="color:green">*OK*
* Dependencies...<span style="color:green">*OK*
* ILS...<span style="color:red">*Failed* [Fix]()
* Solr...<span style="color:green">*OK*
* Security... <span style="color:green">*OK*

---

### LESS

As of this writing, all VuFind style development is done using LESS.

To compile LESS, ensure [grunt](https://gruntjs.com/installing-grunt) is installed and run `grunt less`

### Other notes

* To set up VuFind's database, you will need to have the root password you set when installing MySQL.

* The DB setup creates a new DB and DB user when you provide the root/admin credentials.
