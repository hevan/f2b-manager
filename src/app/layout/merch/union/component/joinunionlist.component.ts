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
import { Keys  }    from '../../../../shared/common/keys';
import { PageDataModel  }    from '../../../../shared/common/page.model';
import {GroupUnionService} from "../../../../shared/services/corp/groupUnion.service";


@Component({
    selector: 'app-merch-group-unionjoin-list',
    templateUrl: './joinunionlist.component.html',
    animations: [routerTransition()]
})
export class JoinUnionListComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public corp:any;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router, private groupUnionService: GroupUnionService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corp = this.authService.getCorpInfo();

        this.loadData();
    }



    loadData() {

        const paramsContract = new HttpParams().set('corpId',this.corp.id);

        this.groupUnionService.findAllJoinByCorpId(paramsContract).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
            }
        });
    }

    toView(id){
        this.router.navigate(['/merch/union/joinunionview', { 'id': id}]);
    }


}
