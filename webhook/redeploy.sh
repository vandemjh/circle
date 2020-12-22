#!/bin/sh

# PAGES_EXIST=`ls /var/www/html` = ''

git checkout gh-pages
git pull
cp * /var/www/html