import { Component, OnInit } from '@angular/core';
import { EmpolyeeListService } from '../../services/empolyee-list.service'

@Component({
  moduleId: module.id,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [EmpolyeeListService]
})
export class AboutComponent implements OnInit {
  public employeeList: any;
  public employeeid: any;
  public employeename: any;
  public job_title: any;
  public department: any;
  public annual_salary: any;
  // public $: any
  public page = 1;
  public employeeCount: number;
  public pageSize = 1;
  public start = 0;

  constructor(private _employeeService: EmpolyeeListService) { }
  paginateEmployee() {
    this.start = ((this.page - 1) * this.pageSize);
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this._employeeService.getEmployeeList(this.start, this.pageSize)
      .subscribe((res: any) => {
        console.log("Response", res)
        this.employeeList = res.data;
        this.employeeCount = res.totalCount;
      });
  }

  resetForm() {
    $('#employeeForm').trigger("reset");
  }

  ngOnInit() {
    this.loadEmployeeList();
  }

  editUser(e: any, element: any) {
    this.employeeid = element._id;
    this.employeename = element.name;
    this.job_title = element.job_title;
    this.department = element.department;
    this.annual_salary = element.annual_salary;
  }

  deleteUser(e: any, element: any) {
    this._employeeService.deleteEmployee(element._id)
      .subscribe(
      res => {
        console.log("Employee details deleted!");
        this.loadEmployeeList();
      },
      err => {
        console.log("Error deleting employee!");
      });
  }

  onSubmit(f: any) {
    console.log(f);
    this._employeeService.postEmployee(f)
      .subscribe(
      res => {
        console.log("Employee details Saved!");
        $('#myModal').modal('hide');
        this.loadEmployeeList();
      },
      err => {
        console.log("Error saving employee!");
      });
  }


}