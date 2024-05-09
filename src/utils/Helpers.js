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

export const Colors = {
   //tons de laranja
   orange600: '#CE5F20',
   orange500: '#FF7425',
   orange300: '#FFA877',
   orange100: '#FFEAE0',
   //tons de cinza/preto
   gray900: '#131313',
   gray800: '#191919',
   gray700: '#242424',
   gray600: '#323232',
   gray500: '#5B5B5B',
   gray200: '#D7D7D7',
   gray100: '#FFF9F6',
   //tons variados
   green: '#3FB03D',
   red: '#FF3838'
}


export const Months = [
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
     value = Months[Math.ceil(i) % 12];
     values.push(value.substring(0, section));
   }
}

export function mergeSort(arr, param) {
   if (arr.length <= 1) {
      return;
   }

   const mid = Math.floor(arr.length / 2);
   const left = arr.slice(0, mid);
   const right = arr.slice(mid);

   mergeSort(left, param);
   mergeSort(right, param);
   merge(arr, left, right, param);
}

function merge(arr, left, right, param) {
   let leftIndex = 0;
   let rightIndex = 0;
   let arrIndex = 0;

   while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex][param] < right[rightIndex][param]) {
         arr[arrIndex] = left[leftIndex];
         leftIndex++;
      } else {
         arr[arrIndex] = right[rightIndex];
         rightIndex++;
      }
      arrIndex++;
   }

   while (leftIndex < left.length) {
      arr[arrIndex] = left[leftIndex];
      leftIndex++;
      arrIndex++;
   }

   while (rightIndex < right.length) {
      arr[arrIndex] = right[rightIndex];
      rightIndex++;
      arrIndex++;
   }
}

export const size = {
   mobileS: '320px',
   mobileM: '375px',
   mobileL: '425px',
   tablet: '768px',
   laptop: '1024px',
   laptopL: '1440px',
   desktop: '2560px'
 }

 export const device = {
   mobileS: `(min-width: ${size.mobileS})`,
   mobileM: `(min-width: ${size.mobileM})`,
   mobileL: `(min-width: ${size.mobileL})`,
   tablet: `(min-width: ${size.tablet})`,
   laptop: `(min-width: ${size.laptop})`,
   laptopL: `(min-width: ${size.laptopL})`,
   desktop: `(min-width: ${size.desktop})`,
   desktopL: `(min-width: ${size.desktop})`
 };

const Utils = {
   calcAge,
   months,
   colors: Colors,
   filterByAttr,
   mergeSort,
   device,
   size
}

export default Utils;