import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  private readonly URL = ''; // environment.url;
  getProductsList(): Observable<any> {
    return of('hi'); //this.http.get("https://jsonplaceholder.typicode.com/comments");//this.URL + '/book/');
  }

  addToCart(productId: any) {
    let userId = sessionStorage.getItem('userId');
    return this.http.post<any>(
      `${this.URL}/shoppingcart/addToCart/${userId}/${productId}`,
      {}
    );
  }

  registerUser(body: any) {
    return this.http.post<any>(`${this.URL}/user/`, body);
  }

  getEmployee(): Observable<employee> {
    const employee: employee = {
      id: 1,
      name: 'Varuna',
      department: 'software',
      salary: 0,
    };
    return of(employee);
  }
  getSalary(): Observable<salary> {
    const employee: salary = { employeeId: 1, month: 11, salary: 10000 };
    return of(employee);
  }
  getEmployeeWithSalary(): Observable<employee> {
    return this.getEmployee().pipe(
      switchMap((employee: employee) =>
        this.getSalary().pipe(
          map((salary: salary) => {
            employee.salary = salary.salary;
            return employee;
          })
        )
      )
    )
  }
}
export interface employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}
export interface salary {
  employeeId: number;
  month: number;
  salary: number;
}
