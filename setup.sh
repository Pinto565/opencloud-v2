#!/bin/bash

#Update the system
apt update -y

#Installing Nodejs and NPM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install v16.11.0
nvm use v16.11.0


#Installing Python and Virtualenv
apt install software-properties-common -y
add-apt-repository ppa:deadsnakes/ppa -y
apt update -y
apt install python3.8 -y
apt-get install python3-pip -y
pip3 install virtualenv -y