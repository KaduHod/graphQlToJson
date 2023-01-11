export function toJson(string){
    const splitByLine = (string:string) => string.split('\n');
    const isObject    = (string:string) => string.indexOf(' {') > -1;
    const isProperty  = (string:string) => !isObject(string);
    const initObject  = (string:string) => string.replace(' {', ': {');
    
    const tranformToProperty = (string:string) => {
        let item:string[] = string.split('');
        item.push(': true');
        return item.join('');
    }
    
    const jsonfy = (item:string, index?:number) => {
      if(item === '{' || item.trim() === '}') return item;
      if(isObject(item)) return initObject(item)
      if(isProperty(item)) return tranformToProperty(item)
      return item
    }
    
    const setComas = (array:string[]) => {
      const couldHaveComa = (string:string) => string.includes('true\n') || string.includes('}\n');
      const shouldPutComa = (next?:string) => next && next.trim() !== '}';
      const result:any = [];
      for(let iterator = 0; iterator < array.length; iterator++)
      {
        let item = array[iterator]
        if(couldHaveComa(item) && shouldPutComa(array[iterator + 1])) {
          item = item.replace('\n',',\n');
        }
        result.push(item)
      }
      return result
    }
    
    const setQuotationMarks = (array:string[]) => {
      return array.map( item => {
        let splited = item.trim().split(':');
        if(splited.length > 1){
          splited[0] = '"' + splited[0].trim() + '":';
          return splited.join('');
        }
        return item
      })
    }  

    const main = ():string => {
        const result = splitByLine(string)
                      .map(jsonfy)
                      .map(item => item + '\n');
        const resultWithComas = setComas(result);
        const resultWithQuotationMark = setQuotationMarks(resultWithComas)
        const parsedToJson = JSON.parse(resultWithQuotationMark.join(""))
        return parsedToJson;
    }

    return main();
}