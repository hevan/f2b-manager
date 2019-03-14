/**
 * Created by hevan on 2018/10/20.
 */
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
import { Keys   }    from '../../../../shared/common/keys';
import {PlantBaseService} from "../../../../shared/services/origin/plantBase.service";
import {OriginMediaItemService} from "../../../../shared/services/origin/originMediaItem.service";
import {OriginContentItemService} from "../../../../shared/services/origin/originContentItem.service";
import {CommodityCodeService} from "../../../../shared/services/origin/commodityCode.service";
import {OriginCodeService} from "../../../../shared/services/origin/originCode.service";
import {OriginTransItemService} from "../../../../shared/services/origin/originTransItem.service";


@Component({
    selector: 'app-origin-origincodegen',
    templateUrl: './origincodegen.component.html',
    animations: [routerTransition()]
})
export class OriginCodeGenComponent implements OnInit {


    public curBatchCodeId;//当前数据ID
    public nCount = 100;



    public bSubmitted = false;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private originCodeService: OriginCodeService,private originTransItemService: OriginTransItemService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curBatchCodeId = this.route.snapshot.paramMap.get('batchCodeId');

    }



    genCode(){
        this.bSubmitted = true;
        let paramsSku = new HttpParams().set('batchCodeId',this.curBatchCodeId).set('nCount',this.nCount + '');

        this.originCodeService.genCode(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.router.navigate(['/origin/batch/origincodelist',{batchCodeId:this.curBatchCodeId}]);
            }
        });
    }


    goBack(){
        this.location.back();
    }
}
