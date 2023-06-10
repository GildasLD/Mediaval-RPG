# rails credentials:edit
# psql -U wac --host=127.0.0.1 --port=2345 -d postgres
# rake db:drop && \
# bundle config set --local path vendor/bundle;
# bundle install --gemfile=Gemfile;
# rake db:drop && \
# rake db:create && \
# rake db:migrate && \
# rake db:seed && \
# gem install rake;

start: clean-database
	bundle config set --local path vendor/bundle;
	bundle install --gemfile=Gemfile;
	npm install --force;
	npx prettier --plugin=@prettier/plugin-ruby --write '{,!(vendor)/**/}*.rb*'
	rake db:drop && \
	rake db:create && \
	rake db:migrate && \
	rake db:seed && \
	bundle exec rails assets:precompile && \
	bundle exec rails server;

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

new-credentials:
	rm -rfv ./config/{master.key,credentials.yml.enc} && \
	rails credentials:edit;
dump:
	rm -rf here.db.rb;
	rake db:seed:dump FILE=here.db.rb;

