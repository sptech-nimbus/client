export function PasswordValidation(password, customCondition) {
   const regexPassword = /^(?=.*[!@#$%^&*()-_+=|{}[\]:;'"<>,.?/~])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

   if(!password) {
      return false;
   }
   else if(!regexPassword.test(password)) {
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
   if(!confirmPassword) {
      return false;
   }
   else if(password != confirmPassword) {
      return false;
   }
   else if(typeof customCondition == 'function' && !customCondition(confirmPassword)) {
      return false;
   }
   else {
      return true;
   }
}

export function TextValidation(text, customCondition) {
   const regex = /^[a-zA-Z]+$/;

   if(!text) {
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

   if(!email) {
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

   if(!date) {
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

   if(!date) {
      return false;
   }
   else if(inputDate > currentDate) {
      return false;
   }
   else {
      return true;
   }
}

export function BrPhoneValidation(phone) {
   const regex = /^\d{11}$/;

   if(!phone == null) {
      return false;
   }
   else if(!regex.test(phone)) {
      return false;
   }
   else if(typeof customCondition == 'function' && !customCondition(phone)) {
      return false;
   }
   else {
      return true;
   }
}

export function TeamCodeValidation(teamCode) {
   const regex = /^[^\sA-Za-z0-9]{6}$/;

   if(!teamCode) {
      return false;
   }
   else if(!regex.test(teamCode)) {
      return false;
   }
   else if(typeof customCondition == 'function' && !customCondition(teamCode)) {
      return false;
   }
   else {
      return true;
   }
}

export function FileExtensionValidation(fileName, allowedExtensions) {
   if(!fileName) {
      return false;
   }

   const extension = fileName.split('.').pop().toLowerCase();

   if(!allowedExtensions.includes(extension)) {
      return false;
   }
   else if(typeof customCondition == 'function' && !customCondition(fileName)) {
      return false;
   }
   else {
      return true;
   }
}