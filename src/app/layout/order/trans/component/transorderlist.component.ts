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

import {TransitOrderService} from "../../../../shared/services/finance/transitOrder.service";


@Component({
    selector: 'app-order-trans-list',
    templateUrl: './transorderlist.component.html',
    animations: [routerTransition()]
})
export class TransOrderListComponent implements OnInit {

    public corp:any;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private transitOrderService:TransitOrderService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corp = this.authService.getCorpInfo();

        //this.loadData();
    }



}
