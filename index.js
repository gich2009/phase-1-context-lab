/* Your Code Here */
function createEmployeeRecord(array){
    return {
      firstName: array[0], 
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    }
}


function createEmployeeRecords(Arrays){
  let arrayOfObjects = Arrays.map(function(element){return createEmployeeRecord(element)});
  
  return arrayOfObjects;
}


function createTimeInEvent(dateStamp){
  const timeInObject = {
    type: "TimeIn",
    hour: parseInt(dateStamp.substring(11, 15), 10),
    date: dateStamp.substring(0, 10)
  }

  this.timeInEvents.push(timeInObject);

  return this;

}


function createTimeOutEvent(dateStamp){
  const timeOutObject = {
    type: "TimeOut",
    hour: parseInt(dateStamp.substring(11, 15), 10),
    date: dateStamp.substring(0, 10)
  }

  this.timeOutEvents.push(timeOutObject);

  return this;
}


function hoursWorkedOnDate(date){

  let timeInEvent = this.timeInEvents.find((element) => date === element.date);
  let timeOutEvent = this.timeOutEvents.find((element) => date === element.date);

  return timeOutEvent.hour/100 - timeInEvent.hour/100;

}


function wagesEarnedOnDate(date){
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}


function findEmployeeByFirstName(employeeRecordsArray, firstName){
  let matchingRecord = employeeRecordsArray.find(function (element){return (element.firstName === firstName)})

  return (matchingRecord === -1) ? undefined : matchingRecord;

}


function calculatePayroll(employeeRecordsArray){
  return employeeRecordsArray.reduce(function(accumulator, element) {accumulator += allWagesFor.call(element) ; return accumulator}, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

