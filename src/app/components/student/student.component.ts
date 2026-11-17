import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudent } from 'src/app/model/studentInterface';
import { UuidService } from 'src/app/uuid.service';
import { SnackBarService } from 'src/app/snack-bar.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  stdsArr: Array<Istudent> = [
    {
      stdId: "101",
      fname: "Advika",
      lname: "More",
      email: "am@gmail.com",
      contact: 6543232,
      isActive: true
    },
    {
      stdId: "102",
      fname: "Anvika",
      lname: "Patil",
      email: "ap@gmail.com",
      contact: 89765432,
      isActive: false
    },
    {
      stdId: "103",
      fname: "Swati",
      lname: "Kale",
      email: "sk@gmail.com",
      contact: 54367543567,
      isActive: true
    },
    {
      stdId: "104",
      fname: "Priyanka",
      lname: "Biradar",
      email: "pb@gmail.com",
      contact: 78654325676,
      isActive: false
    }
  ];
  constructor(private _uuidService: UuidService,
    private _snackBar: SnackBarService
  ) { }

  isOnEditMode: boolean = false;
  editId!: string;
  trackByStdId(index: number, std: Istudent) {
    return std.stdId
  }

  @ViewChild('fnameRef') fnameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('lnameRef') lnameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('emailRef') emailRef!: ElementRef<HTMLInputElement>;
  @ViewChild('contactRef') contactRef!: ElementRef<HTMLInputElement>;
  @ViewChild('activeRef') activeRef!: ElementRef<HTMLInputElement>;
  ngOnInit(): void {
  }

  //create
  onAddStd() {
    let newstudent: Istudent = {
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: +this.contactRef.nativeElement.value,
      isActive: this.activeRef.nativeElement.value == 'yes',
      stdId: this._uuidService.getUuid(),
    }
    this._snackBar.openSnackBar(`The student with id ${newstudent.stdId} is added successfully`);

    this.stdsArr.unshift(newstudent);
    this.fnameRef.nativeElement.value = '';
    this.lnameRef.nativeElement.value = '';
    this.emailRef.nativeElement.value = '';
    this.contactRef.nativeElement.value = '';
    this.activeRef.nativeElement.value = '';
  }


  //Edit
  onEditStd(std: Istudent) {
    this.fnameRef.nativeElement.value = std.fname;
    this.lnameRef.nativeElement.value = std.lname;
    this.emailRef.nativeElement.value = std.email;
    this.contactRef.nativeElement.value = std.contact.toString();
    this.activeRef.nativeElement.value = std.isActive ? "yes" : "no";
    this.editId = std.stdId;
    this.isOnEditMode = true;
  }

  //update
  onUpdateStd() {
    let updatedObj: Istudent = {
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: +this.contactRef.nativeElement.value,
      isActive: this.activeRef.nativeElement.value === 'yes' ? true : false,
      stdId: this.editId
    }
    let getIndex = this.stdsArr.findIndex(s => s.stdId === updatedObj.stdId);
    this.stdsArr[getIndex] = updatedObj;
    this._snackBar.openSnackBar(`The student with id ${updatedObj.stdId} is updated successfully`);
    this.fnameRef.nativeElement.value = '';
    this.lnameRef.nativeElement.value = '';
    this.emailRef.nativeElement.value = '';
    this.contactRef.nativeElement.value = '';
    this.activeRef.nativeElement.value = '';
    this.isOnEditMode = false
  }

  //remove
  onRemovestd(stdId: string) {
    let getConfirm = confirm(`Are you sure,you want to remove the student with id ${stdId}`);
    if (getConfirm) {
      let getIndex = this.stdsArr.findIndex(std => std.stdId === stdId);
      this.stdsArr.splice(getIndex, 1);
      this._snackBar.openSnackBar(`The student with id ${stdId} is removed successfully`);
    }
  }
}
