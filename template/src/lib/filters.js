/*
Description: Base filters that have been used across the GHCC Vue Admin projects.

The activityLevelEq is actually necessary for the Datatable.vue component.
*/

//
// filters.js
//
import Moment from 'moment';
// import Vue from 'vue';

function filterBy(list, value) {
  return list.filter(function(item) {
    return item.indexOf(value) > -1;
  });
}

function findBy(list, value) {
  return list.filter(function(item) {
    return item == value
  });
}

function reverse(value) {
  return value.split('').reverse().join('');
}

function activityLevelEq(level_number) {
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

function dateFormat(date, format) {
  // var newDate = new Date(date);
  // if (Vue.moment(newDate).isValid() === false) {
  //   return date;
  // }
  // return Vue.moment(newDate).format(format);
  // return "";
  if (date === null ||
      date === undefined) {
    return "N/A";
  }

  var newDate = new Date(date);
  if (Moment(newDate).isValid() === false) {
    return date;
  }

  return Moment(newDate).format(format);
}

function replaceNullWithString(theVar, _string) {
  if (theVar === null ||
      theVar === undefined ||
      (typeof theVar === 'string' &&
       theVar.length <= 0)) {
    return _string;
  }
  return theVar;
}

function floorNumber(theVar) {
  if (theVar === null ||
      theVar === undefined ||
      (!typeof theVar === 'number')) {
    return theVar;
  }

  return Math.floor(theVar);
}

function ceilNumber(theVar) {
  if (theVar === null ||
      theVar === undefined ||
      (!typeof theVar === 'number')) {
    return theVar;
  }

  return Math.ceil(theVar);
}


export {
  filterBy,
  reverse,
  findBy,
  activityLevelEq,
  dateFormat,
  replaceNullWithString,
  floorNumber,
  ceilNumber
}
