
    // ดักจับการ submit ของฟอร์ม
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault(); // ป้องกันการ reload หน้าหลังจาก submit
        
             // แสดง Modal
        const modal = document.getElementById('successModal');
        modal.style.display = 'block';

        // ปิด Modal เมื่อคลิกปุ่มตกลงหรือปุ่มปิด
        document.getElementById('modalConfirm').addEventListener('click', function () {
            modal.style.display = 'none';
            window.location.reload(); // รีโหลดหน้าเว็บ (optional)
        });

        document.querySelector('.close').addEventListener('click', function () {
             modal.style.display = 'none';
        });

    });

    //อื่นๆ
    document.getElementById('otherCheckbox').addEventListener('change', function () {
        const otherInputContainer = document.getElementById('otherInputContainer');
        if (this.checked) {
            otherInputContainer.style.display = 'block'; // แสดงช่องกรอกข้อมูล
        } else {
            otherInputContainer.style.display = 'none'; // ซ่อนช่องกรอกข้อมูล
        }
    });