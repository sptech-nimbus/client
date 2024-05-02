import Colors from './Colors';

export const calcAge = (birthDate) => {
   const currDate = new Date();
   const birth = new Date(birthDate);

   let age = currDate.getFullYear() - birth.getFullYear();
   const monthDiff = currDate.getMonth() - birth.getMonth(); 
   
   if (monthDiff < 0 || (monthDiff === 0 && currDate.getDate() < birth.getDate())) {
      age--;
   }
  
  return age;
}

export const filterByAttr = (array, attr, param) => {
   return array.filter(item => {
     const itemValue = item[attr] ? item[attr].toLowerCase() : '';
     const parameter = param.toLowerCase();
     return itemValue.includes(parameter);
   });
}

const MONTHS = [
   'Janeiro',
   'Fevereiro',
   'Março',
   'Abril',
   'Maio',
   'Junho',
   'Julho',
   'Agosto',
   'Setembro',
   'Outubro',
   'Novembro',
   'Dezembro'
 ];
 
export const months = (config) => {
   let cfg = config || {};
   let count = cfg.count || 12;
   let section = cfg.section;
   let values = [];
   let i, value;
 
   for (i = 0; i < count; ++i) {
     value = MONTHS[Math.ceil(i) % 12];
     values.push(value.substring(0, section));
   }
}

const Utils = {
   calcAge,
   months,
   filterByAttr
}

export default Utils;