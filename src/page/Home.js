import React, { useEffect, useState } from 'react'
import StudentList from '../component/StudentList';
import StudentAdd from '../component/StudentAdd';

export default function Home() {
    const [students, setStudents] = useState();

    // Fetch users on component mount
    useEffect(() => {
        fetchStudent();
    }, []);
    // Fetch students from API
    const fetchStudent = async () => {
        console.log("Retrive API call");
        try {
            const response = await fetch('http://localhost:80/collegeapi/v1/retrive.php');
            const data = await response.json();
            if (data.status === 1) {
                setStudents(data.respData);
            }
            console.log(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };
    const deleteStudent = async (stdId) => {
        console.log("Delete API call");
        try {
            let response = await fetch(`http://localhost:80/collegeapi/v1/delete.php?id=${stdId}`,
                {
                    method: "DELETE",
                });
            if (response.ok) {
                const updatedStudents = students.filter((std) => std.id !== stdId);
                setStudents(updatedStudents);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Update an existing user
    const updateStudent = async (stdData) => {
        console.log("Update API call" + JSON.stringify(stdData));
        try {
            const response = await fetch(`http://localhost/collegeapi/v1/update.php?id=${stdData.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stdData)
            });
            if (response.ok) {
                const updatedStudents = students.map((std) =>
                    std.id === stdData.id ? stdData : std)
                setStudents(updatedStudents);
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };
    // Create a new student
    const addStudent = async (stdData) => {
        console.log("create API call" + JSON.stringify(stdData));
        try {
            const response = await fetch('http://localhost/collegeapi/v1/create.php', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stdData),
            });
            if (response.ok) {
                fetchStudent();
            }
        } catch (error) {
            console.error('Error adding Student:', error);
        }
    };
    return (
        <div>
            <StudentAdd createStudentData={addStudent} initialData={{ name: '', email: '', age: '' }} />
            <StudentList diplayStudentData={students} updateStudentData={updateStudent} deleteStudentData={deleteStudent} />
        </div>
    )
}
