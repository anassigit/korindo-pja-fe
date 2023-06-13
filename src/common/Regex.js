function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

export const replaceAll = (str, find, replace) => {
    if(find != null){
        str = str.toString();
        return str.replace(
            new RegExp(escapeRegExp(find), 'g'
            ), replace);
    }else{
        return 0;
    }
};

export const numFormat = (name) => {
    let str = new Intl.NumberFormat("en-US", { style: "currency", currency: "IDR" }).format(name).replace("IDR", '').trim();
    return str.toString();
};


export const numReplace = (find) => {
    if(find != null){
        let e = find.toString();
        let reNumber = /^[0-9]*\.?[0-9]*$/;
        if (e != null || e != undefined) {
            e = e.toString();
            e = replaceAll(e,",", "")
            //console.log(e);
            if (e.match(reNumber)) {
                let format = numFormat(e)
                let splitArray=format.split('.');
                if(splitArray.length>1){
                    if(splitArray[1] == "00"){
                        return splitArray[0];
                    }
                }
                return format;
            }
        }
    }else{
        return 0;
    }
};

export const formatRpAfterInput = (val) => {
    val = replaceAll(val, ",", "");
    let ex = false;
    let final;
    if (isNaN(parseInt(val))) {
        ex = true;
        final = '';
    }
    if (!ex) {
        val = parseFloat(val);
        final = numReplace(val);
    }
    return final;
}

