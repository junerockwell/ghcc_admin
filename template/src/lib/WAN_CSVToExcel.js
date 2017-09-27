/*
Convert data to CSV.
Configure that CSV so that it can be read by Excel.

Note: If you need this file for a project other than WAN, you might want to rename
the file name from "WAN". Below already has the basic that work on generating CSV
data that GHCC can view in MS Excel. You just need to customize it if you need to.

*/
// import Vue from 'vue';
import Moment from 'moment';


/* Private
DO NOT EXPORT!
====================================================== */
function humanize(str) {
  if (typeof str !== 'string') return str;
  var frags = str.split('_');
  for (var i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join('%20');
}

function preserveWhiteSpace(str) {
  if (typeof str !== 'string') return str;

  // str = str.replace(' ', '%20');
  str = str.replace(new RegExp(" ", "g"), '%20');
  return str;
}

function wordEqActivityLevel(level_number) {
  if (level_number === 3) {
    return "Less Active";
  }
  else if (level_number == 2) {
    return "Moderately Active";
  }
  else if (level_number == 1) {
    return "Active";
  }
}

function noWhiteSpace(str) {
  if (typeof str !== 'string') return str;

  var frags = str.split(" ");
  for(var i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join("");
}

/* Public: Export(s)

Details:
(April 25, 2017) She wants to export registered date
as well. The registered date is the `wan_date_joined`
====================================================== */
function exportAllUserEmailsToExcel(users) {
  // console.log("exportAllUserEmailsToExcel()");

  if (!users || !users.length || users.length <= 0) {
    return;
  }
  var csvData = [];
  var labels = preserveWhiteSpace("WAN Member Email") + ", ";
  labels += preserveWhiteSpace("Registered Date");
  csvData.push(labels);

  for (var i = 0; i < users.length; i++) {
    var user_data = "";
    user_data += users[i].email + ', ';
    user_data += users[i].wan_date_joined;

    csvData.push(user_data);
  }

  var nowDate = Moment().format("MM-DD-YYYY");
  var csvString = csvData.join("%0A");
  var a         = document.createElement('a');
  a.href        = 'data:attachment/csv,' + csvString;
  a.target      = '_blank';
  a.download    = 'WANMemberEmails'+nowDate+'.csv';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
  }, 2000);
}

function exportUserMileageToExcel(data) {
  // console.log("exportUserMileageToExcel()");
  if (!data) {
    console.log("missing data parameter");
    return;
  }
  if (data.hasOwnProperty('member_name') == false) {
    console.log("missing member_name")
    return;
  }
  if (data.hasOwnProperty('miles') == false ||
      !data.miles.length) {
    console.log("missing miles property and/or not as an array")
  return;
  }
  if (data.hasOwnProperty('route') == false) {
    console.log("missing route property");
    return;
  }
  if (data.route.hasOwnProperty('route_name') == false) {
    console.log("missing route_name");
    return;
  }
  if (data.route.hasOwnProperty('route_total_miles') == false) {
    console.log("missing route_total_miles");
    return;
  }
  if (data.route.hasOwnProperty('user_total_miles') == false) {
    console.log("missing user_total_miles");
    return;
  }
  if (data.route.hasOwnProperty('status') == false) {
    console.log("missing route status");
    return;
  }
  if (data.route.hasOwnProperty('date_started') == false) {
    console.log("missing date_started");
    return;
  }
  if (data.route.hasOwnProperty('over_walked') == false) {
    console.log("missing over_walked");
    return;
  }

  var csvData = [];
  var group1Labels = "";
  group1Labels += preserveWhiteSpace("Route Name") + ", ";
  group1Labels += preserveWhiteSpace("Route Total Miles") + ", ";
  group1Labels += preserveWhiteSpace("Total Entered") + ", ";
  group1Labels += "Status, ";
  group1Labels += preserveWhiteSpace("Date Started") + ", ";
  // group1Labels += preserveWhiteSpace("Overwalked Miles") + ", ";
  csvData.push(group1Labels);
  var group1Values = "";
  group1Values += preserveWhiteSpace(data.route.route_name) + ", ";
  group1Values += data.route.route_total_miles + ", ";
  group1Values += data.route.user_total_miles + ", ";
  group1Values += data.route.status + ", ";
  group1Values += Moment(data.route.date_started).format("MM/DD/YYYY") + ", ";
  // group1Values += data.route.over_walked + ", ";
  csvData.push(group1Values);
  csvData.push(""); // empty row
  var group2Labels = "";
  group2Labels += preserveWhiteSpace("Date Entered") + ", ";
  group2Labels += "Miles, ";
  csvData.push(group2Labels);

  for (var i = 0; i < data.miles.length; i++) {

    var user_miles = "";
    user_miles += Moment(data.miles[i].miles_date).format("MM/DD/YYYY") + ",";
    user_miles += data.miles[i].miles + ", ";
    csvData.push(user_miles);
  }

  var nowDate = Moment().format("MM-DD-YYYY");
  var csvString = csvData.join("%0A");
  var a         = document.createElement('a');
  a.href        = 'data:attachment/csv,' + csvString;
  a.target      = '_blank';
  a.download    = 'WAN'+noWhiteSpace(data.member_name)+'MileageData'+nowDate+'.csv';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
  }, 2000);
}

export {
  exportAllUserEmailsToExcel,
  exportUserMileageToExcel
}
