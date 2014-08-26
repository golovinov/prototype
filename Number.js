/**
 * Преобразует число в секундах в строку врмени
 * 90060 -> "[j дн. ] H:i:s" -> 1 дн. 01:01:05
 * @param {String} format   -   формат строки
 * @returns {String}
 */
Number.prototype.secondsToTime = function(format) {
    
    var order = [
        [{l:"d",m:86400,p:true},{l:"j",m:86400,p:false}],
        [{l:"H",m:3600,p:true},{l:"G",m:3600,p:false}],
        [{l:"i",m:60,p:true}],
        [{l:"s",m:1,p:true}]
    ],
       seconds = this;
       
    var replacer = function(string, partial) {
        
        var counter = 0;
        
        order.each(function(variants){
            variants.some(function(rule){

                var letter = rule.l,
                    multiplier = rule.m||1,
                    pad = rule.p||false;

                if (string.indexOf(letter) > -1) {
                    var currentResult = Math.floor(seconds/multiplier);
                    counter+=currentResult;
                    seconds-=(currentResult*multiplier);
                    if (pad) {
                       currentResult = String(currentResult).pad(2);
                    }
                    string  = string.replace(letter, currentResult);
                    return true;
                }
                return false;
            });
        });
        return partial&&counter==0? "" : string;
    };
       
    format = format.replace(/\[([^\]]+)\]/g,function(full, rpl){
        return replacer(rpl, true);
    });
    
    format = replacer(format,false);
    return format;
};
