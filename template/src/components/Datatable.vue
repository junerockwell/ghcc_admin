
<template>
<div :class="containerClass" style="margin-top: 10px">
<div class="row">
<div class="col-sm-6" >
  <select v-model="rowsPerPage" @change="onChangePageCount()">
    <option>10</option>
    <option>25</option>
    <option>50</option>
    <option>100</option>
  </select>
  records per page
</div>
<div class="col-sm-6" style="text-align: right">
  <form id="search" class="form-inline">
    Search: <input type="text" name="query" class="form-control" v-model="searchQuery">
  </form>
</div>
</div>

<table class="table table-striped table-bordered" style="margin-top: 10px">
<thead><tr>
  <th v-for="col in columns"
      @click="sortBy(col.data_key)"
      :class="{'sorting' : isNotActiveSort(col.data_key),
              'sorting_asc': isSortAsc(col.data_key),
              'sorting_desc': isSortDsc(col.data_key)}"
      v-if="col.visible && col.visible == true">
    {{col.display_text}}
  </th>
  <th v-if="hasActions">
    Actions
  </th>
</tr></thead>
<tbody>
<tr v-for="(data, idx) in filteredData" @click="eachRowAction ? eachRowAction.callback(data) : null">

  <td v-for="col in columns" v-if="col.visible && col.visible == true">
    {{ chooseFilters(col, data[col.data_key]) }}
  </td>
  <td v-if="hasActions">
    <button v-if="btn.renderIf ? btn.renderIf(data) : true"
      v-for="btn in buttons"
      type="button"
      style="margin-right: 5px"
      :class="btn.btnClassObj"
      @click="btn.callback(data, $event)">
      {{ btn.name}}
    </button>
  </td>
</tr>
</tbody>
</table>

<div class="pull-left">
  Showing {{ startResult }} to {{ endResult }} of {{ data.length }} entries
</div>
<div class="pagination pull-right">
  <li @click="changePageTo('prev')"
      :class="{'disabled': eachPageIndex == 0}">
    <a href="javascript:;">&larr; Previous</a>
  </li>

  <!-- Put page 1 -->
  <li @click="changePageTo(1)"
     :class="{ 'active' : eachPageIndex == 0}"
     v-if="showFirstPage">
    <a href="javascript:;">1</a>
  </li>
  <li v-if="showFirstPage"><a href="javascript:;">...</a></li>

  <li v-for="p in centerPartPage"
      @click="changePageTo(p)"
      :class="{ 'active' : eachPageIndex == p - 1}">
    <a href="javascript:;">{{p}}</a>
  </li>

  <li v-if="showLastPage"><a href="javascript:;">...</a></li>

  <!-- Put last page -->
  <li @click="changePageTo(total_n_pages)"
      :class="{ 'active' : eachPageIndex == total_n_pages - 1}"
      v-if="showLastPage">
    <a href="javascript:;">{{ total_n_pages }}</a>
  </li>
  <li @click="changePageTo('next')"
      :class="{ 'disabled': ( eachPageIndex == total_n_pages - 1 ) || total_n_pages == 0}">
    <a href="javascript:;">Next &rarr;</a>
  </li>
</div>

</div>
</template>

<script>
import {
  activityLevelEq,
  dateFormat,
  replaceNullWithString,
  floorNumber
} from '../libs/filters';
import Moment from 'moment';
export default {
  props: {
    data: Array,
    columns: Array,
    hasActions: Boolean,
    buttons: Array,
    initSortKey: String,
    initSortOrder: {
      type: Number,
      required: false,
      default: 1,
      validator: (v) => {
        return (typeof v === 'number') && (v % 1 === 0);
      }
    },
    // initSortOrder: Number,
    containerClass: Array,
    eachRowAction: Object
  },

  data() {
    var sortOrders = {};
    this.columns.forEach((obj) => {
      sortOrders[obj.data_key] = 1 * this.initSortOrder; // if this.initSortOrder is -1, order DESC. Otherwise, ASC.
    });
    return {
      sortKey: this.initSortKey || '', // init only
      sortOrders: sortOrders,

      searchQuery: '', //filterKey

      eachPageData: [],
      eachPageIndex: 0,
      pageIndexCache: -1, // only remembers one last/most previous
      total_n_pages: 0,
      rowsPerPage: 10, // default

      showFirstPage: false,
      showLastPage: false
    };
  },
  computed: {
    filteredData() {
      var sortKey = this.sortKey;
      var filterKey = this.searchQuery && this.searchQuery.toLowerCase(); //this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      // console.log("order: " + order)
      var data = this.data;

      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }
      var s;
      if (sortKey) {
        data = data.slice().sort((a, b) => {

          if (a.suggested && b.suggested) {
            // console.log("xxxxx");
            // console.log(a.title + " " + a.suggested);
            // console.log(b.title + " " + b.suggested);
            a = Moment(new Date(a[sortKey]));
            b = Moment(new Date(b[sortKey]));
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          }

          a = a[sortKey];
          b = b[sortKey];

          return (a === b ? 0 : a > b ? 1 : -1) * order;
        })
        // console.log(JSON.stringify(data));
      }

      this.total_n_pages = Math.ceil(data.length/this.rowsPerPage);

      this.eachPageData = [];
      var i,j;
      // /* Note to self: i and this.rowsPerPage must be of type number or slicing will not work!*/
      for (i=0,j=data.length; i<j; i = +i + +this.rowsPerPage) {
        // console.log(typeof i);
        this.eachPageData.push(data.slice(+i, +i + +this.rowsPerPage));
      }

      /*
      Reset to first page. Otherwise, the results will not show. This happens
      when the user has previously viewed a page (say page 45, so page index is 44)
      before filtering, and the filtered results has less than previous total pages. This will also mean that no page link in the pagination will have the
      `.active` class.
      */
      if (filterKey && this.eachPageData[this.eachPageIndex] === undefined) {
        this.eachPageIndex = 0;
      }
      data = this.eachPageData[this.eachPageIndex];

      return data;
      // return [];
    },
    centerPartPage() {
      const benchmark = 4;
      var r = [];
      var page = this.eachPageIndex + 1;

      if (benchmark >= this.total_n_pages) {
        this.showFirstPage = false;
        this.showLastPage = false;
        for (var i = 1; i <= this.total_n_pages; i++) {
          r.push(i);
        }
        return r;
      }


      if (page >= benchmark  &&
          page <= this.total_n_pages - benchmark) {

        var l = page - 2;
        if (l >= 3) {
          this.showFirstPage = true;
        } else {
          // need to reset it
          this.showFirstPage = false;
        }
        this.showLastPage = true;

        r.push(l);
        r.push(page - 1);
        r.push(page);
        r.push(page + 1);
        r.push(page + 2);
        return r;
      } else if (page < benchmark) {
        this.showFirstPage = false;
        this.showLastPage = true;
        for (var i = 0; i <= benchmark; i++) {
          r.push(i+1);
        }
        return r;
      }
      else if (page > this.total_n_pages - benchmark) {
        this.showFirstPage = true;
        this.showLastPage = false;
        for (var i = benchmark; i >= 0; i-- ) {
          r.push(this.total_n_pages - i);
        }
        return r;
      }
    },
    startResult() {
      return this.eachPageIndex * this.rowsPerPage + 1;
    },
    endResult() {
      return (this.eachPageIndex + 1) * this.rowsPerPage; // or this.startResult + this.rowsPerPage - 1;
    }
  },
  methods: {
    sortBy(key) {
      // console.log("sortBy() " + key);
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    changePageTo(page) {
      // console.log("changePageTo() " + page);

      switch(page) {
        case 'prev':
          if (this.eachPageIndex <= 0) return;
          this.eachPageIndex--;
        break;
        case 'next':
          if (this.eachPageIndex >= this.eachPageData.length - 1) return;
          this.eachPageIndex++;
        break;
        default:
          // console.log(page);
          if ( (page - 1) == this.eachPageIndex) {
            return;
          }
          this.eachPageIndex = page - 1;
        break;
      }
    },
    onChangePageCount() {
      this.eachPageIndex = 0;
    },
    isNotActiveSort(sortKey) {
      if (sortKey != this.sortKey) {
        return true;
      }

      return false;
    },
    isSortAsc(sortKey) {
      if (sortKey == this.sortKey && this.sortOrders[sortKey] > 0) {
        return true;
      }

      return false;
    },
    isSortDsc(sortKey) {
      if (sortKey == this.sortKey && this.sortOrders[sortKey] <= 0) {
        return true;
      }
      return false;
    },
    edit(data) {
      this.$emit('open', data);
    },
    closeEditModal() {
      // console.log("closeEditModal()");
    },
    chooseFilters(col, value) {
      if (!col.filter || !col.filter.name) {
        return value;
      }

      if (col.filter.name === 'activityLevelEq') {
        return this.activityLevelEq(value);
      }

      if (col.filter.name === 'dateFormat') {
        if (!col.filter.format) {
          // console.error("filter dateFormat() please specify a date format string.");
          return value;
        }
        return this.dateFormat(value, col.filter.format);
      }
      if (col.filter.name === 'replaceNullWithString') {
        if (!col.filter.replacement) {
          return value;
        }
        return this.replaceNullWithString(value, col.filter.replacement);
      }

      if (col.filter.name === 'floorNumber') {
        return this.floorNumber(value);
      }
    },
    activityLevelEq,
    dateFormat,
    replaceNullWithString,
    floorNumber
  }
}
</script>
