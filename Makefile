publish: clean test lint

lint:
	@./node_modules/.bin/jshint lib

test: clean node_modules
	@mkdir -p test/fixtures/tmp
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter tap --timeout 2000 test/*.test.js

node_modules: package.json
	@npm install

clean:
	@rm -f *.log*
	@rm -f expected.json
	@rm -f res.json
	@rm -rf test/fixtures/tmp/*

.PHONY: clean test lint