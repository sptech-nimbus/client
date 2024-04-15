export function CalcAge(birthDate) {
   const currDate = new Date();
   const birth = new Date(birthDate);

   let age = currDate.getFullYear() - birth.getFullYear();
   const monthDiff = currDate.getMonth() - birth.getMonth(); 
   
   if (monthDiff < 0 || (monthDiff === 0 && currDate.getDate() < birth.getDate())) {
      age--;
   }
  
  return age;
}

export function FilterByAttr(array, attr, param) {
   return array.filter(item => {
     const itemValue = item[attr] ? item[attr].toLowerCase() : '';
     const parameter = param.toLowerCase();
     return itemValue.includes(parameter);
   });
}

export function ConvertDate() {

}

