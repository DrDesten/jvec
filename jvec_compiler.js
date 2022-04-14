function getDimensionAttributes(varName = "", numberOfDimensions = 0) {
    // varName structure: variable name, $2 (for index), rest of variable name
    const template = `get $1() { return $2 }`
    const dimensionAttribute = /\$1/
    const variableAttribute  = /\$2/

    const variants = ["x","y","z","w"," "]

    let output = ""
    for (let i1 = 0; i1 < 2; i1++) {
        let tmp = ["x", "y"][i1]
        for (let i2 = 0; i2 < 3; i2++) {
            let attrib  = tmp + ["x", "y", " "][i2]
            let indexes = [i1, i2]
            if (indexes[1] >= 2) indexes.pop()

            let varnames = "new vec2(["
            for(index of indexes) varnames += varName.replace("$2", index) + ","
            varnames += "])"
            varnames  = varnames.replace(/,(?=\])/, "")
            
            output += template.replace(dimensionAttribute, attrib).replace(variableAttribute, varnames) + "\n"
        }
    }
    
    return output
}