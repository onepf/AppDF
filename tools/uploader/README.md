# appdf-publisher

Publisher for [AppDF](https://github.com/onepf/AppDF).

## Install

1) Ensure "pip" is installed. If not try this:
```shell
easy_install pip
```

2) Ensure virtualenv is installed. If not try this:
```shell
pip install virtualenv
```

3) Create isolated environment to keep your Python installation not messed
```shell
virtualenv . 
```

4) *Before using "uploader"* switch to isolated environment
```shell
source bin/activate
```

5) Dryscrape is based on webkit-servet that is based on Qt webkit, so ensure if it installed. If not try this:
Linux: 
```shell
sudo apt-get install qt4-devel
```
Mac:
```shell
brew install qt4
```

6) Call "make" to download dryscrape and it's prerequisites like webkit-server
```shell
make
```
Webkit-server and other stuff should be installed

## Usage

1) Activate isolated environment

```shell
source bin/activate
```

2) Run publisher 

```shell
python appdf.py --username GOOGLE_PLAY_EMAIL --password GOOGLE_PLAY_PASSWORD PATH_TO_APPDF
```