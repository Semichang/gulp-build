function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.querySelector("span");
    this.opts = this.dd.querySelectorAll('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.addEventListener('click', function (event) {
            obj.dd.classList.toggle('active');
        });

        obj.opts.forEach(element => {
            element.addEventListener('click', function () {
                var opt = element;
                obj.val = opt.text();
                obj.index = opt.index();
                obj.placeholder.text('Gender: ' + obj.val);
            });
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
}