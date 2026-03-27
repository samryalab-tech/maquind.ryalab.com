import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {

  // 🔥 LABELS
  labels = [
    'Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E',
    'Cliente F', 'Cliente G', 'Cliente H', 'Cliente I', 'Cliente J'
  ];

  // 🔥 DATA
  topClients = [120, 98, 85, 70, 65, 50, 45, 40, 30, 20];
  lowClients = [5, 8, 10, 12, 15, 18, 20, 22, 25, 28];

  // 🔥 ESTADO
  showLow = false;

  // 🔥 OPCIONES
  topClientsOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  // 🔥 DATA DINÁMICA (AQUÍ ESTÁ LA CLAVE)
  get clientData(): ChartConfiguration<'bar'>['data'] {
    return {
      labels: this.labels,
      datasets: [
        {
          label: this.showLow ? 'Bajo consumo' : 'Top clientes',
          data: this.showLow ? this.lowClients : this.topClients,
          backgroundColor: this.showLow
            ? 'rgba(239,68,68,0.6)'   // rojo
            : 'rgba(59,130,246,0.6)'  // azul
        }
      ]
    };
  }

  // 🔥 TOGGLE
  toggleClients() {
    this.showLow = !this.showLow;
  }

  // 🔥 FACTURADO VS COBRADO
  billingData: ChartConfiguration<'line'>['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Facturado',
        data: [50000, 60000, 75000, 80000, 70000, 90000],
      },
      {
        label: 'Cobrado',
        data: [45000, 55000, 70000, 76000, 68000, 85000],
      }
    ]
  };

  billingOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  };

  // 🔥 MÉTRICAS
  metrics = [
    { title: 'Pendientes', value: 12 },
    { title: 'Por facturar', value: 8 },
    { title: 'Sin movimiento', value: 5 },
    { title: 'Cobrado mes', value: '$85,000' }
  ];

}