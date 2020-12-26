# Lost And Found Application

> Using MongoDB, Express, React-Redux and NodeJS for an application called Ticket-App. This app is for hotel and hospital use so if the guest or a patient leave a personal things on their room and the cleaner found it they must turn it over to person in charge and logged it in the app. It will automatically produced required reports such as releasing the valuable things if more than 6 months it will automatically generate it, non-valuable 3 months and perishable 1 day. With user authentication only admin can delete records.

## Key feautures

- Return a list of ALL lost and found items to the user
- Return data (packageno, date found, area/location, guest owner, valuables, non-valuables, perishable, and finder) to the user
- Admin user only can register a new user
- Admin user can only delete a lost and fount item.
- Regular user must not delete any record, they can only add and update.
- Application can produced reports such as,
  - Items to be released valuables (6 months)
  - Items to be released non-valuables (3 months)
  - Items to be released perishable (1 day)
  - Items to be claim by guest.
  - Items claimed by guest.
  - Items claimed by employess.

![Alt text](frontend/src/img/lost-found.png?raw=true 'Lost-Found_APP')

### After Cloning, Install dependencies

Go to terminal cd into frontend folder

```
cd frontend
```

then

```
npm install
```

Next

```
cd ..
```

then cd into backend

```
cd backend
```

then

```
npm install
```

### Before running the app

Go to - backend/config/config.env, change MongoURI to your own mongoDB connection and Enter your email address and password for email sending.

```
MONGO_URI=
JWT_SECRET=
```

### Running after installing dependencies

Make sure you are inside the backend folder

```
npm run dev
```

### Demo

The APP is live at (https://lostfound-application.herokuapp.com/)

- Version: 1.0.0
- License: MIT
- Author: Rico John Dato-on
