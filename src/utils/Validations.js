export function PasswordValidation(password, customCondition) {
   const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#*_])[A-Za-z\d@#*_]{8,}$/;

   if(password == null || password == undefined || password == '') {
      return false;
   }
   else if(regexPassword.test(password)) {
      return false;
   } 
   else if(typeof customCondition == 'function' && !customCondition(password)) {
      return false;
   }
   else {
      return true;
   }
}

export function ConfirmPasswordValidation(password, confirmPassword, customCondition) {
   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#*_])[A-Za-z\d@#*_]{8,}$/;

   if(password == null || password == undefined || password == '') {
      return false;
   }
   else if(regex == confirmPassword) {
      return false;
   } 
   else if(typeof customCondition == 'function' && !customCondition(password)) {
      return false;
   }
   else {
      return true;
   }
}

export function TextValidation(text, customCondition) {
   const regex = /^[a-zA-Z]+$/;

   if(text == null || text == undefined || text == '') {
      return false;
   }
   else if(text.length < 2) {
      return false;
   }
   else if(!regex.test(text)) {
      return false;
   }
   else if(typeof customCondition == 'function' && !customCondition(text)) {
      return false;
   }
   else {
      return true;
   }
}

export function EmailValidation(email) {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if(email == null || email == undefined || email == '') {
      return false;
   }
   else if(!regex.test(email)) {
      return false;
   }
   else if(typeof customCondition == 'function' && !customCondition(email)) {
      return false;
   }
   else {
      return true;
   }
}

export function FutureDateValidation(date) {
   const currentDate = new Date();
   const inputDate = new Date(date);

   if(date == null || date == undefined || date == '') {
      return false;
   }
   else if(inputDate < currentDate) {
      return false;
   }
   else {
      return true;
   }
}

export function PastDateValidation(date) {
   const currentDate = new Date();
   const inputDate = new Date(date);

   if(date == null || date == undefined || date == '') {
      return false;
   }
   else if(inputDate > currentDate) {
      return false;
   }
   else {
      return true;
   }
}