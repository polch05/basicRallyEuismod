Ext.define('CustomApp', {
    extend: 'Rally.app.App', // The parent class manages the app 'lifecycle' and calls launch() when ready 
    componentCls: 'app',  // CSS styles found in app.css

    myDefectStore: undefined,
    myGrid: undefined,

    // Entry point to the Custom App
    launch: function () {
        //Write app code here
        //console.log('il Mio primo Rally App. Molto Bene! Prego e D. Thomas!');
        console.log('2nd Rally App w/ Defects');
        //this._loadData();
        console.log('Create a container hbox for the filters/pull-down boxes');
        this.filterContainer = Ext.create('Ext.container.Container', {
            id: 'oggi-container-id',
            layout: {
                type: 'vbox',
                align: 'center'
            },
        });
        this.add(this.filterContainer);

        this._loadIterations();
    },

    _loadIterations: function () {
        this.iterComboBox = Ext.create('Rally.ui.combobox.IterationComboBox', {
            fieldLabel: 'Iteration',
            labelAlign: 'right',
            listeners: {
                ready: function (combobox) {
                    //let selectedIterRef = combobox.getRecord().get('_ref');
                    //console.log('This is ready:', combobox);
                    //console.log('What getRecord:', combobox.getRecord().get('_ref'));
                    //this._loadData();
                    this._loadSeverities();
                },
                select: function (combobox, records) {
                    this._loadData();
                },
                scope: this
            }
        });
        this.filterContainer.add(this.iterComboBox);
    },
    //add a Method to load a filter on Severity
    _loadSeverities: function () {
        this.severityComboBox = Ext.create('Rally.ui.combobox.FieldValueComboBox', {
            model: 'Defect',
            field: 'Severity',
            fieldLabel: 'Severity',
            labelAlign: 'right',
            listeners: {
                ready: function (combobox) {
                    //let selectedIterRef = combobox.getRecord().get('_ref');
                    //console.log('This is ready:', combobox);
                    //console.log('What getRecord:', combobox.getRecord().get('_ref'));
                    this._loadData();
                    //this._loadSeverities();
                },
                select: function (combobox, records) {
                    this._loadData();
                },
                scope: this
            }
        });
        this.filterContainer.add(this.severityComboBox);
    },

    // Create Data Store to fetch data from Rally
    _loadData: function () {

        let selectedIterRef = this.iterComboBox.getRecord().get('_ref');
        let selectedSeverityValue = this.severityComboBox.getRecord().get('value');

        console.log('Selected Iteration:', selectedIterRef);
        console.log('Selected Severity:', selectedSeverityValue);

        let myIterSevFilters = [
            {
                property: 'Iteration',
                operation: '=',
                value: selectedIterRef
            },
            {
                property: 'Severity',
                operation: '=',
                value: selectedSeverityValue
            }
        ];
        // if store exists, just load new data
        if (this.myDefectStore) {
            this.myDefectStore.setFilter(myIterSevFilters);
            this.myDefectStore.load();
        } else {
            // create store
            this.myDefectStore = Ext.create('Rally.data.wsapi.Store', {
                model: 'Defect',
                autoLoad: true,
                filters: myIterSevFilters,
                listeners: {
                    load: function (myDefectStore, myData, success) {
                        console.log("Loading data from the wsapi.Store. This is myStore variable: ", myDefectStore, "This is le data: ", myData, "Success = ", success);
                        if (!this.myGrid) {
                            this._createGrid(myDefectStore);
                            // this.add(myGrid);
                            // console.log("What the fuck is this", this);
                        }
                    },
                    scope: this
                },
                fetch: ['FormattedID', 'Name', 'Iteration', 'Severity', 'Project', 'ScheduleState', 'Blocked', 'DisplayColor', 'Discussion']
            });
        }
    },

    // Create a Grid and dispaly data from Rally
    _createGrid: function (myGridStore) {

        this.myGrid = Ext.create('Rally.ui.grid.Grid', {
            store: myGridStore,
            columnCfgs: [
                'FormattedID', 'Name', 'Iteration', 'Severity', 'Project', 'ScheduleState', 'Blocked', 'DisplayColor', 'Discussion',
            ]
        });

        this.add(this.myGrid);
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
