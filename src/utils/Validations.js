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
   else if(regex.test(phone)) {
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
   // const regex = /^[^\sA-Za-z0-9]{6}$/;

   //adicionar lógica envolvendo requisição do banco

   if(!teamCode) {
      return false;
   }
   else if(teamCode.length < 6) {
      return false;
   }
   else if(typeof customCondition == 'function' && !customCondition(teamCode)) {
      return false;
   }
   else {
      return true;
   }
}

export function ImageValidation(file) {
   const allowedExtensions = ['image/jpeg', 'image/png', 'image/jpeg'];

   if(!file) {
      return false;
   }
   else if(!allowedExtensions.includes(file.type)) {
      return false;
   }
   else if(typeof customCondition == 'function' && !customCondition(fileName)) {
      return false;
   }
   else {
      return true;
   }
}

export function WeightValidation(weight) {
    const weightRegex = /^(?:\d{1,3}\.\d{2}|\d{2}\.\d{2})$/;

    if (!weight || !weight.match(weightRegex)) {
        return false;
    } else {
        const integerPart = parseFloat(weight.split(' ')[0]);

        if (integerPart < 100) {
            return weight.split('.')[0].length === 2;
        } else {
            return true;
        }
    }
}

export function HeightValidation(heigth) {
    const heigthRegex = /^(?:[01]\.\d{2}|2\.(?:[0-5]\d|60))$/

    if (!heigth || !heigth.match(heigth)) {
        return false;
    } 

    return heigthRegex.test(heigth);
}

export function PositionValidation(position) {
    const validPositions = ['PIVO', 'ARMADOR', 'ALA-ARMADOR', 'ALA', 'ALA-PIVO'];

    return validPositions.includes(position.toUpperCase());
}

export function CategoryValidation(category) {
    const categoryRegex = /^(Sub-[1-9][0-9]?)$/;

    return categoryRegex.test(category);
}

export function TimeValidation(time) {
   let regex = /^(?:2[0-3]|[01][0-9]):(?:[0-5][0-9])$/;

   return regex.test(time);
}