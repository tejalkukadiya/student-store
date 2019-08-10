
export const AddStudentData= (values) => dispatch =>{
    dispatch({
        type:"ADD_STUDENT_LIST",
        payload:values
    })
}
export const EditStudentData = (id,values) => dispatch =>{
    dispatch({
        type:"EDIT_STUDENT_LIST",
        payload:{id:id,values}
    })
}

export const deleteStudent = (studentId) => dispatch =>{
    dispatch ({
        type : "DELETE_STUDENT",
        payload:studentId

    })
}

