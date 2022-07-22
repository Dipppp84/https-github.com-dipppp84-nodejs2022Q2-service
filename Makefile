run_win:
	docker run -p 4000:4000 -v %cd%/src:/node/app/src --rm dipppp84/rest_service:v1
run_lin:
	docker run -p 4000:4000 -v "$(pwd)/src:/node/app/src" --rm dipppp84/rest_service:v1
run_db:
	docker run -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=rest -e PGDATA=/var/lib/postgresql/data/pgdata -v pgdata:/var/lib/postgresql/data --rm dipppp84/rest_db:v1