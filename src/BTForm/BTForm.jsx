// rafc
import React from 'react'
import { StudentForm } from './StudentForm'
import { StudentTable } from './StudentTable'

export const BTForm = () => {
    return (
        <div className="container mt-3">
            <h1>BTForm</h1>
            <StudentForm />
            <StudentTable />
        </div>
    )
}
