# BACKEND CHEAT SHEET — Node.js + Express

מטרה:
קובץ נפרד לחלוטין לצד השרת.

החלק הזה מתמקד ב-Node.js, Express, API, routes, middleware
ובאופן שבו מקבלים קלט מה-Frontend.


============================================================
1. יצירת שרת Express
============================================================
הפעלת שרת
const express = require("express"); - אני רוצה להשתמש בספריית אקספרס בקובץ זה

const app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

השרת יהיה נגיש ב http://localhost:5000
מה הקלטים?
express() לא מקבל חובה שום דבר.

app.listen מקבל:
1. port
2. callback אופציונלי


============================================================
2. express.json()
============================================================
"אם ה־Frontend שולח לי JSON, תדע לקרוא אותו
app.use(express.json());


למה?
כדי ש-Express יוכל לקרוא JSON שנשלח ב-request body.


לדוגמה, Frontend שולח:

{
  "name": "Task 1",
  "completed": false
}


ואז בשרת:

req.body


יחזיר:

{
  name: "Task 1",
  completed: false
}


============================================================
3. CORS
============================================================

const cors = require("cors");

app.use(cors());


לרוב צריך את זה כאשר:
React רץ על localhost:5173
והשרת רץ על localhost:5000.


אפשר גם:

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);


============================================================
4. GET
============================================================
טיפול בget מצד שרת מביא את כל הפריטים ביחד
app.get("/api/items", (req, res) => {
  res.json(items);
});


app.get מקבל:
1. route/path
2. callback


ה-callback מקבל:
req = request
res = response


============================================================
5. req — מה הלקוח שלח?
============================================================

req יכול להכיל:

req.body- המידע שהגיע מהפרונט
req.params- id na,bho aakj
req.query
req.headers


אלה ארבעת הדברים החשובים ביותר.


============================================================
6. req.body
============================================================

POST:

app.post("/api/services", (req, res) => {
  const { name, status, responseTime, errors } = req.body;

  if (!name) {
    return res.status(404).json({
      message: "Service not found"
    });
  }

  const newService = {
    id: services.length + 1,
    name,
    status,
    responseTime,
    errors
  };

  services.push(newService);
  console.log(newService)
  res.status(201).json(newService);
});


קלט לדוגמה:

{
  "name": "Learn React",
  "completed": false
}


מתאים בעיקר ל:
- POST
- PUT
- PATCH


============================================================
7. req.params
============================================================
רואים אתזה בטרמינל אחרי שנכנסים- http://localhost:5000/api/services/1
מביא פריט אחד לפי id
Route:

app.get("/api/services/:id", (req, res) => {
  console.log(req.params.id);
   const id = Number(req.params.id);

  const service = services.find((service) => service.id === id);

  if (!service) {
    return res.status(404).json({
      message: "Service not found"
    });
  }

  res.json(service);
});


בקשה:

GET /api/items/123


קלט:

req.params.id

ערך:

"123"


חשוב:
זה בדרך כלל string.


לכן:

const id = Number(req.params.id);


============================================================
8. req.query
============================================================

Route:

app.get("/api/items", (req, res) => {
  const { search, page, limit } = req.query;
});


בקשה:

GET /api/items?search=react&page=1&limit=10


נקבל:

search = "react"
page = "1"
limit = "10"


גם query parameters מגיעים בדרך כלל כ-string.


============================================================
9. req.headers
============================================================

app.get("/api/items", (req, res) => {
  console.log(req.headers);
});


אפשר לקרוא header:

const token = req.headers.authorization;


שימושי למשל ב-authentication.


============================================================
10. res.json()
============================================================

res.json({
  message: "Success"
});


או:

res.json(item);


או:

res.json(items);


JSON הוא הדרך הרגילה להחזיר מידע ל-React.


============================================================
11. res.status()
============================================================

res.status(200).json(data);

res.status(201).json(newItem);

res.status(400).json({
  message: "Invalid input"
});

res.status(404).json({
  message: "Not found"
});

res.status(500).json({
  message: "Server error"
});


============================================================
12. HTTP Status Codes
============================================================
- הצלחה
200
OK / הצלחה
יצר בהצלחה
201
Created / נוצר אובייקט

400
Bad Request / קלט לא תקין

401
Unauthorized / אין authentication

403
Forbidden / אין הרשאה

- הלקוח מבקש משהו שלא נמצא
404
Not Found
שרת לא תקין 
500
Internal Server Error


============================================================
13. מערך זמני במקום Database
============================================================

let items = [
  {
    id: 1,
    name: "Learn React",
    completed: false
  },
  {
    id: 2,
    name: "Build API",
    completed: true
  }
];



============================================================
14. POST — יצירה
============================================================

app.post("/api/items", (req, res) => {
  const { name, completed } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  const newItem = {
    id: Date.now(),
    name: name.trim(),
    completed: completed ?? false
  };

  items.push(newItem);

  res.status(201).json(newItem);
});


קלט:
req.body


למשל:

{
  "name": "Task",
  "completed": false
}


פלט:
האובייקט שנוצר.


============================================================
15. GET ALL
============================================================

app.get("/api/items", (req, res) => {
  res.json(items);
});


קלט:
אין חובה.


פלט:
מערך.


============================================================
16. GET BY ID
============================================================

app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const item = items.find(
    (item) => item.id === id
  );

  if (!item) {
    return res.status(404).json({
      message: "Item not found"
    });
  }

  res.json(item);
});


קלט:
id מתוך URL.


============================================================
17. PUT — עדכון
============================================================

app.put("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);

  const service = services.find(
    (service) => service.id === id
  );

  if (!service) {
    return res.status(404).json({
      message: "service not found"
    });
  }

  const { name, status, responseTime, errors } = req.body;

  if (name !== undefined) {
    service.name = name;
  }

  if (status !== undefined) {
    service.status = status;
  }
  if (responseTime !== undefined) {
    service.responseTime = responseTime;
  }

  if (errors !== undefined) {
    service.errors = errors;
  }
console.log(service);
  res.status(200).json(service);
});


קלטים:
1. id ב-URL
2. שדות לעדכון ב-body


============================================================
18. DELETE
============================================================

app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = items.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Item not found"
    });
  }

  const deleted = items.splice(index, 1)[0];

  res.json(deleted);
});


קלט:
id


============================================================
19. Router
============================================================

routes/items.js:

const express = require("express");

const router = express.Router();


router.get("/", (req, res) => {
  res.json([]);
});


router.post("/", (req, res) => {
  res.json({
    message: "created"
  });
});


module.exports = router;


server.js:

const itemRoutes = require("./routes/items");

app.use("/api/items", itemRoutes);


עכשיו:

GET /api/items
מגיע ל:

router.get("/")


============================================================
20. Middleware
============================================================

Middleware הוא פונקציה שרצה בדרך ל-route.


מבנה:

function middleware(req, res, next) {
  // code

  next();
}


דוגמה:

function logger(req, res, next) {
  console.log(
    req.method,
    req.url
  );

  next();
}


app.use(logger);


============================================================
21. Middleware ל-validation
============================================================

function validateItem(req, res, next) {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  next();
}


שימוש:

app.post(
  "/api/items",
  validateItem,
  (req, res) => {
    // create
  }
);


============================================================
22. Error handling
============================================================

try {
  // code
} catch (error) {
  console.error(error);

  res.status(500).json({
    message: "Internal server error"
  });
}


============================================================
23. Error middleware
============================================================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong"
  });
});


============================================================
24. dotenv- לא צריך למבחן
============================================================

התקנה:

npm install dotenv


.env:

PORT=5000


server.js:

require("dotenv").config();

const PORT = process.env.PORT || 5000;


============================================================
25. package.json
============================================================
 את זה צריך להגדיר בקובץ
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}


התקנות:

npm install express cors dotenv

npm install -D nodemon


============================================================
26. מבנה Backend פשוט למבחן
============================================================

project/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── items.js
│   ├── controllers/
│   │   └── itemsController.js
│   ├── middleware/
│   │   └── validation.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   ├── pages/
    │   └── api/
    │       └── itemsApi.js
    └── package.json

אם יש מעט זמן:
אפשר גם לעבוד רק עם server.js.


============================================================
27. Controller
============================================================
r הוא פשוט מקום שבו שמים את הלוגיקה של מה שהשרת צריך לעשות.

async function getItems(req, res) {
  try {
    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
}


export / module:

module.exports = {
  getItems
};


============================================================
28. Query — חיפוש
============================================================

app.get("/api/items", (req, res) => {
  const { search } = req.query;

  let result = items;

  if (search) {
    result = items.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  res.json(result);
});


בקשה:

GET /api/items?search=react


קלט:
search


============================================================
29. Query — pagination בסיסי
============================================================

app.get("/api/items", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const start = (page - 1) * limit;

  const result = items.slice(
    start,
    start + limit
  );

  res.json(result);
});


דוגמה:

GET /api/items?page=2&limit=10


============================================================
30. כמה query parameters
============================================================

GET /api/items?search=react&completed=true


קוד:

const {
  search,
  completed
} = req.query;


חשוב:
completed מגיע כ-string.


לכן:

const isCompleted =
  completed === "true";


============================================================
31. Authentication בסיסי — רק להבנת מבנה
============================================================

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "test@test.com" &&
    password === "1234"
  ) {
    return res.json({
      message: "Login successful"
    });
  }

  res.status(401).json({
    message: "Invalid credentials"
  });
});


קלט:

{
  "email": "test@test.com",
  "password": "1234"
}


============================================================
32. Full Backend קטן
============================================================

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


let items = [
  {
    id: 1,
    name: "Learn React",
    completed: false
  },
  {
    id: 2,
    name: "Build API",
    completed: true
  }
];


app.get("/api/items", (req, res) => {
  const { search } = req.query;

  let result = items;

  if (search) {
    result = items.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  res.json(result);
});


app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const item = items.find(
    (item) => item.id === id
  );

  if (!item) {
    return res.status(404).json({
      message: "Item not found"
    });
  }

  res.json(item);
});


app.post("/api/items", (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  const item = {
    id: Date.now(),
    name: name.trim(),
    completed: false
  };

  items.push(item);

  res.status(201).json(item);
});


app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const item = items.find(
    (item) => item.id === id
  );

  if (!item) {
    return res.status(404).json({
      message: "Item not found"
    });
  }

  const { name, completed } = req.body;

  if (name !== undefined) {
    item.name = name;
  }

  if (completed !== undefined) {
    item.completed = completed;
  }

  res.json(item);
});


app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = items.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Item not found"
    });
  }

  const deleted = items.splice(index, 1)[0];

  res.json(deleted);
});


app.listen(5000, () => {
  console.log(
    "Server running on http://localhost:5000"
  );
});


============================================================
33. טבלת קלטים — הדבר שחשוב לזכור
============================================================

GET /api/items
קלט:
אין חובה
או query:
req.query


GET /api/items/:id
קלט:
req.params.id


POST /api/items
קלט:
req.body


PUT /api/items/:id
קלט:
req.params.id
+
req.body


DELETE /api/items/:id
קלט:
req.params.id


============================================================
34. CRUD — לזכור בעל פה
============================================================

CREATE
POST

READ
GET

UPDATE
PUT / PATCH

DELETE
DELETE


============================================================
35. סדר עבודה במבחן
============================================================

1. להפעיל Express.
2. להוסיף express.json().
3. להוסיף CORS.
4. ליצור מערך נתונים זמני אם אין Database.
5. ליצור GET.
6. ליצור POST.
7. ליצור PUT/PATCH אם נדרש.
8. ליצור DELETE אם נדרש.
9. לבדוק כל endpoint.
10. רק אחר כך לחבר ל-React.


============================================================
36. בדיקה מהירה של API
============================================================

אפשר לבדוק את ה-endpoints דרך:
- Browser עבור GET פשוט.
- Postman.
- Thunder Client.
- curl.


דוגמת GET:

GET http://localhost:5000/api/items


דוגמת POST:

POST http://localhost:5000/api/items

Body:

{
  "name": "New task"
}


============================================================
37. דברים שחייבים לדעת בעל פה
============================================================

[ ] express()
[ ] app.listen()
[ ] express.json()
[ ] cors()
[ ] app.get()
[ ] app.post()
[ ] app.put()
[ ] app.delete()
[ ] req.body
[ ] req.params
[ ] req.query
[ ] req.headers
[ ] res.status()
[ ] res.json()
[ ] middleware
[ ] Router
[ ] validation
[ ] try/catch
[ ] HTTP status codes
[ ] CRUD
 נכנסים לתוך באק אנד 
 מריצים
npm init -y
זה ייצור:
backend/
└── package.json
package.json הוא הקובץ שמכיל את הגדרות פרויקט ה־Node והחבילות שלו.
 התקיני Express ו־CORS
הריצי:
npm install express cors
אחרי זה תראי:
backend/
├── node_modules/
├── package.json
└── package-lock.json
 צרי server.js
בצד שמאל של VS Code:
backend → קליק ימני → New File

תני לו שם:

server.js

עכשיו:

helfy-practice/
└── backend/
    ├── server.js
    ├── package.json
    ├── package-lock.json
    └── node_modules/
נוסיף את התיקיות למבנה הזה 

project/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── items.js
│   ├── controllers/
│   │   └── itemsController.js
│   ├── middleware/
│   │   └── validation.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   ├── pages/
    │   └── api/
    │       └── itemsApi.js
    └── package.json
 עכשיו כתבי את השרת הבסיסי
ב־server.js:

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 הפעילי את השרת
בטרמינל, כשאת בתוך backend:
node server.js
את אמורה לראות:
Server running on port 5000
ctl + c עוצר הרצה
מופיע כאן http://localhost:5000/api/services