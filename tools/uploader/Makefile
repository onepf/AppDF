all: requirements dryscrape samples

requirements:
	pip install -r requirements.txt

dryscrape:
	git clone git://github.com/niklasb/dryscrape.git
	pip install -r dryscrape/requirements.txt
	cd dryscrape && python setup.py install

samples:
	wget https://github.com/onepf/AppDF/archive/master.tar.gz
	tar xf master.tar.gz
	mv AppDF-master/samples samples
	rm -r AppDF-master
	rm master.tar.gz

pep8:
	pep8 bin lib
