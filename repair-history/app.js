const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// ตั้งค่า EJS เป็นเทมเพลตเอ็นจิ้น
app.set('view engine', 'ejs');

// ตั้งค่า static folder สำหรับไฟล์ CSS
app.use(express.static('public'));


// ตั้งค่า body-parser เพื่ออ่านข้อมูลจากฟอร์ม
app.use(express.urlencoded({ extended: true })); // เพิ่มบรรทัดนี้


// เชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'repair_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// เส้นทางหลักสำหรับแสดงประวัติการซ่อมบำรุง
app.get('/', (req, res) => {
    const query = 'SELECT * FROM repair_history';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // ส่งข้อมูลไปยัง EJS template
        res.render('history', { history: results });
    });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



app.post('/update-status/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = 'UPDATE repair_history SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/admin'); // Redirect กลับไปยังหน้า Admin
    });
});

app.get('/admin', (req, res) => {
    const query = 'SELECT * FROM repair_history';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('admin', { history: results });
    });
});






