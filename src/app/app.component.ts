import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeArray: Employee[] = [];
  selectedEmployee: Employee = new Employee();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.http.get<Employee[]>('http://localhost:3001/employees').subscribe(data => {
      this.employeeArray = data;
    });
  }

  openForEdit(employee: Employee): void {
    this.selectedEmployee = { ...employee };
  }

  addOrEdit(): void {
    if (this.selectedEmployee.id === 0) {
      this.http.post('http://localhost:3001/employees', this.selectedEmployee).subscribe(() => {
        this.fetchEmployees();
        this.selectedEmployee = new Employee();
      });
    } else {
      this.http.put(`http://localhost:3001/employees/${this.selectedEmployee.id}`, this.selectedEmployee).subscribe(() => {
        this.fetchEmployees();
        this.selectedEmployee = new Employee();
      });
    }
  }

  delete(): void {
    if (confirm('¿Estás seguro de borrar?')) {
      this.http.delete(`http://localhost:3001/employees/${this.selectedEmployee.id}`).subscribe(() => {
        this.fetchEmployees();
        this.selectedEmployee = new Employee();
      });
    }
  }
}
