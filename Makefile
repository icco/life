all: local

local: docs
	python -m SimpleHTTPServer 9393

.PHONY: docs
docs:
	docco life.js
	mv docs/life.html docs/index.html
