import React, { useState } from 'react'
import './crud.css';
import StudentAdd from './StudentAdd';

export default function StudentList({ diplayStudentData, updateStudentData, deleteStudentData }) {
    const [selctedStudentData, setSelctedStudentData] = useState({});
    const [enbleFormforUpdate, setEnbleFormforUpdate] = useState(false);


    const editStudent = (stdData) => {
        setEnbleFormforUpdate(true);
        setSelctedStudentData(stdData);
    }

    return (
        <>  {
            enbleFormforUpdate ? (
                <StudentAdd updateStudentData={updateStudentData} initialData={selctedStudentData} />
            ) : null
        }
            <div className='container'>
                <h3>List of Student</h3>
                <table border='1'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>EMAIL</td>
                            <td>AGE</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            diplayStudentData?.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.age}</td>
                                    <td>
                                        <button className="deleteButton" onClick={() => deleteStudentData(item.id)}>Delete</button>
                                        <button className="updateButton" onClick={() => editStudent(item)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
