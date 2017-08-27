import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({ 
    selector: 'my-app', 
    templateUrl: './app/app.component.html',
    providers: [UserService]
}) 
export class AppComponent implements OnInit {
    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
    
    editedUser: User;
    users: Array<User>;
    isNewRecord: boolean;
    statusMessage: string;
    
    constructor(private serv: UserService) {
        this.users = new Array<User>();
    }
    
    ngOnInit() {
        this.loadUsers();
    }
    
    //загрузка пользователей
    private loadUsers() {
        this.serv.getUsers().subscribe((resp: Response) => {
                this.users = resp.json();  
            });
    }
    // добавление пользователя
    addUser() {
        this.editedUser = new User(0,"",0);
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    }
 
    // редактирование пользователя
    editUser(user: User) {
        this.editedUser = new User(user.Id, user.Name, user.Age);
    }
    // загружаем один из двух шаблонов
    loadTemplate(user: User) {
        if (this.editedUser && this.editedUser.Id == user.Id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }
    // сохраняем пользователя
    saveUser() {
        if (this.isNewRecord) {
            // добавляем пользователя
            this.serv.createUser(this.editedUser).subscribe((resp: Response) => {
                this.statusMessage = 'Данные успешно добавлены',
                this.loadUsers();
            });
            this.isNewRecord = false;
            this.editedUser = null;
        } else {
            // изменяем пользователя
            this.serv.updateUser(this.editedUser.Id, this.editedUser).subscribe((resp: Response) => {
                this.statusMessage = 'Данные успешно обновлены',
                this.loadUsers();
            });
            this.editedUser = null;
        }
    }
    // отмена редактирования
    cancel() {
        console.log(this.isNewRecord);
        if (this.isNewRecord) {
            this.users.pop();
            this.isNewRecord = false;
        }
        this.editedUser = null;
    }
    // удаление пользователя
    deleteUser(user: User) {
        this.serv.deleteUser(user.Id).subscribe((resp: Response) => {
            this.statusMessage = 'Данные успешно удалены',
            this.loadUsers();
        });
    }
}