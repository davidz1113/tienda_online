import { Component, OnInit } from '@angular/core';
import { redirijirSiEstaIdentificado } from '../../servicios/globales';
import { Router } from '@angular/router';
import { PrincipalServices } from '../../servicios/principal.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [PrincipalServices]
})
export class LayoutComponent implements OnInit {

  productos: any[] = [];

  constructor(private _router: Router, private _principalService: PrincipalServices) { }



  ngOnInit() {
    redirijirSiEstaIdentificado(this._router);
    this.consultarProductos();
  }

  consultarProductos() {
    this._principalService.consultarProductos().subscribe(
      response => {
        if(response.estado==1){
          this.productos = response.productos;
        }else{
          console.log(response);
        }
        
      },
      error => {

      }
    );
  }



}
