import { ProductsListComponent } from './products-list/products-list.component';
import { DemoComponent } from './sales/demo/demo.component';
import { SalesComponent } from './sales/sales.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { BatchComponent } from './batch/batch.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/core/services/auth-guard.service';
import { AdminComponent } from './admin.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { NewAttendanceComponent } from './attendance/new-attendance/new-attendance.component';
import { ViewAttendanceComponent } from './attendance/view-attendance/view-attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ProductsComponent } from './products/products.component';
import { NewProductsComponent } from './products/new-products/new-product.component';
import { MedicineCategoryComponent } from './medicine-category/medicine-category.component';
import { NewMedicineCategoryComponent } from './medicine-category/new-medicine-category/new-medicine-category.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { NewPosBillComponent } from './pos-bill/new-pos-bill/new-pos-bill.component';
import { PosBillComponent } from './pos-bill/pos-bill.component';
import { ReportComponent } from './report/report.component';
import { NewSupplierComponent } from './suppliers/new-supplier/new-supplier.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { HSNComponent } from './hsn/hsn.component';
import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { PurchaseBatchComponent } from './purchase-batch/purchase-batch.component';
import { ProfileComponent } from './profile/profile.component';
import { AddHSNComponent } from './hsn/add-hsn/add-hsn.component';
import { TempComponent } from './temp/temp.component';
import { AddPurchaseBatchComponent } from './purchase-batch/add-purchase-batch/add-purchase-batch.component';
import { SalesDemoComponent } from './sales-demo/sales-demo.component';
import { SalesDemoTableComponent } from './sales-demo-table/sales-demo-table.component';
import { PaymentsComponent } from './payments/payments.component';
import { NewPaymentsComponent } from './payments/new-payments/new-payments.component';
import { PurchaseReportsComponent } from './reports/purchase-reports/purchase-reports.component';
import { SalesReportsComponent } from './reports/sales-reports/sales-reports.component';
import { ExpensesReportsComponent } from './reports/expenses-reports/expenses-reports.component';
import { SaleItemsReportsComponent } from './reports/sale-items-reports/sale-items-reports.component';
import { PurchaseItemsReportsComponent } from './reports/purchase-items-reports/purchase-items-reports.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { NewPurchaseComponent } from './new-purchase/new-purchase.component';
import { SalesItemsComponent } from './sales-items/sales-items.component';
import { NewSalesComponent } from './new-sales/new-sales.component';
import { MonthlySalesComponent } from './monthly-sales/monthly-sales.component';
import { InnerAggridComponent } from './inner-aggrid/inner-aggrid.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },

      { path: 'pos-bill', component: PosBillComponent },
      { path: 'pos-bill/new-pos-bill', component: NewPosBillComponent },

      { path: 'sales', component: SalesComponent },
      { path: 'NewSales', component: NewSalesComponent },
      { path: 'MonthlySales', component: MonthlySalesComponent },
      { path: 'aggrid', component: InnerAggridComponent },


      { path: 'demo', component: DemoComponent },
      { path: 'sales-items', component: SalesItemsComponent},

      { path: 'company', component: CompanyComponent },
      { path: 'company/new', component: AddCompanyComponent },
      { path: 'company/:id/edit', component: AddCompanyComponent },


      { path: 'PurchaseBatch', component: PurchaseBatchComponent },
      { path: 'PurchaseBatch/new-purchase', component: NewPurchaseComponent },
      { path: 'PurchaseBatch/new', component: AddPurchaseBatchComponent },
      { path: 'PurchaseBatch/:id/edit', component: NewPurchaseComponent },

      { path: 'batch', component: BatchComponent },

      { path: 'pos-bill/demo', component: SalesDemoTableComponent },
      { path: 'SalesDemo/:id/edit', component: SalesDemoTableComponent },
      { path: 'sale-return', component: SalesReturnComponent },


      { path: 'payments', component: NewPaymentsComponent },
      // { path: 'payments/new', component: NewPaymentsComponent },

      { path: 'HSN', component: HSNComponent },
      { path: 'HSN/new', component: AddHSNComponent },

      { path: 'purchase-return', component: PurchaseReturnComponent },

      { path: 'products', component: ProductsComponent },
      { path: 'products/new', component: NewProductsComponent },
      { path: 'products/:id/edit', component: NewProductsComponent },

      { path: 'product-list', component: ProductsListComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'attendance/new-attendance', component: NewAttendanceComponent },
      { path: 'attendance/:id/viewAttendance', component: ViewAttendanceComponent },

      { path: 'report', component: ReportComponent },
      { path: 'medicine-category', component: MedicineCategoryComponent },

      { path: 'suppliers', component: SuppliersComponent },
      { path: 'suppliers/new', component: NewSupplierComponent },
      { path: 'suppliers/:id/edit', component: NewSupplierComponent },

      { path: 'purchaseReports', component: PurchaseReportsComponent },
      { path: 'salesReports', component: SalesReportsComponent },
      { path: 'expensesReports', component: ExpensesReportsComponent },
      { path: 'saleItemsReports', component: SaleItemsReportsComponent },
      { path: 'purchaseItemsReports', component: PurchaseItemsReportsComponent },

      { path: 'doctors', component: DoctorsComponent },
      { path: 'payment-type', component: PaymentTypeComponent },
      { path: 'expense-type', component: ExpenseTypeComponent },
      { path: 'doctors/add-doctors', component: AddDoctorComponent },
      { path: 'doctors/:id/edit', component: AddDoctorComponent },

      { path: 'temp', component: TempComponent },

      { path: 'profile', component: ProfileComponent },
    ]
  },

  {
    path: 'employees',
    loadChildren: () => import('./admin-user/admin-user.module').then(m => m.AdminUserModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }