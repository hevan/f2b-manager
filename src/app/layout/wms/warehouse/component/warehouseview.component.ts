/**
 * Created by hevan on 2018/6/4.
 */
/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import {CorpService} from '../../../../shared/services/corp/corp.service';
import { Keys   }    from '../../../../shared/common/keys';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WarehouseService} from "../../../../shared/services/wms/warehouse.service";

@Component({
    selector: 'app-wms-warehouseview',
    templateUrl: './warehouseview.component.html',
    animations: [routerTransition()]
})
export class WarehouseViewComponent implements OnInit {

    public warehouseData:any;

    public curId;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private warehouseService: WarehouseService,private authService:AuthService,private modalService: NgbModal) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.warehouseService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                 this.warehouseData = res.data;
                }
            });
        }
    }


    //编辑
    toEdit(){
        this.router.navigate(['/merch/warehouse/warehouseedit', { 'id': this.curId}]);
    }

    goBack(){
        this.location.back();
    }
}
