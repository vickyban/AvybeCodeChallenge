# Quickstart in Development for Backend

With script:
at root of the project run 'backend_startup.sh'

OR With command line:

```
cd server
docker-compose up --build
```

Then, django rest framwork will be available at `localhost:8000/api/`.

To access to admin dashboard, do the following commands at the root of server folder:

```
docker-compose run web python manage.py createsuperuser
```

Then, access the dashboard at `localhost:8000/admin/`.

# Quickstart in Development for Frontend

With script:
at root of the project run 'frontend_startup.sh'

OR With command line:

```
cd front_end
docker-compose up --build
```

React webpage will be available at `localhost:3000/`
