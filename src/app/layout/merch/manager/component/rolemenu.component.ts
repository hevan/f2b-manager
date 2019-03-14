/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import {CorpService} from '../../../../shared/services/corp/corp.service';
import { Keys  }    from '../../../../shared/common/keys';
import { PageDataModel  }    from '../../../../shared/common/page.model';
import {CorpDepartService} from "../../../../shared/services/corp/corpDepart.service";
import {CorpRoleService} from "../../../../shared/services/corp/corpRole.service";
import {CorpRoleMenuService} from "../../../../shared/services/corp/corpRoleMenu.service";
import {MenuService} from "../../../../shared/services/common/menu.service";
import {CorpMenuItemService} from "../../../../shared/services/corp/corpMenuItem.service";

@Component({
    selector: 'app-merch-corp-rolemenu',
    templateUrl: './rolemenu.component.html',
    animations: [routerTransition()]
})
export class CorpRoleMenuComponent implements OnInit {

    public listData = []; //定义form

    public display = false;

    public  roleId='';
    public  roleName='';

    public listMenu = [];
    public listMenuSelect = [];

    public corp;


    public listCorpMenuItem;

    public listCorpRoleMenu;


    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private corpRoleMenuService: CorpRoleMenuService,private menuService:MenuService,private corpMenuItemService:CorpMenuItemService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {

        this.roleId = this.route.snapshot.paramMap.get('roleId');
        this.roleName = this.route.snapshot.paramMap.get('roleName');

        this.corp = this.authService.getCorpInfo();

        this.loadData();
    }

    loadData() {
        this.menuService.findAll().subscribe(res=>{
            if(res.code == 0){
                this.listMenu = res.data;

                this.loadMenuItem();
            }
        });
    }

    loadMenuItem(){
        let params2 = new HttpParams().set('corpId', this.corp.id);

        this.listCorpMenuItem = [];
        this.corpMenuItemService.findAllByCorpId(params2).subscribe(res=>{
            if(res.code == 0){
                let corpMenus = res.data;

                for(var m=0;m<this.listMenu.length;m++){
                    let curMenu = this.listMenu[m];
                    for(var n=0;n<corpMenus.length;n++){
                        if(curMenu.id == corpMenus[n].menuId){
                            this.listCorpMenuItem.push(curMenu);
                        }
                    }
                }

                this.search();
            }
        });
    }


    search() {


        const params = new HttpParams().set('roleId', this.roleId);

        this.listCorpRoleMenu = [];
        this.corpRoleMenuService.findAllByRoleId(params).subscribe(res=>{
            if(res.code == 0){
                let roleMenus = res.data;
                for(var m=0;m<roleMenus.length;m++){
                    for(var i=0;i<this.listMenu.length;i++){
                        if(roleMenus[m].menuId == this.listMenu[i].id){
                            this.listCorpRoleMenu.push(this.listMenu[i]);
                        }

                    }
                }

            }
        });
    }

    submit(){

        let listRoleMenu = [];
        if(this.listMenuSelect.length >0){

            for(var m=0;m<this.listMenuSelect.length;m++){
                let roleMenu = {menuId: this.listMenuSelect[m].id, roleId:this.roleId};

                listRoleMenu.push(roleMenu);
            }
        }

        this.corpRoleMenuService.batch(JSON.stringify(listRoleMenu)).subscribe(res=>{
            if(res.code == 0){
                this.search();
            }

            this.display = false;
        });
    }

    toEdit(){
        this.display = true;
    }

    goBack(){
        this.location.back();
    }
}
