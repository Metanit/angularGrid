"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var user_1 = require("./user");
var user_service_1 = require("./user.service");
require("rxjs/Rx");
var AppComponent = (function () {
    function AppComponent(serv) {
        this.serv = serv;
        this.users = new Array();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadUsers();
    };
    //загрузка пользователей
    AppComponent.prototype.loadUsers = function () {
        var _this = this;
        this.serv.getUsers().subscribe(function (resp) {
            _this.users = resp.json();
        });
    };
    // добавление пользователя
    AppComponent.prototype.addUser = function () {
        this.editedUser = new user_1.User(0, "", 0);
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    };
    // редактирование пользователя
    AppComponent.prototype.editUser = function (user) {
        this.editedUser = new user_1.User(user.Id, user.Name, user.Age);
    };
    // загружаем один из двух шаблонов
    AppComponent.prototype.loadTemplate = function (user) {
        if (this.editedUser && this.editedUser.Id == user.Id) {
            return this.editTemplate;
        }
        else {
            return this.readOnlyTemplate;
        }
    };
    // сохраняем пользователя
    AppComponent.prototype.saveUser = function () {
        var _this = this;
        if (this.isNewRecord) {
            // добавляем пользователя
            this.serv.createUser(this.editedUser).subscribe(function (resp) {
                _this.statusMessage = 'Данные успешно добавлены',
                    _this.loadUsers();
            });
            this.isNewRecord = false;
            this.editedUser = null;
        }
        else {
            // изменяем пользователя
            this.serv.updateUser(this.editedUser.Id, this.editedUser).subscribe(function (resp) {
                _this.statusMessage = 'Данные успешно обновлены',
                    _this.loadUsers();
            });
            this.editedUser = null;
        }
    };
    // отмена редактирования
    AppComponent.prototype.cancel = function () {
        console.log(this.isNewRecord);
        if (this.isNewRecord) {
            this.users.pop();
            this.isNewRecord = false;
        }
        this.editedUser = null;
    };
    // удаление пользователя
    AppComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.serv.deleteUser(user.Id).subscribe(function (resp) {
            _this.statusMessage = 'Данные успешно удалены',
                _this.loadUsers();
        });
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('readOnlyTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], AppComponent.prototype, "readOnlyTemplate", void 0);
__decorate([
    core_1.ViewChild('editTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], AppComponent.prototype, "editTemplate", void 0);
AppComponent = __decorate([
    core_2.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map