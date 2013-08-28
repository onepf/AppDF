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

3) Uploader uses Dryscrape that based on webkit-server (requires Qt webkit) and xml libraries, so ensure you have following packets installed:
```shell
libxml
libxslt
qt4-devel	(contains webkit)
python-devel (Python.h is required for building bindings)
```

Install it using your system installer:
Linux: 
```shell
sudo apt-get install qt4-devel 
...
```
Mac:
```shell
brew install qt4
...
```

4)  Create isolated environment to keep your Python installation not messed
```shell
virtualenv . 
```

5) *Switch to isolated environment before building or using "uploader"* - it will save hours of your time
```shell
source bin/activate
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