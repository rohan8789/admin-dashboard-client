let error = {
  name:"",
  fname: "",
  lname: "",
  email: "",
  empid: "",
  phno: "",
  dob: "",
  image: null,
  currPassword: "",
  password: "",
  repassword: "",
  captcha: "",

  title: "",
  logo: null,
  f_icon: null,
  m_mode: "",
  i_mode: "",

  heading: "",
  description: "",
  slugurl: "",
  redirecturl: "",
  redirect_mode: "",

  role:"",
  type:"",
  worktype:"",
  designation:""
};
function validateInput(prop, value) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const nameRegex = /^[0-9a-zA-Z-' ]+$/;
  const titleRegex = /^[a-zA-Z0-9\s,.#'"/-]+$/;
  const currDate = new Date();

  //console.log("validate",prop, value, value.length)

  if (prop === "name") {
    if (value.length === 0) error.name = `Please provide your ${prop}`;
    else if (value.length <= 1) error.name = `${prop} is too short`;
    else if (value.length > 15) error.name = `${prop} is too long`;
    else if (nameRegex.test(value) === false)
      error.name = `Only letters, spaces, hyphens, and apostrophes allowed.`;
  }

  if (prop === "fname") {
    if (value.length === 0) error.fname = `Please provide your ${prop}`;
    else if (value.length <= 1) error.fname = `${prop} is too short`;
    else if (value.length > 15) error.fname = `${prop} is too long`;
    else if (nameRegex.test(value) === false)
      error.fname = `Only letters, spaces, hyphens, and apostrophes allowed.`;
  }
  if (prop === "lname") {
    if (value.length === 0) error.lname = `Please provide your ${prop}`;
    else if (value.length <= 1) error.lname = `${prop} is too short`;
    else if (value.length > 15) error.lname = `${prop} is too long`;
    else if (nameRegex.test(value) === false)
      error.lname = `Only letters, spaces, hyphens, and apostrophes allowed.`;
  }

  if (prop === "email") {
    if (value.length === 0) error.email = `Please provide your email id.`;
    else if (emailRegex.test(value) === false)
      error.email = `Please enter a Valid email-id.`;
  }

  if (prop === "empid") {
    if (value.length === 0) error.empid = `Please provide your ${prop}`;
    else if (value.length <= 1) error.empid = `${prop} is too short`;
    else if (value.length > 15) error.empid = `${prop} is too long`;
  }

  if (prop === "image") {
    const maxSize = 1024 * 1024;
    if (value === null)
      error.image = `please provide an image of .jpg, .jpeg, .png type`;
    else if (value.size > maxSize)
      error.image = "image size should be less than 500kb";
  }

  if (prop === "phno") {
    if (value.length <= 9 || value.length >= 12)
      error.phno = "Enter a valid contact number.";
    let f = 0;
    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) >= 58 || value.charCodeAt(i) <= 47) {
        f = 1;
        break;
      }
    }
    if (f === 1) error.phno = "Enter a valid contact number.";
  }

  if (prop === "dob") {
    if (value.length === 0) {
      error.dob = `Please provide your dob.`;
    }
    const Birthdate = new Date(value);
    const timeDiff = currDate.getTime() - Birthdate.getTime();
    const diffInYears = timeDiff / (1000 * 60 * 60 * 24 * 365.25);
    const age = Math.floor(diffInYears);
    if (age <= 16) error.dob = "Admin age should be above 18.";
  }

  if (prop === "captcha")
    if (value.length === 0) error.captcha = `Please enter a valid captcha.`;

  if (prop === "currPassword") {
    if (value.length === 0) error.currPassword = `Please Enter your ${prop}`;
    else if (passwordRegex.test(value) === false)
      error.currPassword = `${prop} should have atleast 6 character, one uppercase letter, one digit, one special character`;
  }

  if (prop === "password") {
    if (value.length === 0) error.password = `Please Enter your ${prop}`;
    else if (passwordRegex.test(value) === false)
      error.password = `${prop} should have atleast 6 character, one uppercase letter, one digit, one special character`;
  }

  if (prop === "repassword") {
    if (value.length === 0) error.repassword = `Please Enter your ${prop}`;
    else if (passwordRegex.test(value) === false)
      error.repassword = `${prop} should have atleast 6 character, one uppercase letter, one digit, one special character`;
  }





  //site-information-validation
  if (prop === "title") {
    if (value.length === 0) error.title = `Please provide a ${prop}`;
    else if (value.length <= 2) error.title = `${prop} is too short`;
    else if (value.length > 19) error.title = `${prop} is too long`;
    else if (titleRegex.test(value) === false)
      error.title = `${prop} can only contain letters, numbers, and basic punctuation.`;
  }

  if (prop === "logo") {
    const maxSize = 1024 * 1024;
    if (value === null)
      error.logo = `please provide an logo of .jpg, .jpeg, .png type`;
    else if (value.size > maxSize)
      error.logo = "Logo size should be less than 500kb";
  }

  if (prop === "f_icon") {
    const maxSize = 1024 * 1024;
    if (value === null)
      error.f_icon = `please provide an image of .jpg, .jpeg, .png type`;
    else if (value.size > maxSize)
      error.f_icon = "image size should be less than 500kb";
  }

  if (prop === "m_mode") {
    if (value.length === 0) error.m_mode = "Please select some value";
  }

  if (prop === "i_mode") {
    if (value.length === 0) error.i_mode = "Please select some value";
  }

  if (prop === "role") {
    if (value.length === 0) error.role = "Please select some value";
  }





  //static pages validation

  if (prop === "heading") {
    if (value.length === 0) error.heading = `Please provide ${prop}`;
    else if (value.length <= 5) error.heading = `${prop} is too short`;
    else if (value.length > 400) error.heading = `${prop} is too long`;
  }

  if (prop === "description") {
    if (value.length === 0) error.description = `Please provide ${prop}`;
    else if (value.length <= 10) error.description = `${prop} is too short`;
    else if (value.length > 400) error.description = `${prop} is too long`;
  }

  if(prop === "slugurl") {
    if(value.length===0)error.slugurl=`Please provide slug url`;
  }

  if (prop === "redirecturl") {
    if (value.length===0) error.redirecturl = `Please provide redirect url`;
  }

  if (prop === "redirect_mode") {
    if (value.length === 0) error.redirect_mode = "Please select some value";
  }


  //news 
  if(prop === "type"){
    if(value.length === 0)error.type = "Please select some value";
  }
  
  if (prop === "worktype") {
    if (value.length === 0) error.worktype = "Please select some value";
  }

  if (prop === "designation") {
    if (value.length === 0) error.designation = "Please select some value";
  }
}

export const validate = (values) => {
  //console.log("Validate", values)
  if (values.fname !== undefined) validateInput("fname", values.fname);
  if (values.lname !== undefined) validateInput("lname", values.lname);
  if (values.email !== undefined) validateInput("email", values.email);
  if (values.empid !== undefined) validateInput("empid", values.empid);
  if (values.dob !== undefined) validateInput("dob", values.dob);
  if (values.phno !== undefined) validateInput("phno", values.phno);
  if (values.image !== undefined) validateInput("image", values.image);
  if (values.captcha !== undefined) validateInput("captcha", values.captcha);
  if (values.currPassword !== undefined) validateInput("currPassword", values.currPassword);
  if (values.password !== undefined) validateInput("password", values.password);
  if (values.repassword !== undefined) validateInput("repassword", values.repassword);

  //site information
  if (values.title !== undefined) validateInput("title", values.title);
  if (values.logo !== undefined) validateInput("logo", values.logo);
  if (values.f_icon !== undefined) validateInput("f_icon", values.f_icon);
  if (values.m_mode !== undefined) validateInput("m_mode", values.m_mode);
  if (values.i_mode !== undefined) validateInput("i_mode", values.i_mode);

  //static pages
  if (values.heading !== undefined) validateInput("heading", values.heading);
  if (values.description !== undefined) validateInput("description", values.description);
  if (values.slugurl !== undefined) validateInput("slugurl", values.slugurl);
  if (values.redirecturl !== undefined) validateInput("redirecturl", values.redirecturl);
  if (values.redirect_mode !== undefined) validateInput("redirect_mode", values.redirect_mode);

  //add user
  if (values.name !== undefined) validateInput("name", values.name);
  if (values.role !== undefined) validateInput("role", values.role);


  //add news
  if (values.type !== undefined) validateInput("type", values.type);
  if (values.worktype !== undefined) validateInput("worktype", values.worktype);
  if (values.designation !== undefined) validateInput("designation", values.designation);
  return error;
};
