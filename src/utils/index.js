export function getTime(time){
    const min = parseInt(time/60) > 10 ? parseInt(time/60) : '0' + parseInt(time/60)
    const sec = time - parseInt(min)*60 > 10 ? (time - parseInt(min)*60) : '0' +  (time - parseInt(min)*60) 
    return min + ':' + sec
}