import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from "../../../shared/services/user/auth.service";
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';

import {MenuService} from "../../../shared/services/common/menu.service";
import {CorpRoleMenuService} from "../../../shared/services/corp/corpRoleMenu.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

    @Output() collapsedEvent = new EventEmitter<boolean>();

    public corp;

    public listMenu;
    public listRoleMenu=[];

    public corpManager;

    public treeMenu:any = [];



    constructor(private translate: TranslateService, public router: Router,private authService:AuthService,private menuService:MenuService,private corpRoleMenuService:CorpRoleMenuService) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.corp = this.authService.getCorpInfo();
        this.corpManager = this.authService.getManagerInfo();

        this.loadData();

    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('admin_corp_info');
        localStorage.removeItem('admin_manager_info');
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user_info');
    }


    loadData() {
        this.menuService.findAll().subscribe(res=>{
            if(res.code == 0){
                this.listMenu = res.data;

                console.log(this.listMenu);

                this.searchRoleMenu();
            }
        });
    }

    searchRoleMenu() {

        console.log(this.corpManager);
        if(this.corpManager !=null && this.corpManager.corpRole !=null){
            console.log('-----');
            const params = new HttpParams().set('roleId', this.corpManager.corpRole.id);

            this.listRoleMenu = [];
            this.corpRoleMenuService.findAllByRoleId(params).subscribe(res=>{
                if(res.code == 0){
                    let roleMenus = res.data;
                    for(var m=0;m<roleMenus.length;m++){
                        for(var i=0;i<this.listMenu.length;i++){
                            if(roleMenus[m].menuId == this.listMenu[i].id){
                                this.listRoleMenu.push(this.listMenu[i]);


                            }

                        }
                    }

                    this.createMenuTree();

                }
            });
        }else{
            console.log('-----22');
            this.createMenuTree();
        }
    }

    createMenuTree(){
        if(this.listRoleMenu.length >0){

            console.log('-----roleId');
            for(var m=0;m<this.listRoleMenu.length;m++){

                if(this.listRoleMenu[m].parentId == '' || this.listRoleMenu[m].parentId == null){
                    let treeNode = {'data':this.listRoleMenu[m],'subitem':[]};
                    this.treeMenu.push(treeNode);
                }
            }

            for(var m=0;m<this.treeMenu.length;m++){

                let subItems = [];
                for(var n=0;n<this.listRoleMenu.length;n++){
                    if(this.treeMenu[m].data.id == this.listRoleMenu[n].parentId){
                        subItems.push(this.listMenu[n]);
                    }
                }

                this.treeMenu[m].subitem = subItems;
            }

            console.log(this.treeMenu);
        }else {

            console.log('-----allmenu');
            for(var m=0;m<this.listMenu.length;m++){

                if(this.listMenu[m].parentId == null){
                    let treeNode = {'data':this.listMenu[m],'subitem':[]};
                    this.treeMenu.push(treeNode);
                }
            }

            for(var t=0;t<this.treeMenu.length;t++){

                let subItems = [];
                for(var n=0;n<this.listMenu.length;n++){
                    if(this.treeMenu[t].data.id == this.listMenu[n].parentId){
                        subItems.push(this.listMenu[n]);
                    }
                }

                this.treeMenu[t].subitem = subItems;
            }

            console.log(this.treeMenu);
        }
    }

}