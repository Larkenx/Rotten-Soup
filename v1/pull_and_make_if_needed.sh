#!/bin/bash

set -xe

if [ "$(git status | grep behind)" == "" ]; then 
    echo "No changes"; 
else 
    git pull origin master
    make
fi
