import { Component } from '@angular/core';
import { CommonUtil } from '../util/common';
import { Router } from "@angular/router";
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from '../services/userservice';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { FormBuilder, Validators, FormControl, NgForm, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { timeout } from 'rxjs/operators/timeout';

declare var $: any;

@Component({
    selector: 'user-search',
    templateUrl: 'usersearch.component.html',
    providers: [LocalStorageService]
})
export class UserSearchComponent {
    activekey: any;
    emailvalid: boolean = true;
    mobilevalid: any = true;
    userform: FormGroup;
    result: any;
    user: any;
    addhidden: boolean = false;
    edithidden: boolean = true;
    key: any;
    activedeactivevalue: any;


    constructor(private commonUtil: CommonUtil, private formBuilder: FormBuilder, private toastyService: ToastyService, private toastyConfig: ToastyConfig, private localstorage: LocalStorageService, private router: Router, private userservice: UserService) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.timeout = 2000;
        this.userform = this.formBuilder.group({
            'FirstName': ['', Validators.required],
            'LastName': ['', Validators.required],
            'MiddleName': [''],
            'UserName': ['', Validators.required],
            'Password': ['', Validators.required],
            'Email': ['', [Validators.required, Validators.pattern(this.commonUtil.getEmailPattern())]],
            'Mobile': ['', [Validators.required, Validators.pattern(this.commonUtil.getMobilePattern())]],
            'IsAdmin': ['1'],
            'CreatedOn': [this.commonUtil.getCurrentDateTime()],
            'LastUpdatedOn': [this.commonUtil.getCurrentDateTime()],
            'CreatedBy': [this.localstorage.get('currentUser')],
            'LastUpdatedBy': [this.localstorage.get('currentUser')],
            'Status': ['1']


        });
    }

    get isFirstName() {
        return this.userform.controls['FirstName'].valid;
    }
    get isLastName() {
        return this.userform.controls['LastName'].valid;
    }
    get isMiddleName() {
        return this.userform.controls['MiddleName'].value;
    }
    get isUserName() {
        return this.userform.controls['UserName'].valid;
    }
    get isPassword() {
        return this.userform.controls['Password'].valid;
    }
    get isEmail() {
        return this.userform.controls['Email'].valid;
    }
    get isMobile() {
        return this.userform.controls['Mobile'].valid;
    }

    validMobile() {
        this.mobilevalid = this.userform.controls['Mobile'].valid;
    }

    validEmail() {
        this.emailvalid = this.userform.controls['Email'].valid;
    }

    ngOnInit() {
        this.getAllUsers();
    }

    submit() {
        if (this.key == 0) {

            this.userform.controls['IsAdmin'].setValue('1');
            this.userform.controls['CreatedOn'].setValue(this.commonUtil.getCurrentDateTime());
            this.userform.controls['CreatedBy'].setValue(this.localstorage.get('currentUser'));
            this.userform.controls['LastUpdatedOn'].setValue(this.commonUtil.getCurrentDateTime());
            this.userform.controls['LastUpdatedBy'].setValue(this.localstorage.get('currentUser'));
            this.userform.controls['Status'].setValue('1');

            this.userservice.signUp(this.userform.value).subscribe(
                data => {
                    this.result = data;
                    if (this.result.success) {
                        this.toastyService.success(' Successfully Created !');
                        setTimeout(() => {
                            this.back();
                        }, 2000);
                    } else {
                        this.toastyService.error("Server Error !");
                    }
                },
                err => {
                    console.log(err)
                    this.toastyService.error("Server Error !");
                }
            )
        } else if (this.key > 0) {
            this.userservice.updateUserById(this.key, this.userform.value).subscribe(
                data => {
                    this.result = data;
                    if (this.result.success) {
                        this.toastyService.success(' Successfully Updated !');
                        setTimeout(() => {
                            this.back();
                        }, 2000);
                    } else {
                        this.toastyService.error("Server Error !");
                    }
                },
                err => {
                    console.log(err)
                    this.toastyService.error("Server Error !");
                }
            )

        }

    }

    reset() {
        this.userform.reset();
    }

    add() {
        this.key = 0;
        this.addhidden = !this.addhidden;
        this.edithidden = !this.edithidden;
        $("#userTable_wrapper").hide();
        this.userform.reset();
    }

    switchChange(event, userId) {
        this.activekey = userId;
        if (event)
            this.activedeactivevalue = "active"
        else
            this.activedeactivevalue = "deactive"
        $("#myModal").modal('show');

    }

    activeUser(activevalue) {
        if (activevalue == '1') {
            if (this.activedeactivevalue == 'active') {
                this.userservice.activeUser({ "status": '1', "id": this.activekey }).subscribe(
                    data => {
                        this.toastyService.success(' Successfully updated !');
                    },
                    err => {
                        console.log(err)
                        this.toastyService.error("Server Error !");
                    })
            } else if (this.activedeactivevalue == 'deactive') {
                this.userservice.activeUser({ "status": '0', "id": this.activekey }).subscribe(
                    data => {
                        this.toastyService.success(' Successfully updated !');
                    },
                    err => {
                        console.log(err)
                        this.toastyService.error("Server Error !");
                    })
            } else {

            }
        } else if (activevalue == '0') {
            this.getAllUsers();
        }

    }

    back() {
        this.getAllUsers();
        setTimeout(() => {
            $('#userTable').DataTable();
        }, 500);
        this.addhidden = !this.addhidden;
        this.edithidden = !this.edithidden;
        this.key = -1;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            $('#userTable').DataTable();
        }, 1000);
    }

    getAllUsers() {
        this.userservice.getUserData().subscribe(data => {
            this.result = data;
        });
    }

    edit(userid) {
        this.userservice.getUserById(userid).subscribe(
            data => {
                this.result = data;
                this.key = userid;
                this.userform.controls['FirstName'].setValue(this.result[0].USER_FIRST_NAME);
                this.userform.controls['LastName'].setValue(this.result[0].USER_LAST_NAME);
                this.userform.controls['MiddleName'].setValue(this.result[0].USER_MIDDLE_NAME);
                this.userform.controls['UserName'].setValue(this.result[0].USER_USERNAME);
                this.userform.controls['Password'].setValue(this.result[0].USER_PASSWORD);
                this.userform.controls['Email'].setValue(this.result[0].USER_EMAIL);
                this.userform.controls['Mobile'].setValue(this.result[0].USER_MOBILE);
                this.userform.controls['IsAdmin'].setValue(this.result[0].IS_ADMIN == null ? '0' : this.result[0].IS_ADMIN);
                this.userform.controls['LastUpdatedOn'].setValue(this.commonUtil.getCurrentDateTime());
                this.userform.controls['LastUpdatedBy'].setValue(this.localstorage.get('currentUser'));
                this.userform.controls['Status'].setValue(this.result[0].USER_STATUS);
                this.addhidden = !this.addhidden;
                this.edithidden = !this.edithidden;
                $("#userTable_wrapper").hide();
            },
            err => {
                console.log(err)
                this.toastyService.error("Server Error !");
            })
    }


}
