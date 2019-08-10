const initialState = {
  studentList: [
    {
      id: 1,
      country: "US",
      email_id: "tejal@gmail.com",
      gender: "male",
      hobby: "Dancing",
      name: "wsdsd",
      password: "Tejal@2812",
      retypepassword: "Tejal@2812"
    },
    {
      id: 2,
      country: "US",
      email_id: "tejal1@gmail.com",
      gender: "male",
      hobby: "Dancing",
      name: "wsdsd",
      password: "Tejal@2812",
      retypepassword: "Tejal@2812"
    },
    {
      id: 3,
      country: "US",
      email_id: "tejal2@gmail.com",
      gender: "male",
      hobby: "Dancing",
      name: "wsdsd",
      password: "Tejal@2812",
      retypepassword: "Tejal@2812"
    }
  ],
  idCounter: 1
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STUDENT_LIST":
      return {
        ...state,
        studentList: [
          ...state.studentList,
          { ...action.payload, id: state.idCounter + 1 }
        ],
        idCounter: state.idCounter + 1
      };

    case "EDIT_STUDENT_LIST":
      return {
        ...state,
        studentList: [
          ...state.studentList.map((item, index) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload.values }
              : item
          )
        ]
      };

    case "DELETE_STUDENT":
      var valueList = state.studentList;
      action.payload.map(item =>{
        valueList= valueList.filter(student => student.id!= item)
      })
      return {
        ...state,
        studentList: valueList
      };
    default:
      return state;
  }
};
