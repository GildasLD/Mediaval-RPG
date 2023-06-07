# rails credentials:edit
# psql -U wac --host=127.0.0.1 --port=2345 -d postgres
# rake db:drop && \
# bundle config set --local path vendor/bundle;
# bundle install --gemfile=Gemfile;
# rake db:drop && \
# rake db:create && \
# rake db:migrate && \
# rake db:seed && \

start: clean-database lint
	bundle config set --local path vendor/bundle;
	bundle install --gemfile=Gemfile;
	rake db:drop && \
	rake db:create && \
	rake db:migrate && \
	rake db:seed && \
	RAILS_ENV=development rails assets:precompile && \
	rails server;

clean-database:
	psql -U wac --host=127.0.0.1 --port=2345 \
	-d postgres -f './clean-database.sql';

kill-current-process:
	cat ./tmp/pids/server.pid | xargs kill -9

lint:
	npx prettier --plugin=@prettier/plugin-ruby --write '{,!(vendor)/**/}*.rb*'

install:
	bundle config set --local path vendor/bundle;
	bundle install --gemfile=Gemfile;

server: lint
	rails server;

s: lint
	rails server;