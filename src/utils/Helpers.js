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
      const itemValue = item[attr]
      return itemValue.toLowerCase().includes(param.toLowerCase());
   });
}

export const Colors = {
   //tons de laranja
   orange600: '#CE5F20',
   orange500: '#FF7425',
   orange300: '#FFA877',
   orange200: '#FAD3C0',
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
   red: '#FF3838',
   yellow: '#F9A400'
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

const weekDays = [
   "Dom",
   "Seg",
   "Ter",
   "Qua",
   "Qui",
   "Sex",
   "Sáb",
]

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

   return values;
}

export function sort(arr, param) {
   if (arr.length <= 1) {
      return arr;
   }

   const mid = Math.floor(arr.length / 2);
   const left = arr.slice(0, mid);
   const right = arr.slice(mid);

   return merge(sort(left, param), sort(right, param), param);
}

function merge(left, right, param) {
   let sortedArray = [];
   let leftIndex = 0;
   let rightIndex = 0;

   while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex][param] < right[rightIndex][param]) {
         sortedArray.push(left[leftIndex]);
         leftIndex++;
      } else {
         sortedArray.push(right[rightIndex]);
         rightIndex++;
      }
   }

   return sortedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

export const formatDate = (date, to = 'pt-BR') => {
   const dateFormatted = new Date(date);
   return dateFormatted.toLocaleDateString(to);
}

export const calcDayDiff = (inicialDate, finalDate) => {
   const startDate = new Date(inicialDate);
   const endDate = new Date(finalDate);
   const diffTime = Math.abs(endDate - startDate);
   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const sumTimes = (times) => {
   let totalSeconds = 0;

   times.forEach(time => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      totalSeconds += (hours * 3600) + (minutes * 60) + seconds;
   });

   const totalHours = Math.floor(totalSeconds / 3600);
   totalSeconds %= 3600;
   const totalMinutes = Math.floor(totalSeconds / 60);
   const totalRemainingSeconds = totalSeconds % 60;

   const formatNumber = num => num.toString().padStart(2, '0');

   return `${formatNumber(totalHours)}:${formatNumber(totalMinutes)}:${formatNumber(totalRemainingSeconds)}`;
}

export const Size = {
   mobileS: '320px',
   mobileM: '375px',
   mobileL: '425px',
   tablet: '768px',
   laptop: '1024px',
   laptopL: '1440px',
   desktop: '2560px'
}

export const Device = {
   mobileS: `(min-width: ${Size.mobileS})`,
   mobileM: `(min-width: ${Size.mobileM})`,
   mobileL: `(min-width: ${Size.mobileL})`,
   tablet: `(min-width: ${Size.tablet})`,
   laptop: `(min-width: ${Size.laptop})`,
   laptopL: `(min-width: ${Size.laptopL})`,
   desktop: `(min-width: ${Size.desktop})`,
};

const getTeamInitials = (name) => {
   const nameArray = name.split(' ');
   let initials = '';

   nameArray.forEach(element => initials += element[0]);

   initials = initials.replace('undefined', '').toUpperCase();
   return initials;
}

const Utils = {
   calcAge,
   months,
   filterByAttr,
   sort,
   weekDays,
   colors: Colors,
   device: Device,
   size: Size,
   formatDate,
   calcDayDiff,
   sumTimes,
   getTeamInitials
}

export default Utils;