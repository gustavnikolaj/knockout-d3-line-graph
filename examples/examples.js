function ViewModel() {
    this.example1 = ko.observableArray([2,1,2,3]);
}

ViewModel.prototype.example1Add = function () {
    var min = 0,
        max = 9,
        randomNumber = Math.random() * (max - min) + min;

    this.example1.push(randomNumber);
};


var viewModel = new ViewModel();

ko.applyBindings(viewModel);
