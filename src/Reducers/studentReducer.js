const initialState = {
  studentList: [
    {
      id: 1,
      country: "US",
      email_id: "tejal@gmail.com",
      gender: "male",
      hobby: ["Reading", "Drawing"],
      name: "wsdsd",
      password: "Tejal@2812",
      retypepassword: "Tejal@2812"
    },
    {
      id: 2,
      country: "US",
      email_id: "tejal1@gmail.com",
      gender: "male",
      hobby: ["Swimming", "Travelling"],
      name: "wsdsd",
      password: "Tejal@2812",
      retypepassword: "Tejal@2812"
    },
    {
      id: 3,
      country: "US",
      email_id: "tejal2@gmail.com",
      gender: "male",
      hobby: ["Travelling", "Drawing"],
      name: "wsdsd",
      password: "Tejal@2812",
      retypepassword: "Tejal@2812"
    }
  ],
  idCounter: 3
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
      return {
        ...state,
        studentList: [
          ...state.studentList.filter(
            student => !action.payload.includes(student.id)
          )
        ]
      };
    default:
      return state;
  }
};
