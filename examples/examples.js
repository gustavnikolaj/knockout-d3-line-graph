/* global ko */
function ViewModel() {
    var that = this;

    this.example1 = ko.observableArray([2, 1, 2, 3]);
    this.example1Add = function () {
        var min = 0,
            max = 9,
            randomNumber = Math.random() * (max - min) + min;

        that.example1.push(randomNumber);
        that.complexData.push({ position: new Date(2015, 1, that.complexData().length + 1), value: randomNumber });
    };

    this.example2 = ko.computed(function () {
        return that.example1().slice(-10);
    });

    this.complexData = ko.observableArray([
        { position: new Date(2015, 1, 1), value: 10 },
        { position: new Date(2015, 1, 2), value: 8 },
        { position: new Date(2015, 1, 3), value: 12 },
        { position: new Date(2015, 1, 4), value: 13 },
        { position: new Date(2015, 1, 5), value: 11 },
        { position: new Date(2015, 1, 6), value: 7 },
        { position: new Date(2015, 1, 7), value: 5 }
    ]);
}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);
