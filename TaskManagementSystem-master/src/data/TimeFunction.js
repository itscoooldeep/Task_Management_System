export default function TimeFunction(date){
    let taskDate = new Date( date )
    taskDate = isNaN(taskDate) ? new Date(date.split("T")[0]) : taskDate
    let today = new Date()
    let diffSec =  Math.floor( Math.abs( today - taskDate )/1000);
    let diffMin = Math.floor( diffSec /60);  
    let diffHr = Math.floor( diffMin / 60 );
    let diffDays = Math.floor( diffHr / 24 );
    let diffMonths = Math.floor( diffDays / 30);
    let diffYears = Math.floor( diffMonths / 12 );
    let diff = diffYears < 1 ? ( diffMonths < 1 ? ( diffDays < 1 ? ( diffHr < 1 ? ( diffMin <1 ? diffSec : diffMin ) : diffHr ) : diffDays ) : diffMonths ) : diffYears
    let str = diffYears < 1 ? ( diffMonths < 1 ? ( diffDays < 1 ? (diffHr<1 ? (diffMin <1 ? "sec ago" : "mins ago") : "hours ago" ): "days ago" ) : "months ago" ) : "years ago"
    let totalStr = diffSec < 1 ? "Just Now" : `about ${ diff } ${ str }`
    return totalStr
}