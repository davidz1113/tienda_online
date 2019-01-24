import { Component, OnInit } from '@angular/core';
import { redirijirSiEstaIdentificado, ProductoInterface } from '../../servicios/globales';
import { Router } from '@angular/router';
import { PrincipalServices } from '../../servicios/principal.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [PrincipalServices]
})
export class LayoutComponent implements OnInit {

  productos: ProductoInterface[] = [];
  newProductos: ProductoInterface[] = [];
  constructor(private _router: Router, private _principalService: PrincipalServices) {

  }



  ngOnInit() {
    redirijirSiEstaIdentificado(this._router);
    this.consultarProductos();
  }

  consultarProductos() {
    this._principalService.consultarProductos().subscribe(
      response => {
        if (response.estado == 1) {
          this.productos = response.productos;
          this.newProductos = this.productos.slice();//copia de los productos originales
        } else {
          console.log(response);
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 
   * @param event objeto con los productos del carrito
   */
  mostrarModalCarrito(event){
    console.log('aqui');
    console.log(event);
    
  }

  /**
   * 
   * @param filtroProd palabra a buscar en productos
   */
  buscarProducto(filtroProd: string) {
    console.log(filtroProd);
    if (this.productos.length == 0) return;
    this.newProductos = this.productos.filter(producto => producto.nombre.toString().indexOf(filtroProd) != -1);
  }

}
