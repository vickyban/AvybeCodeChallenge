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
docker-compose run django python manage.py createsuperuser
```

Then, access the dashboard at `localhost:8000/admin/`.
After closing the app, run `docker-compose down` to close Docker 

# Quickstart in Development for Frontend

With script:
at root of the project run 'frontend_startup.sh'

OR With command line:

```
cd front_end
docker-compose up --build
```

React webpage will be available at `localhost:3000/`
After closing the app, run `docker-compose down` to close Docker 

# Quickstart in Development for React Native/Expo

- Install Expo client app on mobile device 
- Find your laptop's IP Address, copy and paste the address to `API_HOSTNAME` inside `mobile/app.config.ts` file 
- Then run the following commads in mobile directory to start up Expo app

```
npm install or yarn 
expo start
```
