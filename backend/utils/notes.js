const formattimestamp = (timestamp) => {
    const timearr = timestamp.split(":");
    while (timearr.length !== 3) {
      timearr.unshift("00");
    }
    let formattedtimestamp = "";
    timearr.forEach((element, index) => {
      if (index === 2) formattedtimestamp += element;
      else formattedtimestamp += element + ":";
    });
    console.log(formattedtimestamp);
    return formattedtimestamp;
  };
  
module.exports={formattimestamp};