Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        //Write app code here
	console.log('il Mio primo Rally App. Molto Bene! Prego e D. Thomas!');
	this._loadData();
    },

// Create Data Store to fetch data fromR Rally
	_loadData: function() {

	let myStore = Ext.create('Rally.data.wsapi.Store', {
    model: 'User Story',
    autoLoad: true,
    listeners: {
        load: function(myStore, myData, success) {
          console.log("Loading data from Store: ", "This is myStore variable: ", myStore, "This is le data: ", myData, "Success = ", success);
          this._loadGrid(myStore);       
          // this.add(myGrid);
          // console.log("What the fuck is this", this);
        },
        scope: this
    },
    fetch: ['FormattedID', 'Name', 'Project', 'ScheduleState', 'Blocked', 'DisplayColor', 'Discussion']
});

},

// Create a Grid and dispaly data from Rally
	_loadGrid: function(myGridStore) {

	let myGrid = Ext.create('Rally.ui.grid.Grid', {
          	store: myGridStore,
          	columnCfgs: [
          	"FormattedID", "Name", 'Project', "ScheduleState", 'Blocked', 'DisplayColor', 'Discussion',
          	]
          });

	this.add(myGrid);
	console.log("What is this?", this);

},

// var myStore = Ext.create('Rally.data.wsapi.Store', {
//     model: 'User Story',
//     autoLoad: true,
//     listeners: {
//         load: function(myStore, myData, success) {
//           console.log("Getting the data from the Store", myStore, myData, success);

//           var myGrid = Ext.create('Rally.ui.grid.Grid', {
//           	store: myStore,
//           	columnCfgs: [
//           	"FormattedID", "Name", 'Project', "ScheduleState", 'Blocked', 'DisplayColor', 'Discussion',
//           	]
//           });
//           this.add(myGrid);
//           console.log("What the fuck is this", this);
//         },
//         scope: this
//     },
//     fetch: ['FormattedID', 'Name', 'Project', 'ScheduleState', 'Blocked', 'DisplayColor', 'Discussion']
// });
        //API Docs: https://help.rallydev.com/apps/2.1/doc/
});

function someFunction() {
	alert("Hello World, what is this:", this);
	}

	someFunction();
