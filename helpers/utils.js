export const cn = (...arr) => {
  let list = arr.map(item => {
    if (typeof item === "object") {
     const value = Object.values(item);
      if (value[0])
        return Object.keys(item).join("");
      else 
        return "";
    } else {
      return item;
    }
  })
  .filter(item => item !== "")
  .join(" ");

  return list;
}


export const formatNumber = number => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(number);
}


export const CFL = string => { //capitalize first letter
  return string.charAt(0).toUpperCase() + string.slice(1);
}
