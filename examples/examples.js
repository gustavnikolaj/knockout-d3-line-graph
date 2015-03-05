/* global ko */
function ViewModel() {
    var that = this;

    this.example1 = ko.observableArray([2, 1, 2, 3]);
    this.example1Add = function () {
        var min = 0,
            max = 9,
            randomNumber = Math.random() * (max - min) + min;

        that.example1.push(randomNumber);
    };

    this.example2 = ko.computed(function () {
        return that.example1().slice(-10);
    });
}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);
