const paramsToString = (params) => {
  console.log("PARMNSTR PARM", params);
  let paramString = "";
  if (params.constructor === Object && Object.keys(params).length) {
    let tmp = [];
    for (let key in params) {
      let paramStr = params[key];
      if (paramStr !== "") {
        if (typeof params[key] === "string") {
          paramStr = `"${paramStr}"`;
        }
        tmp.push(`${key}:${paramStr}`);
      }
    }
    if (tmp.length) {
      paramString = `(${tmp.join()})`;
    }
  }
  return paramString;
};

var clean = (object) => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === "object") {
      clean(v);
    }

    if (
      (v && typeof v === "object" && !Object.keys(v).length) ||
      v === null ||
      v === undefined
    ) {
      if (JSON.stringify(v) != "[]") {
        if (Array.isArray(object)) {
          object.splice(k, 1);
        } else {
          delete object[k];
        }
      }
    }
  });
  return object;
};

var QLOutPut = (rslog, object, view) => {
  // console.log(rslog, object, view);
  //eliminate all the null values from the data
  try {
    var response = clean(JSON.parse(JSON.stringify(object)));
    console.log("OutPut======object==========", response);
    //ATN:String
    //RTN:String
    return response.data[view];
  } catch (err) {
    let outPutArr = {};
    outPutArr.RESPONSECODE = 0;
    outPutArr.ERRCODE = 1;
    outPutArr.ERRMSG =
      "We are facing some technical difficulties. Please try again";
    console.error("utils try catch error", err.message);
    return outPutArr;
  }
};

module.exports.QLOutPut = QLOutPut;
module.exports.paramsToString = paramsToString;
module.exports.clean = clean;
