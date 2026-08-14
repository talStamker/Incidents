# FRONTEND CHEAT SHEET — React + JavaScript

מטרה:
קובץ עזר ללמידה לקראת מבחן בית שבו צריך לבנות אפליקציה מאפס בזמן מוגבל.

הקוד כאן מחולק לפי נושאים. חשוב להבין מה כל חלק מקבל כקלט ומה הוא מחזיר.

============================================================
1. מבנה React בסיסי
============================================================

import { useState } from "react";

function App() {
  return (
    <div>
      <h1>My App</h1>
    </div>
  );
}

export default App;


מה קורה כאן?
- App היא קומפוננטה.
- JSX הוא HTML שנכתב בתוך JavaScript.
- export default מאפשר לייבא את הקומפוננטה במקום אחר.


============================================================
2. useState
============================================================
משמש לכל מידע שיכול להשתנות במהלך החיים של הקומפוננטה, ואת רוצה שיעדכן את המסך בעקבות השינוי.
import { useState } from "react";

const [value, setValue] = useState(initialValue);


קלטים:
useState(initialValue)

דוגמאות:

const [name, setName] = useState("");
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState([]);
const [user, setUser] = useState(null);


מה מקבלים?
- value = הערך הנוכחי.
- setValue = פונקציה שמשנה אותו.

דוגמה:

const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>


e הוא event.
e.target הוא האלמנט שהפעיל את האירוע.
e.target.value הוא הערך שהמשתמש הכניס.


============================================================
3. useEffect
============================================================
תעשה משהו כשקורה כשהשמתנה משהו
import { useEffect } from "react";

useEffect(() => {
  // code
}, []);


קלטים:
1. פונקציה שרוצים להריץ.
2. מערך dependencies.


טעינה פעם אחת כשהקומפוננטה נטענת:

useEffect(() => {
  loadItems();
}, []);


טעינה כאשר id השתנה :

useEffect(() => {
  loadItem(id);
}, [id]);


כל פעם ש-count משתנה:

useEffect(() => {
  console.log(count);
}, [count]);


המערך [] אומר:
הרץ פעם אחת כאשר הקומפוננטה נטענת.


============================================================
4. Props
============================================================
כמעט בכל פעם שיש לך קומפוננטה בתוך קומפוננטה ואת רוצה להעביר אליה מידע או פעולה.
קומפוננטת אב:

<Item
  item={item}
  onDelete={deleteItem}
/>


קומפוננטת בן:

function Item({ item, onDelete }) {
  return (
    <div>
      <span>{item.name}</span>

      <button onClick={() => onDelete(item.id)}>
        Delete
      </button>
    </div>
  );
}


הקלטים של Item:
- item
- onDelete


Props הם הדרך שבה מעבירים מידע מהורה לילד.


============================================================
5. Controlled Input
============================================================
name הערך שמוצג בתוך התיבת טקסט 
const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>


הקלט:
e.target.value

ה-state:
name

כאשר המשתמש מקליד:
onChange מופעל -> setName -> React מתעדכן.
placeholder הוא טקסט עזר שמופיע בתוך תיבת ה־input כשהיא ריקה.

============================================================
6. Form
============================================================
משתמשים ב־form כשיש קבוצה של קלטים שהמשתמש צריך למלא ואז לשלוח/לאשר
function Form() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">
        Save
      </button>
    </form>
  );
}


e.preventDefault()
מונע מהדפדפן לבצע refresh.


============================================================
7. Form עם כמה שדות
============================================================

const [form, setForm] = useState({
  name: "",
  email: "",
  age: "",
});


function handleChange(e) {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}


ה-input:

<input
  name="name"
  value={form.name}
  onChange={handleChange}
/>

<input
  name="email"
  value={form.email}
  onChange={handleChange}
/>


הקלטים:
- name = שם השדה.
- value = הערך שהמשתמש הכניס.


============================================================
8. GET עם fetch
============================================================
אני משתמשת ב־GET עם fetch כשאני רוצה לקבל מידע מהשרת ולהציג אותו ב־Frontend.
async function getItems() {
  const response = await fetch(
    "http://localhost:5000/api/items"
  );

  const data = await response.json();

  return data;
}


קלט:
URL


response הוא Response object.

response.json()
ממיר את גוף התשובה ל-JavaScript object/array.


גרסה בטוחה יותר:
const [services, setservices] = useState([])
  useEffect(() => {
    getServices().then((data)=> {
      setservices(data);
      console.log(data)
    });
  }, []);

async function getItems() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/items"
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
http://localhost:5000- איה השרת נמצא
api/items - איפה הפריטים נמצאים

קבלה לפי id:
const [service, setService] = useState(null)
  useEffect(() => {
  getService(2).then((data) => {
    setService(data);
    console.log(data)
  });
}, []);
async function getService(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/services/${id}`
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
============================================================
9. POST עם fetch
============================================================
אני משתמשת ב־POST עם fetch כשאני רוצה לשלוח מידע מה־Frontend לשרת כדי ליצור משהו חדש.
  const [newService, setNewService] = useState(null)
  useEffect(() => {
  createService({
  name: "Test API",
  status: "healthy",
  responseTime: 100,
  errors: 0
}).then((data) => {
    setNewService(data);
    console.log(data)
  });
}, []);

async function createService(service) {
  try {
    // console.log(service)
    const response = await fetch(
      "http://localhost:5000/api/services",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      }
    );
    // console.log(response.ok)

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


קלט:
item


למשל:

{
  name: "Task 1",
  completed: false
}


JSON.stringify()
הופך JavaScript object ל-JSON string.
גרסה בטוחה יותר
async function createItem(item) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/items",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create item");
    }

    return await response.json();

  } catch (error) {
    console.error(error);
  }
}
============================================================
10. PUT
============================================================
עדכון משהו שכבר קיים בשרת
 const [updatedService, setUpdatedService] = useState(null)
  useEffect(() => {
  updateService(2,{
  name: "Test API",
  status: "healthy",
  responseTime: 200,
  errors: 0
}).then((data) => {
    setUpdatedService(data);
    console.log(data)
  });
}, []);
async function updateService(id, service) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/services/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(service),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
קלטים:
- id
- object עם הנתונים החדשים
גרסה בטוחה
async function updateItem(id, item) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/items/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update item");
    }

    return await response.json();

  } catch (error) {
    console.error(error);
  }
}
============================================================
11. DELETE
============================================================

async function deleteItem(id) {
  const response = await fetch(
    `http://localhost:5000/api/items/${id}`,
    {
      method: "DELETE",
    }
  );

  return await response.json();
}
 

קלט:
id
גרסה בטוחה
async function deleteItem(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/items/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete item");
    }

    return await response.json();

  } catch (error) {
    console.error(error);
  }
}
============================================================
12. הצגת מערך עם map
============================================================
כאשר רוצים לעבור על מערך ולכל איבר להחזיר משהו עליו
const items = [
  { id: 1, name: "React" },
  { id: 2, name: "Node" }
];


{items.map((item) => (
  <div key={item.id}>
    {item.name}
  </div>
))}

const names = ["Tal", "Dana", "Yossi"];

const result = names.map((name) => {
  return name.toUpperCase();
});
map מקבל callback.

בכל איטרציה:
item = האיבר הנוכחי.


============================================================
13. filter
============================================================
filter עוברת על מערך ומחזירה מערך חדש שמכיל רק את האיברים שעומדים בתנאי מסוים.
const completedItems = items.filter(
  (item) => item.completed === true
);


קלט:
פונקציה שמחזירה true/false.


דוגמה לחיפוש:
const items = [
  { id: 1, name: "React" },
  { id: 2, name: "Node" },
  { id: 3, name: "React Native" }
];

const search = "react";
const filtered = items.filter((item) =>
  item.name
    .toLowerCase()
    .includes(search.toLowerCase())
);


============================================================
14. find
============================================================
מחפשת את האיבר הראשון שמתאים לתנאי ומחזירה אותו.
const item = items.find(
  (item) => item.id === id
);


מחזיר:
- את האובייקט הראשון שמתאים.
- undefined אם לא נמצא.


============================================================
15. findIndex
============================================================
מחזירה את האינדקס של האיבר הראשון שעומד בתנאי
const index = items.findIndex(
  (item) => item.id === id
);


מחזיר:
- index של האיבר.
- -1 אם לא נמצא.


============================================================
16. הוספת איבר ל-state
============================================================
הוספה למערך
setItems((prev) => [
  ...prev,
  newItem
]);


...prev
מעתיק את כל האיברים הקיימים.


============================================================
17. מחיקת איבר מה-state
============================================================
מחיקה ממערך
setItems((prev) =>
  prev.filter((item) => item.id !== id)
);


המשמעות:
השאר את כל האיברים שה-id שלהם שונה.


============================================================
18. עדכון איבר ב-state
============================================================
עדכון איבר
setItems((prev) =>
  prev.map((item) =>
    item.id === id
      ? { ...item, name: newName }
      : item
  )
);


אם זה האיבר:
צור עותק עם name חדש.

אחרת:
השאר אותו.


============================================================
19. Loading
============================================================
הצגת טוען כשיש בקשה מהשרת
const [loading, setLoading] = useState(false);


async function loadItems() {
  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/items"
    );

    const data = await response.json();

    setItems(data);
  } finally {
    setLoading(false);
  }
}


בתצוגה:

{loading && <p>Loading...</p>}


============================================================
20. Error
============================================================
הצגת שגיאה
const [error, setError] = useState("");


try {
  setError("");

  // request
} catch (err) {
  setError("Something went wrong");
}


בתצוגה:

{error && <p>{error}</p>}


============================================================
21. Conditional Rendering
============================================================
תנאי להצגה
{isLoggedIn ? (
  <p>Welcome</p>
) : (
  <p>Please login</p>
)}


או:

{items.length === 0 && (
  <p>No items found</p>
)}


============================================================
22. React Router
============================================================
משמש כדי ליצור כמה עמודים/מסכים באפליקציית React, בלי שכל פעם הדפדפן יטען את כל האתר מחדש.
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

nav- nana aur, bhuu, kspho 
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/items">Items</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
} 
אם הדפים בקבצים שונים נשים את זה בקבץ app עם 
import Home from "./Home";
import Items from "./Items";
וככה יביא את הקומפוננטות


Route inputs:
- path = URL
- element = component


============================================================
23. Axios
============================================================
Axios עושה את אותה עבודה כמו fetch, אבל התחביר שלו קצת יותר נוח.
import axios from "axios";


GET:

const response = await axios.get(
  "http://localhost:5000/api/items"
);

const data = response.data;


POST:

const response = await axios.post(
  "http://localhost:5000/api/items",
  {
    name: "Task"
  }
);


PUT:

await axios.put(
  `http://localhost:5000/api/items/${id}`,
  {
    name: "Updated"
  }
);


DELETE:

await axios.delete(
  `http://localhost:5000/api/items/${id}`
);


Axios נוח כי:
response.data כבר מכיל את הנתונים.


============================================================
24. API Service מסודר
============================================================
צורה מסודרת יותר
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


export async function getItems() {
  const response = await API.get("/items");
  return response.data;
}


export async function createItem(item) {
  const response = await API.post("/items", item);
  return response.data;
}


export async function updateItem(id, item) {
  const response = await API.put(
    `/items/${id}`,
    item
  );

  return response.data;
}


export async function deleteItem(id) {
  const response = await API.delete(
    `/items/${id}`
  );

  return response.data;
}


============================================================
25. JavaScript — destructuring
============================================================
אובייקט
const user = {
  name: "Tal",
  age: 27
};

const { name, age } = user;
זה אותו דבר כמו:
const name = user.name;
const age = user.age;


============================================================
26. JavaScript — spread object
============================================================
מוסיף אלמנטים של אובייקט אחר וגם מוסיף על זה
const user2 = {
  ...user,
  age: 28
};


יוצר object חדש ומחליף age.


============================================================
27. JavaScript — spread array
============================================================
הוספת אלמנט למערך
const items = [
  "React",
  "Node"
];

const newItem = "SQL";
const newItems = [
  ...items,
  newItem
];


============================================================
28. Optional chaining
============================================================
אם משהו null יעצור את השורה ולא יביא שגיאה
user?.name

user?.address?.city


אם משהו בדרך הוא null/undefined,
לא מתקבלת שגיאה.


============================================================
29. שימוש נפוץ ב-async/await
============================================================

async function handleSave() {
  try {
    setLoading(true);

    const newItem = await createItem({
      name
    });

    setItems((prev) => [
      ...prev,
      newItem
    ]);

    setName("");
  } catch (error) {
    setError("Could not save");
  } finally {
    setLoading(false);
  }
}


זה מבנה שכדאי מאוד לדעת למבחן.


============================================================
30. דוגמת App מלאה קטנה
============================================================

import { useEffect, useState } from "react";

const API_URL =
  "http://localhost:5000/api/items";


function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    loadItems();
  }, []);


  async function loadItems() {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();

      setItems(data);
    } catch (err) {
      setError("Could not load items");
    } finally {
      setLoading(false);
    }
  }


  async function addItem(e) {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      const newItem = await response.json();

      setItems((prev) => [
        ...prev,
        newItem
      ]);

      setName("");
    } catch (err) {
      setError("Could not add item");
    }
  }


  async function removeItem(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError("Could not delete item");
    }
  }


  return (
    <div>
      <h1>Items</h1>

      <form onSubmit={addItem}>
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button type="submit">
          Add
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>

          <button
            onClick={() =>
              removeItem(item.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}


export default App;


============================================================
31. מה בדרך כלל נכנס ב-Frontend?
============================================================

קלטים נפוצים:
- טקסט מ-input
- מספר מ-input
- בחירה מ-select
- checkbox
- תאריך
- id מתוך URL
- מידע שהתקבל מהשרת

פעולות נפוצות:
1. המשתמש מכניס מידע.
2. React שומר אותו ב-state.
3. לוחצים Save.
4. נשלחת בקשת POST/PUT לשרת.
5. השרת מחזיר נתונים.
6. React מעדכן את ה-state.
7. המסך מתעדכן.


============================================================
32. הדברים שהכי חשוב לדעת בעל פה
============================================================

[ ] useState
[ ] useEffect
[ ] props
[ ] controlled inputs
[ ] form + preventDefault
[ ] map
[ ] filter
[ ] find
[ ] findIndex
[ ] spread
[ ] async/await
[ ] try/catch
[ ] fetch
[ ] GET
[ ] POST
[ ] PUT
[ ] DELETE
[ ] loading
[ ] error
[ ] conditional rendering
פיצרים מוכרים שבעזרתם אפשר לתכנת בריאקט
============================================================
33. check box 
============================================================

const [checked, setChecked] = useState(false);

<label>
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
  />
  Task
</label>

============================================================
34. input
============================================================
<input
  type="text"
  placeholder="Task name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
משצק זה מה המשתמש הקיש

============================================================
35. Button 
============================================================
function handleClick() {
  console.log("Button clicked");
}

<button onClick={handleClick}>
  Save
</button>
<button onClick={() => deleteItem(item.id)}>
  Delete
</button>

============================================================
36. Dropdown / Select
============================================================
const [category, setCategory] = useState("");

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Choose category</option>
  <option value="work">Work</option>
  <option value="study">Study</option>
  <option value="personal">Personal</option>
</select>

============================================================
32. Radio Buttons
============================================================
כמו check box אבל אפשר לבחור רק אחד
const [priority, setPriority] = useState("");

<label>
  <input
    type="radio"
    name="priority"
    value="low"
    checked={priority === "low"}
    onChange={(e) => setPriority(e.target.value)}
  />
  Low
</label>

<label>
  <input
    type="radio"
    name="priority"
    value="high"
    checked={priority === "high"}
    onChange={(e) => setPriority(e.target.value)}
  />
  High
</label>

============================================================
32. form
============================================================
איך עובדים עם כמה שדות יחד
const [form, setForm] = useState({
  name: "",
  category: "",
  priority: ""
});

<input
  name="name"
  value={form.name}
  onChange={handleChange}
/>

<select
  name="category"
  value={form.category}
  onChange={handleChange}
>
  <option value="">Choose category</option>
  <option value="work">Work</option>
  <option value="study">Study</option>
</select>

<select
  name="priority"
  value={form.priority}
  onChange={handleChange}
>
  <option value="">Choose priority</option>
  <option value="low">Low</option>
  <option value="high">High</option>
</select>

============================================================
32. Search
============================================================
חיפוש לפי המידע שמשתמש שם ב input
const [search, setSearch] = useState("");
<input
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
const filteredItems = items.filter((item) =>
  item.name
    .toLowerCase()
    .includes(search.toLowerCase())
);
{filteredItems.map((item) => (
  <div key={item.id}>
    {item.name}
  </div>
))}

============================================================
32. Filter לפי Category
============================================================
const [category, setCategory] = useState("all");
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="all">All</option>
  <option value="work">Work</option>
  <option value="study">Study</option>
</select>

const filteredItems = items.filter((item) =>
  category === "all" || item.category === category
);

============================================================
32. Add Item
============================================================
const [items, setItems] = useState([]);
const [name, setName] = useState("");
nkuuv t, fk pubemhu, vahbuh
async function handleAdd() {
  const newItem = await createItem({
    name: name
  });

  setItems((prev) => [
    ...prev,
    newItem
  ]);

  setName("");
}
<button onClick={handleAdd}>
  Add
</button>

============================================================
32. Delete
============================================================
async function handleDelete(id) {
  await deleteItem(id);

  setItems((prev) =>
    prev.filter((item) => item.id !== id)
  );
}
<button onClick={() => handleDelete(item.id)}>
  Delete
</button>

============================================================
32. Edit
============================================================
const [editingId, setEditingId] = useState(null);
{items.map((item) => (

  <div key={item.id}>

    {editingId === item.id ? (
      <input />
    ) : (
      <span>{item.name}</span>
    )}

    <button onClick={() => setEditingId(item.id)}>
      Edit
    </button>

  </div>

))}
============================================================
32. Update
============================================================
async function handleUpdate(id) {

  const updatedItem = await updateItem(id, {
    name: "Updated Task"
  });

  setItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? updatedItem
        : item
    )
  );
}
============================================================
32. Modal — חלון קופץ
============================================================
const [showModal, setShowModal] = useState(false);
<button onClick={() => setShowModal(true)}>
  Delete
</button>
{showModal && (
  <div className="modal">

    <h2>Delete Task?</h2>

    <p>Are you sure?</p>

    <button onClick={() => setShowModal(false)}>
      Cancel
    </button>

    <button onClick={handleDelete}>
      Delete
    </button>

  </div>
)} אפשר להוסיף css .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

============================================================
32. Success Message
============================================================
const [success, setSuccess] = useState("");
setSuccess("Task created successfully");
{success && (
  <p>{success}</p>
)}

============================================================
32. Disabled Button
============================================================
<button
  disabled={!name}
  onClick={handleAdd}
>
  Add
</button>
לא לאפשר שמירה אם אין שם

============================================================
32. Toggle ON/OFF
============================================================
const [enabled, setEnabled] = useState(false);
<button onClick={() => setEnabled(!enabled)}>
  {enabled ? "ON" : "OFF"}
</button>

============================================================
32. Tabs
============================================================
const [tab, setTab] = useState("all");
<button onClick={() => setTab("all")}>
  All
</button>

<button onClick={() => setTab("active")}>
  Active
</button>

<button onClick={() => setTab("completed")}>
  Completed
</button>
{tab === "all" && <AllTasks />}

{tab === "active" && <ActiveTasks />}

{tab === "completed" && <CompletedTasks />}
============================================================
32. Sort
============================================================
const sortedItems = [...items].sort((a, b) =>
  a.name.localeCompare(b.name)
);
============================================================
32. Dropdown Menu
============================================================
const [open, setOpen] = useState(false);
<button onClick={() => setOpen(!open)}>
  ⋮
</button>

{open && (
  <div>

    <button onClick={handleEdit}>
      Edit
    </button>

    <button onClick={handleDelete}>
      Delete
    </button>

  </div>
)}

============================================================
32. Accordion
============================================================
const [open, setOpen] = useState(false);
<button onClick={() => setOpen(!open)}>
  Details
</button>

{open && (
  <div>
    <p>Category: Work</p>
    <p>Priority: High</p>
    <p>Date: 13/08/2026</p>
  </div>
)}

============================================================
32. Pagination
============================================================
const [page, setPage] = useState(1);
button
  disabled={page === 1}
  onClick={() => setPage(page - 1)}
>
  Previous
</button>

<span>{page}</span>

<button onClick={() => setPage(page + 1)}>
  Next
</button>

============================================================
32. Date
============================================================
const [date, setDate] = useState("");
<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

============================================================
32. Number
============================================================
<input
  type="number"
  value={age}
  onChange={(e) => setAge(e.target.value)}
/>

============================================================
32. Textarea
============================================================
const [description, setDescription] = useState("");
<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Description"
/>

============================================================
32. Password
============================================================
const [password, setPassword] = useState("");
<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
סיסמה עם בדיקה 
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
const [password, setPassword] = useState("");

function handleSubmit(e) {
  e.preventDefault();

  if (!passwordRegex.test(password)) {
    alert(
      "Password must contain at least 8 characters, one uppercase letter, one number and one special character"
    );
    return;
  }

  console.log("Password is valid");
}
<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
/>
איך מחברים CSS ל־React

בקובץ App.jsx:

import "./App.css";

ואז:

<div className="container">
  Hello
</div>

וב־App.css:

.container {
  width: 500px;
  background-color: lightgray;
}

⚠️ ב־React משתמשים ב:

className

ולא:

class
2. צבעים
צבע רקע
.container {
  background-color: lightblue;
}
צבע טקסט
.title {
  color: blue;
}

אפשר גם:

color: #333;
background-color: #f5f5f5;
3. גודל טקסט
.title {
  font-size: 24px;
}

עובי:

.title {
  font-weight: bold;
}

יישור:

.title {
  text-align: center;
}
4. Width / Height
.container {
  width: 500px;
  height: 300px;
}

מאוד נפוץ להשתמש גם ב־%:

.container {
  width: 100%;
}

או:

.container {
  width: 80%;
}
5. Margin

margin = מרווח מחוץ לאלמנט.

.box {
  margin: 20px;
}

אפשר לשלוט בכל צד:

.box {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}

או בקיצור:

.box {
  margin: 10px 20px;
}

כלומר:

10px → למעלה ולמטה
20px → ימין ושמאל
6. Padding

padding = מרווח בתוך האלמנט.

.box {
  padding: 20px;
}

תחשבי:

┌───────────────────────┐
│       padding         │
│   ┌───────────────┐   │
│   │    content    │   │
│   └───────────────┘   │
│       padding         │
└───────────────────────┘
ההבדל החשוב:
margin  → בחוץ
padding → בפנים
7. Border
.box {
  border: 1px solid black;
}

פינות מעוגלות:

.box {
  border-radius: 8px;
}
8. Box Shadow

לכרטיסים וחלונות:

.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
9. Flexbox ⭐⭐⭐

זה אחד הדברים הכי חשובים ב־CSS למבחן.

לדוגמה:

.container {
  display: flex;
}

עכשיו הילדים נמצאים אחד ליד השני.

┌─────────────────────────┐
│ Box 1   Box 2   Box 3   │
└─────────────────────────┘
justify-content

קובע איך מסדרים אותם בכיוון הראשי.

.container {
  display: flex;
  justify-content: center;
}

אפשר:

justify-content: flex-start;
justify-content: flex-end;
justify-content: center;
justify-content: space-between;
justify-content: space-around;
למשל:
.container {
  display: flex;
  justify-content: space-between;
}

נותן:

Box 1                     Box 2
10. align-items ⭐

קובע יישור בכיוון השני.

.container {
  display: flex;
  align-items: center;
}

שילוב מאוד נפוץ:

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

כלומר:

שים את התוכן באמצע אופקית ואנכית.

11. gap

מרווח בין אלמנטים:

.container {
  display: flex;
  gap: 10px;
}

לדוגמה:

Button    Button    Button
   ←10px→

מאוד שימושי.

12. Flex Direction

ברירת מחדל:

display: flex;

האלמנטים הולכים בשורה.

אם רוצים עמודה:

.container {
  display: flex;
  flex-direction: column;
}

מקבלים:

Input

Input

Button
13. דוגמה מאוד נפוצה

נניח שיש לך:

<div className="form">
  <input />
  <input />
  <button>Save</button>
</div>

CSS:

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

תקבלי טופס מסודר:

┌──────────────────┐
│ Input            │
├──────────────────┤
│ Input            │
├──────────────────┤
│ Save             │
└──────────────────┘
14. Grid

גם Grid חשוב, במיוחד אם רוצים כמה עמודות.

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

אם יש לך 6 Cards:

┌──────┐ ┌──────┐ ┌──────┐
│ Card │ │ Card │ │ Card │
└──────┘ └──────┘ └──────┘

┌──────┐ ┌──────┐ ┌──────┐
│ Card │ │ Card │ │ Card │
└──────┘ └──────┘ └──────┘
15. Button Styling
.button {
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
16. Hover

מה קורה כשהעכבר עובר מעל הכפתור:

.button:hover {
  background-color: darkblue;
}
17. Disabled

למשל:

<button disabled={!name}>
  Save
</button>

CSS:

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
18. Input Styling
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

כשהמשתמש לוחץ על input:

input:focus {
  outline: none;
  border: 2px solid blue;
}
19. Card ⭐

מאוד נפוץ באפליקציות:

.card {
  background: white;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

React:

<div className="card">
  <h3>{item.name}</h3>
  <button>Delete</button>
</div>
20. Position

יש:

position: static;
position: relative;
position: absolute;
position: fixed;

למבחן הכי חשוב להבין:

relative

נותן לאלמנט נקודת ייחוס.

.card {
  position: relative;
}
absolute

ממקם אלמנט ביחס לאלמנט ה־relative שלו.

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

למשל:

┌──────────────────────┐
│                 [X]  │
│                      │
│ Task                 │
│                      │
└──────────────────────┘
21. Modal — חשוב מאוד

כדי שהחלון הקופץ יהיה מעל כל העמוד:

.modal {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

והתוכן:

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
}

React:

{showModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Delete Task?</h2>

      <button>Cancel</button>
      <button>Delete</button>
    </div>
  </div>
)}
22. display: none

להעלים אלמנט:

.hidden {
  display: none;
}

אבל ב־React בדרך כלל עדיף לעשות:

{showModal && <Modal />}

במקום להציג אותו ואז להסתיר אותו ב־CSS.

23. Overflow

אם תוכן חורג מהקופסה:

.container {
  overflow: hidden;
}

או:

overflow: auto;

שיכול ליצור גלילה.

24. 100vh

גובה של כל המסך:

.page {
  min-height: 100vh;
}

מאוד שימושי למסכים כמו Login.

25. Responsive Design ⭐⭐

האפליקציה צריכה לעבוד גם בטלפון.

.container {
  width: 80%;
}

ואפשר Media Query:

@media (max-width: 600px) {
  .container {
    width: 100%;
  }
}

כלומר:

אם המסך קטן מ־600px, שנה את העיצוב.

26. box-sizing

מומלץ מאוד לשים בתחילת CSS:

* {
  box-sizing: border-box;
}

זה גורם ל־width לכלול גם padding ו־border, מה שהופך את חישובי הגדלים להרבה יותר צפויים.

27. CSS Class לפי מצב

ב־React אפשר לשנות עיצוב לפי state.

למשל Task שהושלם:

<div className={checked ? "completed" : "task"}>
  {item.name}
</div>

CSS:

.task {
  color: black;
}

.completed {
  color: gray;
  text-decoration: line-through;
}

אם checked הוא true:

Task
────

כלומר הטקסט יהיה מחוק.

28. רשימת Tasks אמיתית

נניח:

{items.map((item) => (
  <div className="task-card" key={item.id}>

    <input type="checkbox" />

    <span>{item.name}</span>

    <button>Edit</button>

    <button>Delete</button>

  </div>
))}

CSS:

.task-card {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 15px;
  margin-bottom: 10px;

  border: 1px solid #ddd;
  border-radius: 8px;
}

.task-card span {
  flex: 1;
}
┌─────────────────────────────────────┐
│ ☑  Learn React          Edit Delete │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ☐  Learn Node           Edit Delete │
└─────────────────────────────────────┘\
הקמת פרוייקט
npm create vite@latest client
cd client
npm install
npm run dev
 frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   ├── pages/
    │   └── api/
    │       └── itemsApi.js
    └── package.json