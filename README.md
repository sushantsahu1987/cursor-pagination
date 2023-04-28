# cursor-pagination
Learning how to paginate over data using a cursor

## Pg installation on DO
1. sudo apt update
2. sudo apt install postgresql postgresql-contrib
3. sudo systemctl start postgresql.service

## Pg setup roles on DO
1. sudo -u postgres createuser <user_name>
2. sudo -u postgres createdb <db_name>
3. sudo -u postgres psql
4. psql=#  alter user ssahu with encrypted password ‘<password>’

## Configure Pg on DO
1. cd /etc/postgresql/12/main
2. vi postgresql.conf
3. subsection: # - Connection Settings -
3. edit listen_addresses = '*'			# what IP address(es) to listen on;
4. vi pg_hba.conf
5. subsection # IPv4 local connections:
6. host    all             all             all                     trust
7. service postgresql restart